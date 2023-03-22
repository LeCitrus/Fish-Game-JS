//https://github.com/CodingWith-Adam/dino-game

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 88;
const PLAYER_HEIGHT = 80;

let previousTime = null;
let scaleRatio = null;

// Game objects
let player = null;

function createSprites() {
    // 18:14 https://www.youtube.com/watch?v=ooru4pyEv1I
}

function setScreen() {
    s
}

function clearScreen() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function jump() {
    player.classList.add("animate_player");
    setTimeout(function(){
        player.classList.remove("animate_player");
    }, 3000);
}


window.onload = function() {

}

function updateScore() {

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
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


