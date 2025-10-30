const boxEls = document.querySelectorAll('.box');
const statusEl = document.querySelector('.status');
const restartBtnEl = document.querySelector('.restartBtn');

let x = "<img src='X-Player.png'>";
let o = "<img src='O-Player.png'>";

// Win conditions
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Game variables
let options = ["", "", "", "", "", "", "", "", ""];
let player = "X"; // Human
let computer = "O"; // Computer
let running = false;

init();

function init() {
  boxEls.forEach(box => box.addEventListener('click', boxClick));
  restartBtnEl.addEventListener('click', restartGame);
  statusEl.textContent = `Your Turn ("${player}")`;
  running = true;
}

// Player click handler
function boxClick(e) {
  const index = e.target.dataset.index;

  if (options[index] !== "" || !running) {
    return;
  }

  // Player move
  updateBox(e.target, index, player, x);

  // Check if player won
  if (checkWinner(player)) return;

  // Check draw
  if (!options.includes("")) return drawGame();

  // Computer move (delay for realism)
  setTimeout(computerMove, 500);
}

// Update box with X or O
function updateBox(box, index, turn, symbol) {
  options[index] = turn;
  box.innerHTML = symbol;
}

// Simple computer move logic
function computerMove() {
  if (!running) return;

  // Try to find winning move or block player
  let bestMove = findBestMove();

  // If no best move, pick random empty cell
  if (bestMove === null) {
    const emptyIndexes = options.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    bestMove = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  }

  const box = boxEls[bestMove];
  updateBox(box, bestMove, computer, o);

  // Check if computer won
  if (checkWinner(computer)) return;

  // Check draw
  if (!options.includes("")) return drawGame();

  statusEl.textContent = `Your Turn ("${player}")`;
}

// AI logic: Try to win or block
function findBestMove() {
  // 1️⃣ Check if computer can win
  for (let combo of win) {
    const [a, b, c] = combo;
    const line = [options[a], options[b], options[c]];
    if (line.filter(v => v === computer).length === 2 && line.includes("")) {
      return combo[line.indexOf("")];
    }
  }

  // 2️⃣ Check if player is about to win (block them)
  for (let combo of win) {
    const [a, b, c] = combo;
    const line = [options[a], options[b], options[c]];
    if (line.filter(v => v === player).length === 2 && line.includes("")) {
      return combo[line.indexOf("")];
    }
  }

  // 3️⃣ Else no smart move
  return null;
}

// Check winner
function checkWinner(currentPlayer) {
  let isWon = false;

  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (options[a] === currentPlayer && options[b] === currentPlayer && options[c] === currentPlayer) {
      boxEls[a].classList.add('win');
      boxEls[b].classList.add('win');
      boxEls[c].classList.add('win');
      isWon = true;
    }
  }

  if (isWon) {
    if (currentPlayer === player) {
      statusEl.textContent = `🎉 You Won the Game!`;
      statusEl.style.color = "green";
    } else {
      statusEl.textContent = `🤖 Computer Won!`;
      statusEl.style.color = "red";
    }
    restartBtnEl.textContent = "Play Again 🔁";
    running = false;
    return true;
  }

  return false;
}

// Draw condition
function drawGame() {
  statusEl.textContent = "😐 It's a Draw!";
  statusEl.style.color = "orange";
  restartBtnEl.textContent = "Play Again 🔁";
  running = false;
}

// Restart the game
function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  statusEl.textContent = `Your Turn ("${player}")`;
  statusEl.style.color = "black";
  restartBtnEl.textContent = "Restart 🔁";
  boxEls.forEach(box => {
    box.innerHTML = "";
    box.classList.remove('win');
  });
}
