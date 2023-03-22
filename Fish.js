export default class Fish {

    constructor(ctx, gameWidth, gameHeight, width, height, speed, points) {

        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/player.png";
        this.x = gameWidth;
        this.y = (Math.random() * gameHeight) - height;
        this.speed = speed;
        this.points = points;
    }

    update() {
        this.x -= this.speed;
    }
        

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}