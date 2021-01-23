const TIME_OUT = 1000;
let enemiesLimit = 100;
let enemiesSize = 25;

const enemies = [];
function createEnemyBalls() {
    for (let i = 0; i < enemiesLimit; i++) {
        let enemyRadius = rand(enemiesSize, 1);

        let enemy = new BallClass({ 
            x : rand(canvas.width, 0),
            y : rand(canvas.height, 0), 
            speed : rand(enemyRadius / 5, 1),
            radius : enemyRadius,
            color : '#' + (Math.random() * 0xFFFFFF<<0).toString(16),
            isAlive : true,
            limit : rand(500, 200),
            direction : rand(8, 0),
            run : false,
            whoKillMe : null
        });
        enemies.push(enemy);
    }
}

function tryToRunAway(runner) {
    if (!runner.whoKillMe.isAlive) {
        return;
    }
    
    let killerDir = runner.whoKillMe.direction;
    let newDirection = DIRS.up;

    if (LEFT_SIDE.includes(killerDir)) {
        newDirection = RIGHT_SIDE[rand(RIGHT_SIDE.length, 0)];
    }  

    if (RIGHT_SIDE.includes(killerDir)) {
        newDirection = LEFT_SIDE[rand(LEFT_SIDE.length, 0)];
    }

    if (killerDir === DIRS.down) {
        newDirection = DIRS.down;
    }
    
    return newDirection;
}

function resolveEnemyDir() {
    for (const enemy of enemies) {
        setTimeout(() => {
            if (enemy !== playerBall) {
                enemy.direction = (!enemy.run) ? rand(DIR_LENGTH, 0) : tryToRunAway(enemy);
            }
        }, rand(TIME_OUT, 0));
    }
}

setInterval(resolveEnemyDir, TIME_OUT);

// Enemies renderer.
function drawEnemyBalls() {
    checkIfAlive();

    for (let enemy of enemies) {
        outOfBox(enemy);
        let randomSacr = sacrificeSelector(enemy);
        
        if (randomSacr) {
            moveToSacrifice(enemy, randomSacr);
            continue;
        }
        
        if (enemy !== playerBall) {
            randomMovement(enemy);
        }
    
        enemy.drawing();
    }
}

function randomMovement(enemy) {
    goLeftRight(enemy, s => s.position(s.x + s.speed, s.y));
    goUpDown(enemy, s => s.position(s.x, s.y + s.speed));
    goUpLeftRight(enemy, s => s.position(s.x + s.speed, s.y - s.speed));
    goDownLeftRight(enemy, s => s.position(s.x + s.speed, s.y + s.speed))
}

function goLeftRight(enemy, callback) {
    if (enemy.direction === DIRS.left) {
        enemy.position(enemy.x - enemy.speed, enemy.y);
    } else if (enemy.direction === DIRS.right) {
        callback(enemy);
    }
}

function goUpDown(enemy, callback) {
    if (enemy.direction === DIRS.up) {
        enemy.position(enemy.x, enemy.y - enemy.speed);
    } else if (enemy.direction === DIRS.down) {
        callback(enemy);
    }
}

function goUpLeftRight(enemy, callback) {
    if (enemy.direction === DIRS.upLeft) {
        enemy.position(enemy.x - enemy.speed, enemy.y - enemy.speed);
    } else if (enemy.direction === DIRS.upRight) {
        callback(enemy);
    }
}

function goDownLeftRight(enemy, callback) {
    if (enemy.direction === DIRS.downLeft) {
        enemy.position(enemy.x - enemy.speed, enemy.y + enemy.speed);
    } else if (enemy.direction === DIRS.downRight) {
        callback(enemy);
    }
}

function checkIfAlive() {
    enemies.forEach((enemy, index, object) => {
        if (!enemy.isAlive) {
            object.splice(index, 1);
        }
    });
}

const great = (axe, rad, than) => (axe - rad) > than;
const less = (axe, rad) => (axe + rad) < 0;

function outOfBox(enemy) {
    let tooGreat, tooLess;
    let localX, localY;

    tooGreat = great(enemy.x, enemy.radius, canvas.width);
    tooLess = less(enemy.x, enemy.radius);

    localX = tooGreat ? -enemy.radius : (tooLess ? canvas.width + enemy.radius : enemy.x);

    tooGreat = great(enemy.y, enemy.radius, canvas.height);
    tooLess = less(enemy.y, enemy.radius);

    localY = tooGreat ? -enemy.radius : (tooLess ? canvas.height + enemy.radius : enemy.y);

    enemy.position(localX, localY);
}