const DIR_LENGTH = 8;

const DIRS = {
    left: 0,
    right: 1,
    up: 2,
    down: 3,
    upLeft: 4,
    upRight: 5,
    downLeft: 6,
    downRight: 7
}

const CENTER = [0, 1];
const LEFT_SIDE = [0, 4, 6];
const RIGHT_SIDE = [1, 5, 7];

const rand = (limit, addition) => Math.floor(Math.random() * limit) + addition;

function collisionDetect(killer, sacrifice) {
    let distance = distanceCalculator(killer, sacrifice);
    return (distance <= (sacrifice.radius + killer.radius) - sacrifice.radius / 2);
}

function distanceCalculator(killer, sacrifice){
    let interX = killer.x - sacrifice.x;
    let interY = killer.y - sacrifice.y;

    return Math.sqrt(interX ** 2 + interY ** 2);
}

const getXPosition = (killer, sacrifice) => (killer.x < sacrifice.x) ? 
                        killer.x + 1 : ((killer.x > sacrifice.x) ? killer.x - 1 : killer.x);

const getYPosition = (killer, sacrifice) => (killer.y < sacrifice.y) ? 
                        killer.y + 1 : ((killer.y > sacrifice.y) ? killer.y - 1 : killer.y);

function moveToSacrifice(killer, sacrifice){
    sacrifice.whoKillMe = killer;
    sacrifice.run = true;

    for (let i = 0; i < killer.speed; i++){
        if (killer !== playerBall) {
            let localX = getXPosition(killer, sacrifice);
            let localY = getYPosition(killer, sacrifice);

            killer.position(localX, localY);
        }
        if (collisionDetect(killer, sacrifice)) {
            afterCollision(killer, sacrifice);
        }

        killer.drawing();
    }
}

function afterCollision(killer, sacrifice) {
    sacrifice.speed = (sacrifice.speed > 1) ? sacrifice.speed - 1 : sacrifice.speed;
    sacrifice.isAlive = false;
    killer.radius += sacrifice.radius / 30;
    killer.speed = (killer > 1) ? killer.speed - 1 : killer.speed;
    killer.actualScore = killer.lastScore + 1;
}

function detectSacrifice(killer, maybeSacrifice){
    let distance = distanceCalculator(killer, maybeSacrifice);
    let detectionDistance = killer.limit;
    
    if (distance <= (maybeSacrifice.radius + killer.radius) + detectionDistance) {
        if (killer.radius > maybeSacrifice.radius) {
            return true;
        }
    }
    return false;
}

function sacrificeSelector(enemy) {
    const maybeSacrificies = [];
    for (const someEnemy of enemies) {
        if (someEnemy !== enemy && detectSacrifice(enemy, someEnemy)) {
            maybeSacrificies.push(someEnemy);
        }
    }

    if (maybeSacrificies.length !== 0) {
        return whoIsGoodSacrifice(enemy, maybeSacrificies);
    }
}

const isGoodSpeed = (some, goodSacrifice) =>
            (some.speed < goodSacrifice.speed) ? some : goodSacrifice;

function whoIsGoodSacrifice(killer, maybeSacrificies) {
    let goodSacrifice = maybeSacrificies.pop();

    for (const some of maybeSacrificies) {
        if (distanceCalculator(killer, some) < distanceCalculator(killer, goodSacrifice)) {
            goodSacrifice = isGoodSpeed(some, goodSacrifice);
        }
    }
    return goodSacrifice;
}
