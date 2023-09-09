const canvas = document.getElementById("game");
// initialize the speed of snake
let xvelocity = 0;
let yvelocity = 0;
// draw apple
let appleX = 5;
let appleY = 5;
// Add event listener to our body
document.body.addEventListener("keydown", keyDown);
// Create CanvasRenderingContext 2d
const ctx = canvas.getContext("2d");

function clearScreen() {
  ctx.fillStyle = "black"; //make screen black
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight); //black color start from 0px left, right to canvas width and canvas height
}

function drawGame() {
  let speed = 7; //the interval will be seven times a second
  setTimeout(drawGame, 1000 / speed); //uppdate screen 7 times a second
  clearScreen();
  drawSnake();
  drawApple();
  changeSnakePosition();
}

// Display the snake
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

// Display apple
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// Press arrow key
function keyDown(event) {
  //up
  if (event.keyCode == 38) {
    if (yvelocity == 1) return; //Prevent snake from moving in opposite direction
    yvelocity = -1; //move on tile up
    xvelocity = 0;
  }

  //down
  if (event.keyCode == 40) {
    if (yvelocity == -1) return;
    yvelocity = 1;
    xvelocity = 0;
  }

  //left
  if (event.keyCode == 37) {
    if (xvelocity == 1) return;
    yvelocity = 0;
    xvelocity = -1;
  }

  //right
  if (event.keyCode == 39) {
    if (xvelocity == -1) return;
    yvelocity = 0;
    xvelocity = 1;
  }
}

// Change position snake
function changeSnakePosition() {
  headX = headX + xvelocity;
  headY = headY + yvelocity;
}

drawGame();
