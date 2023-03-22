export default class Score {
    
    score = 0;
    
    constructor(ctx, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    update(score) {
        this.score += 1;
    }

    draw() {
        this.ctx.fillStyle = "black";
        const fontSize = 40;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.fillText(this.score, 10, 40);
    }
}