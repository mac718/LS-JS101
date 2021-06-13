const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const WINNING_COMBOS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

function playerWins(choice, computerChoice) {
  return WINNING_COMBOS[choice].includes(computerChoice);
}

const ROUNDS_FOR_WIN = 3;

let playerWinTotal = 0;
let computerWinTotal = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayGreeting() {
  console.log("**********************************************************");
  console.log("*                  Welcome to RPSLS!                     *");
  console.log("*                                                        *");
  console.log("* Enter 'rock', 'paper', 'scissors', 'lizard' or 'spock' *");
  console.log("* or 'r', 'p', 'sc', 'l', 'sp', respectively when        *");
  console.log("* prompted. The computer will then make its selection    *");
  console.log("* and a winner will be declared for that round.          *");
  console.log("* The first to win 3 rounds wins the match. Enjoy!       *");
  console.log("**********************************************************\n");
}

function handleChoiceAbbreviation(playerChoice) {
  switch (playerChoice.toLowerCase()) {
    case "r":
      return "rock";
    case "p":
      return "paper";
    case "sc":
      return "scissors";
    case "l":
      return "lizard";
    case "sp":
      return "spock";
  }
}

function getPlayerChoice() {
  prompt(`Choose one: ${VALID_CHOICES.join(", ")}`);
  let choice = readline.question().toLowerCase();
  if (choice.length <= 2) choice = handleChoiceAbbreviation(choice);

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question().toLowerCase();
    if (choice.length <= 2) choice = handleChoiceAbbreviation(choice);
  }
  return choice;
}

function determineRoundWinner(player, comp) {
  if (playerWins(player, comp)) {
    playerWinTotal += 1;
    return "player";
  } else if (player === comp) {
    return "tie";
  } else {
    computerWinTotal += 1;
    return "computer";
  }
}

function displayRoundWinner(player, comp) {
  let winner = determineRoundWinner(player, comp);
  if (winner === "player") {
    prompt(`You win! You: ${playerWinTotal}, Computer: ${computerWinTotal}\n`);
  } else if (winner === "computer") {
    prompt(
      `Computer wins! You: ${playerWinTotal}, Computer: ${computerWinTotal}\n`
    );
  } else {
    prompt(
      `It's a tie! You: ${playerWinTotal}, Computer: ${computerWinTotal}\n`
    );
  }
}

while (true) {
  displayGreeting();

  while (playerWinTotal < ROUNDS_FOR_WIN && computerWinTotal < ROUNDS_FOR_WIN) {
    let playerChoice = getPlayerChoice();

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    prompt(`You chose ${playerChoice}, computer chose ${computerChoice}`);

    displayRoundWinner(playerChoice, computerChoice);
  }

  if (playerWinTotal === ROUNDS_FOR_WIN) {
    prompt("You win the match!");
  } else {
    prompt("Computer wins the match!");
  }

  playerWinTotal = 0;
  computerWinTotal = 0;

  prompt("Do you want to play again (y/n)?");
  let answer = readline.question().toLowerCase();
  while (
    answer.toLocaleLowerCase() !== "y" &&
    answer.toLocaleLowerCase() !== "n"
  ) {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer.toLocaleLowerCase() !== "y") {
    console.log("***********************");
    console.log("* Thanks for playing! *");
    console.log("***********************");
    break;
  }
}
