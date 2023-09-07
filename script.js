const canvas = document.getElementById("game");

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

drawGame();
