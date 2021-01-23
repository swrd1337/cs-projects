import { setScore } from '../../actions/common';
import * as handTrack from 'handtrackjs';
import firebase from '../../firebase';

const heroImage = new Image();
const monsterImage = new Image();
const bulletImage = new Image();
heroImage.src = 'assets/hero.png';
monsterImage.src = 'assets/monster.png';
bulletImage.src = 'assets/boom.png';

let canvas;
let ctx;
let gameState;
let start = false;

const hero = {
    speed: 256,
    x: 0,
    y: 0,
    xt: 0,
    shift: 129,
    width: 64,
    height: 64,
    totalFrames: 5,
    currentFrame: 3,
    alive: true,
    bullet: {
        x: 0,
        y: 0,
        width: 64,
        height: 64,
        shift: 0,
        totalFrames: 9,
        currentFrame: 1,
        colide: false,
    }
};

let nrOfMonsters = 1;
let monsters;
const resetMonsters = () => {
    monsters = [];
    for (let i = 0; i < nrOfMonsters; i++) {
        monsters.push({
            speed: Math.random() * 100,
            x: 0,
            y: 0,
            shift: 0,
            width: 72,
            height: 72,
            totalFrames: 8,
            currentFrame: 1,
            killed: false,
        });
    }
}

let keysDown = {};
window.addEventListener('keydown', function (e) {
    if (window.location.pathname === '/game') {
        e.preventDefault()
        keysDown[e.keyCode] = true;
        if (e.keyCode === 32) {
            if (!start) {
                start = true;
                reset();
                requestAnimationFrame(loop);
               
            }
        } else if (e.keyCode === 27) {
            if (start) {
                start = false;
                reset();
            }
        }
    }
}, false);

window.addEventListener('keyup', function (e) {
    delete keysDown[e.keyCode];
}, false);


let score = 0, oldScore = 0;
let scoreIntervalObj, monstersInterval;
const reset = () => {
    resetMonsters();
    clearInterval(scoreIntervalObj);
    clearInterval(monstersInterval);
    if (score > 0) {
        firebase.addScore(score);
        gameState.setScore(score);
    }

    hero.x = canvas.width / 2;
    hero.y = canvas.height - 128;
    hero.xt = hero.x;
    hero.alive = true;
    hero.bullet.x = hero.x;
    hero.bullet.y = hero.y;

    score = 0;
    gameState.dispatch(setScore({
        newScore: 0,
    }));

    if (start) {
        scoreIntervalObj = setInterval(() => {
            gameState.dispatch(setScore({
                newScore: score++,
            }));
        }, 500);
        monstersInterval = setInterval(() => {
            for (const m of monsters) {
                m.speed += 5;
            }
            monsters.push({
                speed: Math.random() * 100,
                x: (Math.random() * (canvas.width - 64)),
                y: -64,
                shift: 0,
                width: 72,
                height: 72,
                totalFrames: 8,
                currentFrame: 1,
                killed: false,
            })
        }, 5000);
    }

    for (let m of monsters) {
        m.x = (Math.random() * (canvas.width - 64));
        m.y = -64;
    }
};

const handControl = modifier => {
    if (hero.xt + 32 < hero.x && hero.x > 0) {
        hero.x -= hero.speed * modifier;
        if (hero.currentFrame > 1) {
            hero.shift -= 64;
            hero.currentFrame--;
        }
    } else if (hero.xt - 32 > hero.x && hero.x < canvas.offsetWidth - 64) {
        hero.x += hero.speed * modifier;
        if (hero.currentFrame < hero.totalFrames) {
            hero.shift += 64;
            hero.currentFrame++;
        }
    }
}

const keyBoardControl = modifier => {
    if (37 in keysDown) {
        if (hero.x > 0) {
            hero.x -= hero.speed * modifier;
        }
        if (hero.currentFrame > 1) {
            hero.shift -= 64;
            hero.currentFrame--;
        }
    }
    if (39 in keysDown) {
        if (hero.x < canvas.width - 64 + 1) {
            hero.x += hero.speed * modifier;
        }
        if (hero.currentFrame < hero.totalFrames) {
            hero.shift += 64;
            hero.currentFrame++;
        }
    }
}

const bulletUpdate = modifier => {
    if (hero.bullet.colide) {
        if (hero.bullet.currentFrame < hero.bullet.totalFrames) {
            hero.bullet.currentFrame++;
            hero.bullet.shift += 65;
        } else {
            hero.bullet.shift = 0;
            hero.bullet.currentFrame = 1;
            hero.bullet.x = hero.x;
            hero.bullet.y = hero.y;
            hero.bullet.colide = false;
        }
    } else if (hero.bullet.y < 0) {
        hero.bullet.y = hero.y;
        hero.bullet.x = hero.x;
    } else {
        hero.bullet.y -= hero.speed * modifier * 2;
    }
}

const update = modifier => {
    hero.shift = 129;
    hero.currentFrame = 3;

    if (hero.alive) {
        bulletUpdate(modifier);
        handControl(modifier);
        // keyBoardControl(modifier);
    }

    for (let monster of monsters) {
        console.log(monsters)
        monster.y += monster.speed * modifier;
        if (monster.y > canvas.height + 64) {
            monster.speed = (Math.random() * 100);
            monster.y = -64;
        }

        if (
            hero.x <= (monster.x + 32)
            && monster.x <= (hero.x + 32)
            && hero.y <= (monster.y + 32)
            && monster.y <= (hero.y + 32)
        ) {
            hero.alive = false;
            clearInterval(scoreIntervalObj);
            start = false;
            oldScore = score;
        }

        if (
            hero.bullet.x <= (monster.x + 32)
            && monster.x <= (hero.bullet.x + 32)
            && hero.bullet.y <= (monster.y + 32)
            && monster.y <= (hero.bullet.y + 32)
        ) {
            score += 30;
            hero.bullet.colide = true;
            monster.x = (Math.random() * (canvas.width - 64));
            monster.y = -64;
        }
    }
};

const render = () => {
    for (let m of monsters) {
        ctx.drawImage(monsterImage, m.shift, 0, m.width, m.height, m.x, m.y, m.width, m.height);
    }
    if (hero.alive) {
        ctx.drawImage(bulletImage, hero.bullet.shift, 0, hero.bullet.width, hero.bullet.height, hero.bullet.x, hero.bullet.y, hero.bullet.width, hero.bullet.height);
        ctx.drawImage(heroImage, hero.shift, 0, hero.width, hero.height, hero.x, hero.y, hero.width, hero.height);
    }
};

const startScreen = () => {
    ctx.fillStyle = '#545a66';
    ctx.font = '100 30px Roboto';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'center';
    ctx.fillText('Press "Space" to start', canvas.width / 2, canvas.height / 2);
    if (oldScore > 0) {
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 40);
        ctx.fillText(`Score: ${oldScore}`, canvas.width / 2, canvas.height / 2 + 80);
    }
}

let then;
const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (start) {
        let now = Date.now();
        let delta = now - then;
        update(delta / 1000);
        render();
        then = now;
        requestAnimationFrame(loop);
    } else {
        startScreen();
    }
};

const initGame = (state) => {
    const video = document.getElementById('webcam');
    const modelParams = {
        flipHorizontal: true,
        imageScaleFactor: 0.2,
        maxNumBoxes: 1,
        iouThreshold: 0.5,
        scoreThreshold: 0.85,
    }
    handTrack.load(modelParams).then(model => {
        handTrack.startVideo(video).then(status => {
            if (status) {
                setInterval(() => {
                    if (start) {
                        model.detect(video).then(predictions => {
                            if (predictions[0]) {
                                const container = document.getElementById('game-container');
                                const x = predictions[0].bbox[0]
                                const xs = (container.offsetWidth / video.offsetWidth) * x;
                                hero.xt = Math.floor(xs);
                            }
                        });
                    }
                }, 100);
            }
        })
    })

    gameState = state;
    const container = document.getElementById('game-container');
    canvas = document.getElementById('game');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    ctx = canvas.getContext('2d');
    then = Date.now();
    reset();
    loop();
}

export default initGame;