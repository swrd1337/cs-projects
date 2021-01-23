const context = getCanvasContext();
const cleaner = () => context.clearRect(0, 0, canvas.width, canvas.height);

createEnemyBalls();

let isStarted = false;

function getNrOfEnemies() {
    let inputEnemies = document.querySelector('#input-enemies-nr');

    inputEnemies.addEventListener('change', e => {
        enemiesLimit = inputEnemies.value;
    });
}

function getEnemiesSize() {
    let inputSize = document.querySelector('#enemies-size');

    inputSize.addEventListener('change', e => {
        enemiesSize = (inputSize.value > 0 && inputSize.value < 50) ? inputSize.value : enemiesSize;
    });
}

getNrOfEnemies();
getEnemiesSize();

function startBallHungerGame() {
    let start = document.querySelector('#start');
    start.addEventListener('click', e => {
        isStarted = true;
    });
}

function stopBallHungerGame() {
    let stop = document.querySelector('#stop');
    stop.addEventListener('click', e => {
        isStarted = false;
    });
}


function restartGameUtill() {
    enemies.splice(0, enemies.length);
    createEnemyBalls();
    if (!isAuto) {
        addPlayerToEnemies();
    }
    isStarted = true;
}

function restartBallHungerGame() {
    let restart = document.querySelector('#restart');
    restart.addEventListener('click', e => {
       restartGameUtill();
    });
}

function hideMouse() {
    let hide = document.querySelector('#hide-mouse');
    let gameCanvas = document.querySelector('#canvas-div');

    hide.addEventListener('click', e => {
        let inner = hide.innerHTML;
        if(inner === 'HIDE MOUSE') {
            gameCanvas.setAttribute('style', 'cursor:none');
            hide.innerHTML = 'UNHIDE MOUSE';
        } else if (inner === 'UNHIDE MOUSE') {
            gameCanvas.setAttribute('style', 'cursor:auto');
            hide.innerHTML = 'HIDE MOUSE';
        }
    });
}

function rButtonPressed() {
    window.addEventListener('keydown', e => {
        if (e.keyCode === 82) {
            restartGameUtill();
        }
    });
}

startBallHungerGame();
stopBallHungerGame();
restartBallHungerGame();
hideMouse();
rButtonPressed();

function draw() {
    if (isStarted) {
        cleaner();
        drawEnemyBalls();
        mousePlayerMove();
        displayGameScore();

        if (!isAuto) {
            displayPlayerScore();
        }
    }
    requestAnimationFrame(draw);
}
