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
// array for snake parts
const snakeParts = [];
// initial parts of snake
let tailLength = 2;

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
  checkCollision();
}

// Display the snake
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;

class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function drawSnake() {
  ctx.fillStyle = "orange";
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

  ctx.fillStyle = "green";
  //loop through our snakeparts array
  for (let i = 0; i < snakeParts.length; i++) {
    // draw snake parts
    let part = snakeParts[i];
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }
  snakeParts.push(new snakePart(headX, headY)); //push item at the end of list next to the head
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

// Check collision
function checkCollision() {
  if (appleX == headX && appleY == headY) {
    //Collision happens when snake collide apple
    appleX = Math.floor(Math.random() * tileCount); //Generate apple to a random horizontal position
    appleY = Math.floor(Math.random() * tileCount); //Generate apple to a random vertical position
  }
}

drawGame();
