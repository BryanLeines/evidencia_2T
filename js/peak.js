const boardElements = Array.from(document.querySelectorAll("#board div"));
const currentPlayer = document.getElementById("current-player");
const winMessageElement = document.getElementById("win-message");
const winMessageTextElement = document.getElementById("text-win-message");
const btnRestart = document.getElementById("btn-restart");
const X_CLASS = "x-turn";
const O_CLASS = "o-turn";
const WINNING_COMB = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();

btnRestart.addEventListener("click", startGame);


function startGame() {
  boardElements.forEach((cell) => {
  
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
   
    cell.addEventListener("click", handleTurn, { once: true });
  });

 
  winMessageElement.classList.remove("show");
}


function handleTurn(e) {
  const cell = e.target;
  const currentClass = circleTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWinner(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    changeTurn();
  }
}


function endGame(draw) {
  if (draw) {
    winMessageTextElement.innerText = "¡Empate!";
  } else {
    winMessageTextElement.innerText = `${circleTurn ? "¡O" : "¡X"} Gano!`;
  }
  winMessageElement.classList.add("show");
}


function isDraw() {
  return [...boardElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
}


function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}


function changeTurn() {
  circleTurn = !circleTurn;

  
  if (!circleTurn) {
    currentPlayer.textContent = "X";
    currentPlayer.classList.remove(O_CLASS);
    currentPlayer.classList.add(X_CLASS);
  } else {
    currentPlayer.textContent = "O";
    currentPlayer.classList.add(O_CLASS);
  }
}


function checkWinner(currentClass) {
  return WINNING_COMB.some((combination) => {
    return combination.every((index) => {
      return boardElements[index].classList.contains(currentClass);
    });
  });
}
