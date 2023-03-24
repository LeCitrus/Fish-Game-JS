export default class Fish {

    constructor(ctx, gameWidth, gameHeight, width, height, speed, points, image) {

        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = image;
        this.x = gameWidth;
        this.y = (Math.random() * (gameHeight - height - 120)) + 120;
        this.speed = speed;
        this.points = points;
    }

    update(frameTimeDelta) {
        this.x -= this.speed * (frameTimeDelta / 10);
    }
        

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}