// Representación del tablero del juego
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Combinaciones ganadoras
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

// Función para realizar un movimiento
function makeMove(cell) {
  if (gameActive && board[cell] === "") {
    board[cell] = currentPlayer;
    document.getElementsByClassName("cell")[cell].innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
      alert("¡" + currentPlayer + " ha ganado!");
      gameActive = false;
    } else if (board.indexOf("") === -1) {
      alert("¡Empate!");
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

// Función para verificar si hay un ganador
function checkWin(player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    let [a, b, c] = winningCombinations[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

// Función para reiniciar el tablero
function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
}

// ...

// Nivel de dificultad de la máquina
const difficultyLevel = 2; // Puedes ajustar este valor según el nivel de dificultad deseado

// ...

// Función para realizar un movimiento (jugador humano)
function makeMove(cell) {
  if (gameActive && board[cell] === "") {
    board[cell] = currentPlayer;
    document.getElementsByClassName("cell")[cell].innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
      alert("¡" + currentPlayer + " ha ganado!");
      gameActive = false;
    } else if (board.indexOf("") === -1) {
      alert("¡Empate!");
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (currentPlayer === "O" && gameActive) {
        makeAIMove();
      }
    }
  }
}

// Función para realizar un movimiento (IA)
function makeAIMove() {
  let bestScore = -Infinity;
  let bestMove;

  // Recorre todas las casillas vacías y evalúa el mejor movimiento para la máquina
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, difficultyLevel, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  board[bestMove] = "O";
  document.getElementsByClassName("cell")[bestMove].innerText = "O";

  if (checkWin("O")) {
    alert("¡La máquina ha ganado!");
    gameActive = false;
  } else if (board.indexOf("") === -1) {
    alert("¡Empate!");
    gameActive = false;
  } else {
    currentPlayer = "X";
  }
}

// Función de evaluación para el algoritmo minimax
function evaluate(board) {
  const winningPlayer = checkWin("X") ? "X" : checkWin("O") ? "O" : null;
  if (winningPlayer === "O") {
    return 1;
  } else if (winningPlayer === "X") {
    return -1;
  } else {
    return 0;
  }
}

// Algoritmo minimax para determinar el mejor movimiento
function minimax(board, depth, maximizingPlayer) {
  const score = evaluate(board);

  if (score !== 0 || depth === 0) {
    return score;
  }

  if (maximizingPlayer) {
    let maxScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        maxScore = Math.max(maxScore, minimax(board, depth - 1, false));
        board[i] = "";
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        minScore = Math.min(minScore, minimax(board, depth - 1, true));
        board[i] = "";
      }
    }
    return minScore;
  }
}

// ...
// ...

// Variables para controlar el tiempo de respuesta de la máquina
const responseDelay = 1000; // Tiempo de respuesta en milisegundos
let waitingForResponse = false;

// ...

// Función para realizar un movimiento (jugador humano)
function makeMove(cell) {
  if (gameActive && board[cell] === "" && !waitingForResponse) {
    board[cell] = currentPlayer;
    document.getElementsByClassName("cell")[cell].innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
      alert("¡" + currentPlayer + " ha ganado!");
      gameActive = false;
    } else if (board.indexOf("") === -1) {
      alert("¡Empate!");
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (currentPlayer === "O" && gameActive) {
        waitingForResponse = true;
        setTimeout(makeAIMove, responseDelay);
      }
    }
  }
}

// Función para realizar un movimiento (IA)
function makeAIMove() {
  let bestScore = -Infinity;
  let bestMove;

  // Recorre todas las casillas vacías y evalúa el mejor movimiento para la máquina
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      let score = minimax(board, difficultyLevel, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  board[bestMove] = "O";
  document.getElementsByClassName("cell")[bestMove].innerText = "O";

  if (checkWin("O")) {
    alert("¡La máquina ha ganado!");
    gameActive = false;
  } else if (board.indexOf("") === -1) {
    alert("¡Empate!");
    gameActive = false;
  } else {
    currentPlayer = "X";
  }

  waitingForResponse = false;
}

// ...
