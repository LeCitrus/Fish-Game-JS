//https://github.com/CodingWith-Adam/dino-game
import Player from "./Player.js";
import Score from "./Score.js";
import Fish from "./Fish.js";
import Time from "./Time.js";

// Get canvas and contexts
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Scoreboard UI
const top_g = new Image();
top_g.src = "images/top_g.png";

// Game variables
const GAME_WIDTH = 700;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 93;
const PLAYER_HEIGHT = 51;
const SMALL_FISH_WIDTH = 54;
const SMALL_FISH_HEIGHT = 27;
const BIG_FISH_WIDTH = 87;
const BIG_FISH_HEIGHT = 42;
const BAD_FISH_WIDTH = 153;
const BAD_FISH_HEIGHT = 75;
const SECOND = 1000;
const POP_SCORE_DURATION = 700;

// Function variables
let previousTime = null;
let scaleRatio = null;
let pop_score_duration = null;
let game_over = false;
let main_menu = true;
let secondTimer = 1000;

// Game objects
let player = null;
let score = null;
let time = null;
let bad_fish = null;
let small_fish = null;
let big_fish = null;
let popup_score = null;
let fishes = [];

function createSprites() {
    player = new Player(ctx, GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
    score = new Score(ctx, scaleRatio, 0, 270, 110);
    time = new Time(ctx, scaleRatio);
    bad_fish = new Fish(ctx, GAME_WIDTH, GAME_HEIGHT, BAD_FISH_WIDTH, BAD_FISH_HEIGHT, 0.9, -45, "images/bad_fish.png");
    small_fish = new Fish(ctx, GAME_WIDTH, GAME_HEIGHT, SMALL_FISH_WIDTH, SMALL_FISH_HEIGHT, 0.6, 30, "images/small_fish.png");
    big_fish = new Fish(ctx, GAME_WIDTH, GAME_HEIGHT, BIG_FISH_WIDTH, BIG_FISH_HEIGHT, 0.5, 60, "images/big_fish.png");
    fishes = [bad_fish, small_fish, big_fish];
}

function resetSprites() {
    player.y = GAME_HEIGHT - PLAYER_HEIGHT;
    bad_fish.reset();
    small_fish.reset();
    big_fish.reset();
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

// Check collision between any 2 objects
function collides(a, b)
{
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y) return true;
}

function start() {
    game_over = false
    // Start game
    if (time.time > 0) {
        main_menu = false;
    }
    // Restart game
    else {
        main_menu = true;
        time.reset();
        score.reset();
        resetSprites();
    }

}

function gameLoop(currentTime) {
    // First time func called to get frame rate
    if(previousTime === null) {
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    clearScreen();
    if (main_menu) {
        ctx.fillStyle = "black";
        ctx.font = "30px serif";
        ctx.fillText("Any key to Start", 300, 300);
    }

    else if (!game_over) {
        const frameTimeDelta = currentTime - previousTime;
        previousTime = currentTime;
        secondTimer -= frameTimeDelta;
        if (secondTimer <= 0) {
            secondTimer = SECOND;
            time.time -= 1;
            if (time.time <= 0) {
                game_over = true;
            }
        }

        // Update
        player.update(frameTimeDelta);
        bad_fish.update(frameTimeDelta);
        small_fish.update(frameTimeDelta);
        big_fish.update(frameTimeDelta);

        fishes.forEach(fish => {

            // Check for collisions between fishes and player
            if (collides(player, fish) && player.x + (player.width / 2) < fish.x) {
                score.update(fish.points);
                fish.x = GAME_WIDTH;
                fish.y = Math.random() * (GAME_HEIGHT - fish.height - 120) + 120;
                popup_score = new Score(ctx, scaleRatio, fish.points, player.x + 60, player.y);
                pop_score_duration = POP_SCORE_DURATION;
                
            }
            
            // Check if fish has hit wall
            if (fish.x < 0) {
                fish.x = GAME_WIDTH;
                fish.y = Math.random() * (GAME_HEIGHT - fish.height - 120) + 120;
            }
        });

        // Draw
        player.draw();
        score.draw();
        fishes.forEach(fish => {
            fish.draw();
        });
        if (pop_score_duration > 0) {
            popup_score.draw();
            pop_score_duration -= frameTimeDelta;
        }
        time.draw();
        ctx.drawImage(top_g, 20, 0, 650, 120);
    }

    else {
        ctx.fillStyle = "black";
        ctx.font = "30px serif";
        ctx.fillText("Game Over", 300, 300);
        ctx.fillText("Score: " + score.score, 300, 400);
        ctx.fillText("Any key to Restart", 300, 500);
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
window.addEventListener("keydown", start);
