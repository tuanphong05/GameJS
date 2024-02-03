/**______ Variables ______ **/
const gameBox = document.querySelector(".gameBox");
const gameMenu = document.querySelector(".menu");
const selectLevelsMenu = document.querySelector(".select-levels-menu");
const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");
const levelsBtn = document.querySelector(".levels-btn");
const easyLv = document.querySelector(".easy-level");
const mediumLv = document.querySelector(".medium-level");
const hardLv = document.querySelector(".hard-level");
const score = document.querySelector(".score");
const bananaSvg = document.querySelector(".banana-svg");
const replayBox = document.querySelector(".replay-box");
const replayBtn = document.querySelector(".replay-btn");
const exitBtn = document.querySelector(".exit-btn");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const topBtn = document.querySelector(".top");
const bottomBtn = document.querySelector(".bottom");
let direction = 1;
let timeLevel = 1000;
let intervalTime = [300, 500, 1000];
let interval = 0;
let currentSnake = [2, 1, 0];
let currentIndex = 0;
let bananaIndex = 0;
let width = 10;

/**______ Functions ______**/

/* Start function */
/* Change color background, display snake, when user click on the arrow button by mouse or keyboard then the snake moves. The banana will display random, each times the snake eat banana therefore user will get 1 point and the length of the snake will increase, the movement becomes faster. The user is losed when snake collaspes itself or four walls of the box.
Snake is being invisible when eat the cloak, return to normal after 5 seconds.
Faster shoes makes the snake go faster than usual speed */

/**
 * Change color background
 */
const changeColorBg = function () {
  /* Change color background */
  gameBox.style.transition = "all 1s";
  gameBox.style.backgroundColor = "rgba(86, 148, 190, 25)";
  /* Remove game menu */
  gameMenu.remove();
};

/**
 * Create board
 */
const createBoard = function () {
  for (let i = 0; i < 100; i++) {
    {
      let div = document.createElement("div");
      gameBox.appendChild(div);
    }
  }
};

/**
 * Remove board
 */
const removeBoard = function () {
  while (gameBox.lastElementChild) {
    /** Remove till the last child of gameBox */
    gameBox.removeChild(gameBox.lastElementChild);
  }
};

/**
 * Control button
 */
function control(e) {
  /* Move the head of snake to right */
  if (e.keyCode === 39) {
    rightBtn.animate(movingRightBtn, movingTimingBtn);
    direction = 1;
  } else if (e.keyCode === 38) {
    /* Move the head of snake ten divs up */
    topBtn.animate(movingTopBtn, movingTimingBtn);
    direction = -width;
  } else if (e.keyCode === 37) {
    /* Move the head of snake to left */
    leftBtn.animate(movingLeftBtn, movingTimingBtn);
    direction = -1;
  } else if (e.keyCode === 40) {
    /* Move the head of snake down ten divs */
    bottomBtn.animate(movingDownBtn, movingTimingBtn);
    direction = +width;
  }
}

/**
 * Replay function
 */
const replay = function () {
  /** Hide replay box */
  replayBox.classList.add("hidden");
  /** Reset score to 0 */
  scoreValue = 0;
  /** Restart game */
  startGame();
};

/**
 * Choose level function
 */
const chooseLevel = function () {
  easyLv.addEventListener("click", function () {
    timeLevel = intervalTime[2];
  });

  mediumLv.addEventListener("click", function () {
    timeLevel = intervalTime[1];
  });

  hardLv.addEventListener("click", function () {
    timeLevel = intervalTime[0];
  });
};

/**
 * Back function
 */
const backTo = function () {
  gameMenu.classList.toggle("hidden");
  selectLevelsMenu.classList.toggle("hidden");
};

/**
 * Start game
 */
const startGame = function () {
  /**
   * Define start score value
   */
  let scoreValue = 0;
  /**
   * Check for hits
   */
  const checkForHits = function (squares) {
    if (
      (currentSnake[0] + width >= width * width && direction === width) ||
      (currentSnake[0] % width === width - 1 && direction === 1) ||
      (currentSnake[0] % width === 0 && direction === -1) ||
      (currentSnake[0] - width <= 0 && direction === -width) ||
      squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * Eat apple
   */
  function eatApple(squares, tail) {
    if (squares[currentSnake[0]].hasChildNodes()) {
      console.log(squares[currentSnake[0]]);
      squares[currentSnake[0]].removeChild(bananaSvg);
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomBanana(squares);
      scoreValue++;
      score.textContent = scoreValue;
    }
  }

  /**
   * Move snake
   */
  const moveSnake = function (squares) {
    let tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction);
    eatApple(squares, tail);
    squares[currentSnake[0]].classList.add("snake");
  };

  /**
   * Random Banana
   */
  const randomBanana = function (squares) {
    do {
      bananaIndex = Math.floor(Math.random() * squares.length);
    } while (squares[bananaIndex].classList.contains("snake"));

    /* Add SVG (Banana) the board */
    /* Set width and height of banana */
    bananaSvg.setAttribute("width", "36px");
    bananaSvg.setAttribute("height", "36px");
    /* Show banana on the board */
    bananaSvg.classList.remove("hidden");
    squares[bananaIndex].appendChild(bananaSvg);
  };

  /**
   * Show replay box
   */
  function showReplayBox() {
    /** Show replay box */
    replayBox.classList.remove("hidden");
    /** Remove banana */
    bananaSvg.classList.add("hidden");
    /** Remove the snake */
    currentSnake.forEach((value) => squares[value].classList.remove("snake"));
  }

  /**
   * Move outcome
   */
  const moveOutcome = function () {
    let squares = document.querySelectorAll(".gameBox div");
    if (checkForHits(squares)) {
      showReplayBox();
      return clearInterval(interval);
    } else {
      moveSnake(squares);
    }
  };

  let squares = document.querySelectorAll(".gameBox div");
  randomBanana(squares);
  direction = 1;
  score.innerHTML = scoreValue;
  currentSnake = [2, 1, 0];
  currentIndex = 0;
  currentSnake.forEach((value) => squares[value].classList.add("snake"));
  interval = setInterval(moveOutcome, timeLevel);
};

/**______ Events ______**/

/**________ Levels event ________**/
levelsBtn.addEventListener("click", function () {
  gameMenu.classList.toggle("hidden");
  selectLevelsMenu.classList.toggle("hidden");
  chooseLevel();
});

/**________ Back to home event ________**/
backBtn.addEventListener("click", function () {
  backTo();
});

/**________ Exit event ________**/
exitBtn.addEventListener("click", function () {
  /** Change background to normal */
  gameBox.style.transition = "all 0s";
  gameBox.style.backgroundColor = "rgba(39, 55, 69, 255)";
  /** Remove replay box */
  replayBox.classList.add("hidden");
  /** Remove board */
  removeBoard();
  /** Show menu again */
  gameBox.appendChild(gameMenu);
  /** Set score to 0 */
  score.textContent = 0;
});

/**________ Replay event ________**/
replayBtn.addEventListener("click", function () {
  replay();
});

/**________ Start event ________**/
startBtn.addEventListener("click", function () {
  document.addEventListener("keyup", control);
  changeColorBg();
  createBoard();
  startGame();
});

/**______ Animation ______**/

/**________ Moving control button ________**/

/** Define timing moving button **/
const movingTimingBtn = {
  duration: 500,
};

/**__________ Moving left __________**/
const movingLeftBtn = [
  { left: "0%" },
  { left: "8%", offset: 0.5 },
  { left: "0%" },
];

/**__________ Moving right __________**/
const movingRightBtn = [
  { right: "0%" },
  { right: "8%", offset: 0.5 },
  { right: "0%" },
];

/**__________ Moving top __________**/
const movingTopBtn = [{ top: "0%" }, { top: "8%", offset: 0.5 }, { top: "0%" }];

/**__________ Moving down __________**/
const movingDownBtn = [
  { top: "100%" },
  { top: "108%", offset: 0.5 },
  { top: "100%" },
];
