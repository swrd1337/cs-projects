// Common class for enemies and player.
const BallClass = class {
    constructor({x, y, speed, radius, color, isAlive, limit, direction, run, whoKillMe}) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.color = color;
        this.isAlive = isAlive;
        this.limit = limit;
        this.direction = direction;
        this.run = run;
        this.whoKillMe = whoKillMe;
        this.score = 0;
    }

    position(x, y) {
        this.x = x;
        this.y = y;
    }

    drawing() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();

        if (this.direction === -1) {
            context.font = this.radius/2 + 'px Comic Sans MS';   
            context.fillStyle = 'white';
            context.fillText('player', this.x, this.y);
        }

        context.closePath();
    }

    set actualScore(score) {
        if (this.isAlive) {
            this.score = score;
        }
    }

    get lastScore() {
        if (this.isAlive) {
            return this.score;
        }
        return null;
    }
}
