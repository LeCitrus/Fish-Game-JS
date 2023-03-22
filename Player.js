export default class Player {
    constructor(ctx, gameWidth, gameHeight, width, height) {

        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/player.png";
        this.x = 0;
        this.y = this.gameHeight - this.height;

    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}