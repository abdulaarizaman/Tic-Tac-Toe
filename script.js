document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusDisplay = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const newGameButton = document.getElementById('new-game');
    const X_CLASS = 'x';
    const O_CLASS = 'o';
    let currentPlayer = X_CLASS;
    let gameActive = true;
    let gameState = Array(9).fill('');

    const winningConditions = [
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
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        updateCell(clickedCell, clickedCellIndex);
        checkForWinner();
    }

    function updateCell(cell, index) {
        gameState[index] = currentPlayer;
        cell.classList.add(currentPlayer);
        cell.textContent = currentPlayer.toUpperCase();
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
        statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
    }

    function checkForWinner() {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            showResultScreen(`Player ${currentPlayer.toUpperCase()} wins!`);
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            showResultScreen('Game is a draw!');
            gameActive = false;
            return;
        }

        switchPlayer();
    }

    function showResultScreen(message) {
        resultMessage.textContent = message;
        resultScreen.classList.remove('hidden');
        document.getElementById('game').classList.add('hidden');
    }

    function resetGame() {
        gameState = Array(9).fill('');
        gameActive = true;
        currentPlayer = X_CLASS;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove(X_CLASS, O_CLASS);
        });
        statusDisplay.textContent = `Player ${currentPlayer.toUpperCase()}'s turn`;
        document.getElementById('game').classList.remove('hidden');
        resultScreen.classList.add('hidden');
    }

    function startNewGame() {
        resetGame();
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', startNewGame);
});
