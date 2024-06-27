const container = document.querySelector('.container');
const Status = document.querySelector('.status');
const btnReset = document.querySelector('.reset');
const gridSize = document.querySelector('.grid-size');
const displayTimer = document.querySelector('.timer');
let timeLeft = 10;
let timer;

let options = [];

const gameWin = {
  3: [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ],
  4: [
    [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15],
    [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15],
    [0, 5, 10, 15], [3, 6, 9, 12]
  ],
  5: [
    [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24], [4, 8, 12, 16, 20]
  ]
};

let player = "X";
let running = false;

function setupGrid() {
  const size = parseInt(gridSize.value);
  container.innerHTML = '';
  container.style.gridTemplateColumns = `repeat(${size}, auto)`;

  options = Array(size * size).fill(' ');

  for (let i = 0; i < size * size; i++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.dataset.index = i;
    box.addEventListener('click', boxClick);
    container.appendChild(box);
  }

  Status.textContent = `${player} Your Turn`;
  running = true;
  
}

function start() {
  gridSize.addEventListener('change', setupGrid);
  btnReset.addEventListener('click', resetGame);
  setupGrid();
}

function boxClick() {
  const index = this.dataset.index;
  if (options[index] !== " " || !running) {
    return;
  }
  addMove(this, index);
  checkWinner();
}

function addMove(box, index) {
  options[index] = player;
  box.innerHTML = player;
  Timer();
}

function checkWinner() {
  const size = parseInt(gridSize.value);
  let isWon = false;

  for (let pattern of gameWin[size]) {
    const [a, b, c, d, e] = pattern.map(i => options[i]);
    if (size === 3 && a!==' ' && a === b && a === c) {
      isWon = true;
    } else if (size === 4 && a!==' ' && a === b && a === c && a === d) {
      isWon = true;
    } else if (size === 5 && a!==' ' && a === b && a === c && a === d && a === e) {
      isWon = true;
    }

    if (isWon) break;
  }

  if (isWon) {
    Status.textContent = `${player} Won!`;
    running = false;
    clearInterval(timer);
  } else if (!options.includes(" ")) {
    Status.textContent = `Game Draw!`;
    running = false;
    clearInterval(timer);
  } else {
    changePlayer();
  }
}

function changePlayer() {
  if(player=='X'){
    player='O';
  }else{
    player='X';
  }
  Status.textContent = `${player}'s Turn`;
  Timer();
}

function Timer() {
  clearInterval(timer);
  timeLeft = 10;
  displayTimer.textContent = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    displayTimer.textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      alert(`Time out! Switching to next player.`);
      changePlayer();
      Timer();
    }
  }, 1000);
}

function resetGame() {
  clearInterval(timer);
  options.fill(" ");
  player = "X";
  timeLeft=10;
  running = true;
  Status.textContent = `${player} Your Turn`;
  displayTimer.textContent=`Time Out:${timeLeft} sec`;
  document.querySelectorAll('.box').forEach(box => {
    box.innerHTML = "";
  });

  
}

start();
