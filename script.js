const canvas = document.getElementById("game");

// Create CanvasRenderingContext 2d
const ctx = canvas.getContext("2d");

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

function drawGame() {
  let speed = 7;
  setTimeout(drawGame, 1000 / speed);
  clearScreen();
}

drawGame();
