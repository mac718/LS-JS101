const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors"];
const WINNING_COMBOS = [
  ["rock", "scissors"],
  ["scissors", "paper"],
  ["paper", "rock"],
];

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
      return "human";
    } else if (
      comp === WINNING_COMBOS[i][0] &&
      human === WINNING_COMBOS[i][1]
    ) {
      return "computer";
    } else if (comp === human) {
      return "tie";
    }
  }
}

function displayRoundWinner(human, comp) {
  let winner = determineRoundWinner(human, comp);
  if (winner === "human") {
    prompt("You win!");
  } else if (winner === "computer") {
    prompt("Computer wins!");
  } else {
    prompt("It's a tie!");
  }
}

while (true) {
  let humanChoice = getHumanChoice();

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  prompt(`You chose ${humanChoice}, computer chose ${computerChoice}`);

  displayRoundWinner(humanChoice, computerChoice);

  prompt("Do you want to play again (y/n)?");
  let answer = readline.question().toLowerCase();
  while (answer[0] !== "n" && answer[0] !== "y") {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== "y") break;
}
