//https://github.com/CodingWith-Adam/dino-game
import Player from "./Player.js";
import Score from "./Score.js";
import Fish from "./Fish.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 88;
const PLAYER_HEIGHT = 80;

let previousTime = null;
let scaleRatio = null;

// Game objects
let player = null;
let score = null;
let bad_fish = null;

function createSprites() {
    // 18:14 https://www.youtube.com/watch?v=ooru4pyEv1I
    player = new Player(ctx, GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
    score = new Score(ctx, scaleRatio);
    bad_fish = new Fish(ctx, GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT, 2, -60);
}

function setScreen() {
    scaleRatio = 1;
    canvas.width = GAME_WIDTH * scaleRatio;
    canvas.height = GAME_HEIGHT * scaleRatio;
    createSprites();
}

setScreen();

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getScaleRatio() {
    const screenHeight = Math.min(window.innerHeight, window.screen.height);

}



function gameLoop(currentTime) {
    // First time func called to get frame rate
    if(previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;

    clearScreen();

    // Update
    player.update();
    bad_fish.update();
    score.update(1);

    // Draw
    player.draw();
    score.draw();
    bad_fish.draw();

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


