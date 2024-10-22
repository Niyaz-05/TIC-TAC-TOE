document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const popup = document.getElementById('winner-popup');
    const popupMessage = document.getElementById('popup-message');
    const popupClose = document.getElementById('popup-close');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
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

    function createBoard() {
        gameState.forEach((_, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', index);
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        });
    }

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (gameState[index] !== '' || !gameActive) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkResult();
    }

    function checkResult() {
        let roundWon = false;

        for (let i = 0; i < winningCombinations.length; i++) {
            const winCondition = winningCombinations[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            displayPopup(`Player ${currentPlayer} Wins!`);
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            displayPopup('It\'s a Draw!');
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function resetGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = `Player ${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
        });
    }

    function displayPopup(resultMessage) {
        popupMessage.textContent = resultMessage;
        popup.style.display = 'flex';
    }

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
        resetGame();
    });

    resetButton.addEventListener('click', resetGame);

    createBoard();
    message.textContent = `Player ${currentPlayer}'s turn`;
});
