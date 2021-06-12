const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const WINNING_COMBOS = [
  ["rock", "scissors"],
  ["scissors", "paper"],
  ["paper", "rock"],
  ["rock", "lizard"],
  ["lizard", "spock"],
  ["spock", "scissors"],
  ["scissors", "lizard"],
  ["lizard", "paper"],
  ["paper", "spock"],
  ["spock", "rock"],
];

let humanWins = 0;
let computerWins = 0;

function prompt(message) {
  console.log(`=> ${message}`);
}

function getHumanChoice() {
  prompt(`Choose one: ${VALID_CHOICES.join(", ")}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }
  return choice;
}

function determineRoundWinner(human, comp) {
  for (let i = 0; i < WINNING_COMBOS.length; i++) {
    if (human === WINNING_COMBOS[i][0] && comp === WINNING_COMBOS[i][1]) {
      humanWins += 1;
      return "human";
    } else if (
      comp === WINNING_COMBOS[i][0] &&
      human === WINNING_COMBOS[i][1]
    ) {
      computerWins += 1;
      return "computer";
    } else if (comp === human) {
      return "tie";
    }
  }
}

function displayRoundWinner(human, comp) {
  let winner = determineRoundWinner(human, comp);
  if (winner === "human") {
    prompt(`You win! You: ${humanWins}, Computer: ${computerWins}`);
  } else if (winner === "computer") {
    prompt(`Computer wins! You: ${humanWins}, Computer: ${computerWins}`);
  } else {
    prompt(`It's a tie! You: ${humanWins}, Computer: ${computerWins}`);
  }
}

while (true) {
  while (humanWins < 5 && computerWins < 5) {
    let humanChoice = getHumanChoice();

    let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
    let computerChoice = VALID_CHOICES[randomIndex];

    prompt(`You chose ${humanChoice}, computer chose ${computerChoice}`);

    displayRoundWinner(humanChoice, computerChoice);
  }

  if (humanWins === 5) {
    prompt("You win the match!");
  } else {
    prompt("Computer wins the match!");
  }

  humanWins = 0;
  computerWins = 0;

  prompt("Do you want to play again (y/n)?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== "n" && answer[0] !== "y") {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== "y") break;
}
