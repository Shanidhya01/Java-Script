document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const statusDisplay = document.getElementById('status');
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill(null);
    let gameActive = true;

    const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

    function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (!gameActive || gameBoard[index] !== null) {
        return;
    }

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins! Resetting in 5 seconds...`;
        gameActive = false;
        setTimeout(resetGame, 5000);
        return;
    }

    if (!gameBoard.includes(null)) {
        statusDisplay.textContent = "It's a draw! Resetting in 5 seconds...";
        gameActive = false;
        setTimeout(resetGame, 5000);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
        gameBoard[a] === currentPlayer &&
        gameBoard[b] === currentPlayer &&
        gameBoard[c] === currentPlayer
        );
    });
    }

    function resetGame() {
    gameBoard.fill(null);
    document.querySelectorAll('.cell').forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    statusDisplay.textContent = "Player X's turn";
    gameActive = true;
    }

    board.addEventListener('click', handleCellClick);
});
