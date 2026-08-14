const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

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

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  // Don't allow moves on occupied cells or after the game ends
  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  // Check for draw
  if (!board.includes("")) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  status.textContent = "Player X's turn";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);