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

let humanWins = 0;
let computerWins = 0;

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

function handleChoiceAbbreviation(humanChoice) {
  switch (humanChoice.toLowerCase()) {
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

function getHumanChoice() {
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

function determineRoundWinner(human, comp) {
  if (playerWins(human, comp)) {
    humanWins += 1;
    return "human";
  } else if (human === comp) {
    return "tie";
  } else {
    computerWins += 1;
    return "computer";
  }
}

function displayRoundWinner(human, comp) {
  let winner = determineRoundWinner(human, comp);
  if (winner === "human") {
    prompt(`You win! You: ${humanWins}, Computer: ${computerWins}\n`);
  } else if (winner === "computer") {
    prompt(`Computer wins! You: ${humanWins}, Computer: ${computerWins}\n`);
  } else {
    prompt(`It's a tie! You: ${humanWins}, Computer: ${computerWins}\n`);
  }
}

while (true) {
  displayGreeting();

  while (humanWins < ROUNDS_FOR_WIN && computerWins < ROUNDS_FOR_WIN) {
    let humanChoice = getHumanChoice();

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    prompt(`You chose ${humanChoice}, computer chose ${computerChoice}`);

    displayRoundWinner(humanChoice, computerChoice);
  }

  if (humanWins === ROUNDS_FOR_WIN) {
    prompt("You win the match!");
  } else {
    prompt("Computer wins the match!");
  }

  humanWins = 0;
  computerWins = 0;

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
