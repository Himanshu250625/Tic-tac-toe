const btnRef = document.querySelectorAll(".button-option");
const popupRef = document.querySelector(".popup");
const newgameBtn = document.getElementById("new-game");
const restartBtn = document.getElementById("restart");
const msgRef = document.getElementById("message");
const xScore = document.getElementById("x-score");
const oScore = document.getElementById("o-score");
const difficultySelect = document.getElementById("difficulty");

const clickSound = document.getElementById("click-sound");
const winSound = document.getElementById("win-sound");
const drawSound = document.getElementById("draw-sound");

const winningPattern = [
  [0, 1, 2], [0, 3, 6], [2, 5, 8],
  [6, 7, 8], [3, 4, 5], [1, 4, 7],
  [0, 4, 8], [2, 4, 6]
];

let xTurn = true;
let count = 0;
let xWinCount = 0;
let oWinCount = 0;

const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
    element.classList.remove("win");
  });
  popupRef.classList.add("hide");
};

const winFunction = (letter, indices) => {
  disableButtons();
  indices.forEach(i => btnRef[i].classList.add("win"));
  winSound.play();
  if (letter === "X") {
    msgRef.innerHTML = "🎉 <br> 'X' Wins";
    xScore.innerText = ++xWinCount;
  } else {
    msgRef.innerHTML = "🎉 <br> 'O' Wins";
    oScore.innerText = ++oWinCount;
  }
};

const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "😎 <br> It's a Draw";
  drawSound.play();
};

const winChecker = () => {
  for (let i of winningPattern) {
    let [a, b, c] = i;
    let val1 = btnRef[a].innerText;
    let val2 = btnRef[b].innerText;
    let val3 = btnRef[c].innerText;
    if (val1 !== "" && val1 === val2 && val2 === val3) {
      winFunction(val1, [a, b, c]);
      return true;
    }
  }
  return false;
};

const aiMove = () => {
  const difficulty = difficultySelect.value;
  const empty = Array.from(btnRef).filter(btn => btn.innerText === "");

  if (difficulty === "easy") {
    const randBtn = empty[Math.floor(Math.random() * empty.length)];
    randBtn.innerText = "O";
    randBtn.disabled = true;
    count++;
  } else if (difficulty === "medium") {
    for (let i = 0; i < btnRef.length; i++) {
      if (btnRef[i].innerText === "") {
        btnRef[i].innerText = "O";
        btnRef[i].disabled = true;
        count++;
        break;
      }
    }
  } else if (difficulty === "hard") {
    const randBtn = empty[Math.floor(Math.random() * empty.length)];
    randBtn.innerText = "O";
    randBtn.disabled = true;
    count++;
  }

  winChecker() || (count === 9 && drawFunction());
};

btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerText !== "") return;
    clickSound.play();
    element.innerText = "X";
    element.disabled = true;
    count++;
    if (!winChecker() && count < 9) {
      setTimeout(aiMove, 500);
    } else if (count === 9) {
      drawFunction();
    }
  });
});

newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  xScore.innerText = oScore.innerText = xWinCount = oWinCount = 0;
});

window.onload = enableButtons;
