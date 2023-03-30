export default class Score {
    
    time = 60;
    
    constructor(ctx, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.scaleRatio = scaleRatio;
    }

    reset() {
        this.time = 60;
    }

    draw() {
        const x = 600;
        this.ctx.fillStyle = "black";
        const fontSize = 35;
        this.ctx.font = `${fontSize}px serif`;
        this.ctx.fillText(Math.floor(this.time / 60) + ":" + (this.time % 60).toString().padStart(2, 0), x, 110);
    }
}