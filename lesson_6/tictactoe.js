const readline = require("readline-sync");
const INITIAL_MARKER = " ";
const HUMAN_MARKER = "X";
const COMPUTER_MARKER = "O";
const ROUNDS_FOR_MATCH_WIN = 5;
const WINNING_LINES = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];

function displayBoard(board) {
  //console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}.`);

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
    board[square] = INITIAL_MARKER;
  }

  return board;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function joinOr(squares, delimiter = ",", conjunction = "or") {
  switch (squares.length) {
    case 0:
      return "";
    case 1:
      return squares[0];
    case 2:
      return squares.join(` ${conjunction} `);
    default:
      return (
        squares.slice(0, squares.length - 1).join(", ") +
        `${delimiter} ${conjunction} ${squares[squares.length - 1]}`
      );
  }
}

function emptySquares(board) {
  return Object.keys(board).filter((key) => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(
      `Select the square you would like to mark (${joinOr(
        emptySquares(board)
      )}):`
    );
    square = readline.question().trim();

    if (emptySquares(board).includes(square)) break;

    prompt("Sorry, that is not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function findAtRiskSquare(board) {
  let winsForComputer = [];
  let winsForPlayer = [];
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let values = WINNING_LINES[line].map((square) => board[square]);

    let playerMarks = values.filter((value) => value === HUMAN_MARKER);
    let computerMarks = values.filter((value) => value === COMPUTER_MARKER);

    if (computerMarks.length === 2) {
      let index = values.indexOf(" ");
      winsForComputer.push(index);
    } else if (playerMarks.length === 2) {
      let index = values.indexOf(" ");
      winsForPlayer.push(index);
    }
  }
  if (winsForComputer.length) {
    console.log(winsForComputer[0]);
    return winsForComputer[0];
  } else if (winsForPlayer.length) {
    console.log(winsForPlayer[0]);
    return winsForPlayer[0];
  } else {
    return null;
  }
}

function computerChoosesSquare(board) {
  if (findAtRiskSquare(board)) {
    board[findAtRiskSquare(board)] = COMPUTER_MARKER;
  } else {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);

    board[emptySquares(board)[randomIndex]] = COMPUTER_MARKER;
  }
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return "Player";
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return "Computer";
    }
  }
  return null;
}

function someoneWon(board) {
  return !!detectWinner(board);
}
let computerWins = 0;
let playerWins = 0;
while (true) {
  while (
    playerWins < ROUNDS_FOR_MATCH_WIN &&
    computerWins < ROUNDS_FOR_MATCH_WIN
  ) {
    let board = initializeBoard();

    while (true) {
      displayBoard(board);

      playerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;

      computerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;
    }
    displayBoard(board);

    if (someoneWon(board)) {
      let winner = detectWinner(board);
      prompt(`${winner} won!`);
      winner === "Player" ? (playerWins += 1) : (computerWins += 1);
    } else {
      console.log("It's a tie!");
    }
    console.log(`player: ${playerWins}; computer: ${computerWins}`);
  }

  playerWins = 0;
  computerWins = 0;
  prompt("Play again? (y|n)");
  let answer = readline.question();
  if (answer !== "y") break;
}

prompt("Thanks for playing Tic Tac Toe!");
