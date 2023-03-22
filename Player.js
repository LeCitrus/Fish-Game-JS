export default class Player {

    jumpPressed = false;
    jumpInProgress = false;
    JUMP_SPEED = 0.6;
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
        this.x = 0;
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

    update() {
        this.y += this.JUMP_SPEED;
        if (this.y < this.gameHeight - this.height) {
            this.JUMP_SPEED += this.GRAVITY;
        }
        else {
            this.JUMP_SPEED = 0;
        }
        if (this.jumpPressed) {
            this.JUMP_SPEED = -5;
        }
    }
        

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}