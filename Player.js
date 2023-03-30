export default class Player {

    jumpPressed = false;
    jumpInProgress = false;
    JUMP_SPEED = 0.7;
    GRAVITY = 0.08;

    constructor(ctx, gameWidth, gameHeight, width, height) {

        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = "images/player.png";
        this.x = 5;
        this.y = this.gameHeight - this.height;

        // Keyboard input
        window.removeEventListener("keydown", this.keydown);
        window.removeEventListener("keyup", this.keyup);

        window.addEventListener("keydown", this.keydown);
        window.addEventListener("keyup", this.keyup);

    }

    keydown = (event) => {
        if (event.code === "Space") {
          this.jumpPressed = true;
        }
    };
    
    keyup = (event) => {
        if (event.code === "Space") {
          this.jumpPressed = false;
        }
    };

    update(frameTimeDelta) {
        this.y += this.JUMP_SPEED * (frameTimeDelta / 10);
        if (this.y < this.gameHeight - this.height && this.y >= 120) {
            this.JUMP_SPEED += this.GRAVITY * (frameTimeDelta / 10);
        }
        // Hit top
        else if (this.y <= 120) {
            this.JUMP_SPEED = 0;
            this.y = 120;
        }
        // Hit bottom
        else {
            this.JUMP_SPEED = 0;
            this.y = this.gameHeight - this.height;
        }
        if (this.jumpPressed) {
            this.JUMP_SPEED = -2;
        }
    }
        

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}