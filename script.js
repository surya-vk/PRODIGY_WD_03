const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.getElementById('restartButton');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');
const newGameButton = document.getElementById('newGameButton');
let isXTurn = true;
let board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick, { once: true });
});

restartButton.addEventListener('click', startGame);
newGameButton.addEventListener('click', startGame);

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function placeMark(cell, currentClass) {
  cell.textContent = currentClass;
  board[Array.from(cells).indexOf(cell)] = currentClass;
}

function swapTurns() {
  isXTurn = !isXTurn;
  statusMessage.textContent = `${isXTurn ? "X's" : "O's"} Turn`;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === currentClass;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === 'X' || cell.textContent === 'O';
  });
}

function endGame(draw) {
  if (draw) {
    resultMessage.textContent = "Draw!";
  } else {
    resultMessage.textContent = `${isXTurn ? "X" : "O"} Wins!`;
  }
  resultScreen.style.display = 'flex';
  cells.forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
  });
}

function startGame() {
  board = Array(9).fill(null);
  isXTurn = true;
  statusMessage.textContent = "X's Turn";
  resultScreen.style.display = 'none';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleCellClick, { once: true });
  });
}

startGame();
