/**______ Variables ______ **/
const gameBox = document.querySelector(".gameBox");
const gameMenu = document.querySelector(".menu");
const selectLevelsMenu = document.querySelector(".select-levels-menu");
const startBtn = document.querySelector(".start-btn");
const backBtn = document.querySelector(".back-btn");
const backBtnHighscore = document.querySelector(".back-btn-highscores");
const levelsBtn = document.querySelector(".levels-btn");
const highScoreBtn = document.querySelector(".highScores-btn");
const highScoreBoard = document.querySelector(".highscore-board");
const easyTitle = document.querySelector(".easy-title");
const mediumTitle = document.querySelector(".medium-title");
const hardTitle = document.querySelector(".hard-title");
const easyLv = document.querySelector(".easy-level");
const mediumLv = document.querySelector(".medium-level");
const hardLv = document.querySelector(".hard-level");
const score = document.querySelector(".score");
const scoreTop1 = document.querySelector(".score-top-1");
const scoreTop2 = document.querySelector(".score-top-2");
const scoreTop3 = document.querySelector(".score-top-3");
const scoreTop4 = document.querySelector(".score-top-4");
const scoreTop5 = document.querySelector(".score-top-5");
const bananaSvg = document.querySelector(".banana-svg");
const replayBox = document.querySelector(".replay-box");
const replayBtn = document.querySelector(".replay-btn");
const exitBtn = document.querySelector(".exit-btn");
const userNameForm = document.querySelector(".user-name-form");
const maxScoreValue = document.querySelector(".max-score");
const leftBtn = document.querySelector(".left");
const rightBtn = document.querySelector(".right");
const topBtn = document.querySelector(".top");
const bottomBtn = document.querySelector(".bottom");
let scoreValue;
let scoreArr = [];
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
Faster shoes makes the snake go faster than usual speed
Get the score, compare the score with the previous one, add new highscore and show list of 5 top highscore including names
*/

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
 * Get and store score
 */
const getScore = function () {
  const newScore = getFromStorage("score") || [];
  if (newScore > 0) {
    /* Sort ascending scoreArr */
    scoreArr.push(Number(newScore));
    scoreArr.sort(function (a, b) {
      return b - a;
    });
    /* Loop through scoreArr and compare newScore with the score in scoreArr, if newScore is greater than the score then replace it */
    if (scoreArr.length > 5) {
      /* If length of scoreArr is greater than 5, set the length to 5 to make the list 5 score */
      scoreArr.length = 5;
      console.log(scoreArr);
      for (i in scoreArr) {
        if (newScore > scoreArr[i]) {
          scoreArr.splice(i, 1, newScore);
        } else if (newScore < scoreArr[i]) {
          scoreArr.splice(5, 1);
        }
        /* Break the loop when meets the condition */
        break;
      }
    }
    let maxScore = Math.max(...scoreArr);
    maxScoreValue.textContent = maxScore;
    if (newScore == maxScore) {
      renderLoginForm();
    }
  }
  return scoreArr;
};

/**
 * Create a new highscore board
 */
const createScoreBoard = function () {
  const score = getScore();
  const scorePlayer1 = score[0];
  const scorePlayer2 = score[1];
  const scorePlayer3 = score[2];
  const scorePlayer4 = score[3];
  const scorePlayer5 = score[4];
  scoreTop1.textContent = scorePlayer1;
  scoreTop2.textContent = scorePlayer2;
  scoreTop3.textContent = scorePlayer3;
  scoreTop4.textContent = scorePlayer4;
  scoreTop5.textContent = scorePlayer5;
  const players = {
    Alex: scorePlayer1,
    Ben: scorePlayer2,
    Caddy: scorePlayer3,
    Dean: scorePlayer4,
    Edward: scorePlayer5,
  };
  console.log(players);
  return players;
};

/**
 * Control button
 */
function control(e) {
  /* Move the head of snake to right */
  if (e.keyCode === 68) {
    rightBtn.animate(movingRightBtn, movingTimingBtn);
    direction = 1;
  } else if (e.keyCode === 87) {
    /* Move the head of snake ten divs up */
    topBtn.animate(movingTopBtn, movingTimingBtn);
    direction = -width;
  } else if (e.keyCode === 65) {
    /* Move the head of snake to left */
    leftBtn.animate(movingLeftBtn, movingTimingBtn);
    direction = -1;
  } else if (e.keyCode === 83) {
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
  /** Hide username form */
  userNameForm.classList.add("hidden");
  /** Reset score to 0 */
  scoreValue = 0;
};

/**
 * Choose level function
 */
const chooseLevel = function () {
  easyLv.addEventListener("click", function () {
    timeLevel = intervalTime[2];
    /** Change easy title **/
    easyTitle.style.transition = "all 0.5s";
    easyTitle.style.color = "rgba(216, 199, 0, 255)";
    /** Remains medium title **/
    mediumTitle.style.color = "rgba(43, 110, 161, 255)";
    /** Remains hard title **/
    hardTitle.style.color = "rgba(43, 110, 161, 255)";
  });

  mediumLv.addEventListener("click", function () {
    timeLevel = intervalTime[1];
    /** Remains easy title **/
    easyTitle.style.color = "rgba(43, 110, 161, 255)";
    /** Change medium title **/
    mediumTitle.style.transition = "all 0.5s";
    mediumTitle.style.color = "rgba(216, 199, 0, 255)";
    /** Remains hard title **/
    hardTitle.style.color = "rgba(43, 110, 161, 255)";
  });

  hardLv.addEventListener("click", function () {
    timeLevel = intervalTime[0];
    /** Remain easy title **/
    easyTitle.style.color = "rgba(43, 110, 161, 255)";
    /** Remains medium title **/
    mediumTitle.style.color = "rgba(43, 110, 161, 255)";
    /** Change hard title **/
    hardTitle.style.transition = "all 0.5s";
    hardTitle.style.color = "rgba(216, 199, 0, 255)";
  });
};

/**
 * Back function
 */
const backTo = function () {
  gameMenu.classList.toggle("hidden");
  selectLevelsMenu.classList.toggle("hidden");
};

const backHighscoreTo = function () {
  gameMenu.classList.toggle("hidden");
  highScoreBoard.classList.toggle("hidden");
};

/**
 * Render login form function
 */
const renderLoginForm = function () {
  userNameForm.classList.toggle("hidden");
};

/**
 * Start game
 */
const startGame = function () {
  /**
   * Define start score value
   */
  scoreValue = 0;
  saveToStorage("score", scoreValue);

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
      squares[currentSnake[0]].removeChild(bananaSvg);
      squares[tail].classList.add("snake");
      currentSnake.push(tail);
      randomBanana(squares);
      scoreValue++;
      /** Save score to storage */
      saveToStorage("score", scoreValue);
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
      createScoreBoard();
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

/**
 *
 */

/**______ Events ______**/

/**________ Levels event ________**/
levelsBtn.addEventListener("click", function () {
  gameMenu.classList.toggle("hidden");
  selectLevelsMenu.classList.toggle("hidden");
  chooseLevel();
});

/**________ Highscore event ________**/
highScoreBtn.addEventListener("click", function () {
  gameMenu.classList.toggle("hidden");
  highScoreBoard.classList.toggle("hidden");
});

/**________ Back to home event ________**/
backBtn.addEventListener("click", function () {
  backTo();
});

backBtnHighscore.addEventListener("click", function () {
  backHighscoreTo();
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
  /** Remove top 1 score pop up */
  userNameForm.classList.add("hidden");
});

/**________ Replay event ________**/
replayBtn.addEventListener("click", function () {
  replay();
  startGame();
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
