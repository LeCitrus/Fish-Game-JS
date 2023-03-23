//https://github.com/CodingWith-Adam/dino-game
import Player from "./Player.js";
import Score from "./Score.js";
import Fish from "./Fish.js";
import Time from "./Time.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const top_g = new Image();
top_g.src = "images/top_g.png";

const GAME_WIDTH = 700;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 31 * 3;
const PLAYER_HEIGHT = 17 * 3;
const SMALL_FISH_WIDTH = 18 * 3;
const SMALL_FISH_HEIGHT = 9 * 3;
const BIG_FISH_WIDTH = 29 * 3;
const BIG_FISH_HEIGHT = 14 * 3;
const BAD_FISH_WIDTH = 51 * 3;
const BAD_FISH_HEIGHT = 25 * 3;

let previousTime = null;
let scaleRatio = null;
let second = 1000;
let pop_score_duration = null;
let game_over = false;

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
    // 18:14 https://www.youtube.com/watch?v=ooru4pyEv1I
    player = new Player(ctx, GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, PLAYER_HEIGHT);
    score = new Score(ctx, scaleRatio, 0, 270, 110);
    time = new Time(ctx, scaleRatio);
    bad_fish = new Fish(ctx, GAME_WIDTH, GAME_HEIGHT, BAD_FISH_WIDTH, BAD_FISH_HEIGHT, 0.9, -45, "images/bad_fish.png");
    small_fish = new Fish(ctx, GAME_WIDTH, GAME_HEIGHT, SMALL_FISH_WIDTH, SMALL_FISH_HEIGHT, 0.6, 30, "images/small_fish.png");
    big_fish = new Fish(ctx, GAME_WIDTH, GAME_HEIGHT, BIG_FISH_WIDTH, BIG_FISH_HEIGHT, 0.5, 60, "images/big_fish.png");
    fishes = [bad_fish, small_fish, big_fish];
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

function collides(a, b)
{
    if (a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y) return true;
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
    second -= frameTimeDelta;
    if (second <= 0) {
        second = 1000;
        time.update();
        if (time.time <= 0) {
            game_over = true;
        }
    }

    clearScreen();

    if (!game_over) {
        // Update
        player.update();
        bad_fish.update();
        small_fish.update();
        big_fish.update();
        fishes.forEach(fish => {
            if (collides(player, fish) && player.x + (player.width / 2) < fish.x) {
                score.update(fish.points);
                fish.x = GAME_WIDTH;
                fish.y = Math.random() * (GAME_HEIGHT - fish.height - 120) + 120;
                popup_score = new Score(ctx, scaleRatio, fish.points, player.x + 60, player.y);
                pop_score_duration = 700;
                
            }
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
    }

    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


