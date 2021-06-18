const readline = require("readline-sync");

function displayBoard(board) {
  console.log("");
  console.log("     |     |");
  console.log(`  ${board["1"]}  |  ${board["2"]}  |  ${board["3"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${board["4"]}  |  ${board["5"]}  |  ${board["6"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${board["7"]}  |  ${board["8"]}  |  ${board["9"]}`);
  console.log("     |     |");
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[square] = " ";
  }

  return board;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function playerChoosesSquare(board) {
  prompt("Select the square you would like to mark (1-9):");
  let playerChoice = readline.question();

  board[playerChoice] = "X";
}

let board = initializeBoard();

displayBoard(board);
playerChoosesSquare(board);
displayBoard(board);
