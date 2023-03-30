export default class Score {
    constructor(ctx, scaleRatio, score, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.score = score;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    update(score) {
        this.score += score;
    }

    reset(){
        this.score = 0;
    }

    draw() {
        this.ctx.fillStyle = "black";
        const fontSize = 35;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.fillText(this.score, this.x, this.y);
    }
}