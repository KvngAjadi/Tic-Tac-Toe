

document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const statusText = document.getElementById("status");
  const resetBtn = document.getElementById("reset");

  let currentPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let isGameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        isGameActive = false;
        highlightWinningCells([a, b, c]);
        statusText.textContent = `🎉 Player ${board[a]} wins!`;
        return;
      }
    }

    if (!board.includes("")) {
      isGameActive = false;
      statusText.textContent = "It's a draw!";
    }
  };

  const highlightWinningCells = (indices) => {
    indices.forEach(index => {
      cells[index].classList.add("bg-green-200");
    });
  };

  const handleCellClick = (e) => {
    const index = e.target.dataset.index;
    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWinner();

    if (isGameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
  };

  const resetGame = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("bg-green-200");
    });
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  };

  cells.forEach(cell => cell.addEventListener("click", handleCellClick));
  resetBtn.addEventListener("click", resetGame);

  // Initial state
  statusText.textContent = `Player ${currentPlayer}'s turn`;
});
