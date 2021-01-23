let playerBall = null; 
let isAuto = true;

function createPlayerBall() {
    playerBall = new BallClass({
        x : canvas.width / 2,
        y : canvas.height / 2,
        speed : 4, 
        radius : 20,
        color : 'black',
        isAlive : true,
        limit : 0,
        direction : -1,
        run : false,
        whoKillMe : null
    });
}

let mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', e => {
    if (!isAuto && playerBall) {
        let cnvBounds = canvas.getBoundingClientRect();
        mouse.x = e.clientX - cnvBounds.left;
        mouse.y = e.clientY - cnvBounds.top;
    }
}, false);

function mousePlayerMove() {
    if (!isAuto && playerBall) {
        for (let i = 0; i < playerBall.speed; i++) {
            let localX = getXPosition(playerBall, mouse);
            let localY = getYPosition(playerBall, mouse);

            playerBall.position(localX, localY);
        }
    }
}

function removePlayerFromEnemies() {
    enemies.forEach((someBall, index, enemies) => {
        if (someBall === playerBall) {
            enemies.splice(index, 1);
        } 
    })
}

function addPlayerToEnemies() {
    createPlayerBall();
    enemies.push(playerBall);
}

function displayPlayerScore() {
    let playerScore = (playerBall.isAlive) ? `Your score: ${playerBall.lastScore}` : 'Press "r" or button to restart..';

    context.font = '30px Comic Sans MS';   
    context.fillStyle = 'black';
    context.textAlign = 'center';

    context.fillText(playerScore, canvas.width / 2, 30);

    context.font = '18px Comic Sans MS'; 
    context.fillText('use your mouse...', canvas.width / 2, 50);
}

function autoOrManualPlayer() {
    let autoManual = document.querySelector('#auto-manual');
    autoManual.addEventListener('click', e => {
        if (isAuto) {
            isAuto = false;
            isStarted = false;
            autoManual.innerHTML = 'MANUAL';
            addPlayerToEnemies();
        } else if (!isAuto) {
            isAuto = true;
            isStarted = false;
            autoManual.innerHTML = 'AUTO';
            removePlayerFromEnemies();
        }
    });
}

autoOrManualPlayer();
