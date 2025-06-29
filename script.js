const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("themeToggle");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function updateStatus() {
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  if (checkWinner()) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
  } else if (!board.includes("")) {
    statusText.textContent = "😐 It's a Draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
  }
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  updateStatus();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
themeToggle.addEventListener("click", toggleTheme);

loadTheme();
updateStatus();
