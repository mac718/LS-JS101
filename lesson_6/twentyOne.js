const readline = require("readline-sync");

const CARD_VALUES = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
];
const NUMBER_OF_SUITS = 4;
const MAX_TOTAL = 21;
const GAMES_TO_WIN_MATCH = 5;

let playerWins = 0;
let dealerWins = 0;

function createDeck() {
  let deck = [];
  for (let suit = 0; suit < NUMBER_OF_SUITS; suit++) {
    for (let value = 0; value < CARD_VALUES.length; value++) {
      deck.push(CARD_VALUES[value]);
    }
  }
  return deck;
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function shuffleDeck(deck) {
  for (let index = deck.length - 1; index > 0; index--) {
    let otherIndex = Math.floor(Math.random() * (index + 1));
    [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]];
  }
}

function displayGreeting() {
  console.log("**************************************************");
  console.log("* Welcome to 21! You and the computer will each  *");
  console.log("* be dealt a hand of 2 cards. Both of your card  *");
  console.log("* values will be visible, but only one of the    *");
  console.log("* computer's will be. You'll then be prompted to *");
  console.log("* hit or stay. Hitting will add another card to  *");
  console.log("* your total. Try to get as close to 21 without  *");
  console.log("* going over. Select stay when you are content   *");
  console.log("* with your current total. The computer will     *");
  console.log("* then play its hand and a winner will be        *");
  console.log("* announced. Enjoy!                              *");
  console.log("**************************************************\n");
  console.log("Hit any key to continue...");

  readline.question();
}

function deal(deck) {
  return [deck.pop(), deck.pop()];
}

function hit(deck, hand) {
  let newCard = deck.pop();
  hand.push(newCard);
}

function calculateHandTotal(hand) {
  let nonAces = hand.filter((card) => card !== "ace");
  let aces = hand.filter((card) => card === "ace");
  let total = 0;
  nonAces.forEach((card) => {
    if (["jack", "queen", "king"].includes(card)) {
      total += 10;
    } else {
      total += Number(card);
    }
  });

  aces.forEach((_) => {
    total + 11 > MAX_TOTAL ? (total += 1) : (total += 11);
  });

  return total;
}

function joinAnd(hand) {
  if (hand.length === 2) {
    return `${hand[0]} and ${hand[1]}`;
  } else {
    return (
      hand.slice(0, hand.length - 1).join(", ") +
      " and, " +
      hand[hand.length - 1]
    );
  }
}

function busted(total) {
  return total > MAX_TOTAL;
}

function determineGameResults(playerTotal, computerTotal) {
  if (busted(playerTotal)) {
    dealerWins += 1;
    return "PLAYER_BUSTED";
  } else if (busted(computerTotal)) {
    playerWins += 1;
    return "COMPUTER_BUSTED";
  } else if (playerTotal > computerTotal) {
    playerWins += 1;
    return "PLAYER_WINS";
  } else if (playerTotal < computerTotal) {
    dealerWins += 1;
    return "DEALER_WINS";
  } else {
    return "TIE";
  }
}

function displayGameResult(computerTotal, playerTotal) {
  let result = determineGameResults(playerTotal, computerTotal);
  const handsAndTotals = `You have ${playerTotal} and the dealer has ${computerTotal}`;
  console.log("\n");

  switch (result) {
    case "COMPUTER_BUSTED":
      prompt(`${handsAndTotals}. Dealer busts; * You win! *\n`);
      break;
    case "PLAYER_BUSTED":
      prompt(`${handsAndTotals}. You bust; * dealer wins! *\n`);
      break;
    case "PLAYER_WINS":
      prompt(`${handsAndTotals}. * You win! *\n`);
      break;
    case "DEALER_WINS":
      prompt(`${handsAndTotals}. * Dealer wins! *\n`);
      break;
    case "TIE":
      prompt(`${handsAndTotals}. * It's a tie! *\n`);
      break;
  }
}

function playAgain() {
  prompt("Would you like to play again? (y|n)");
  let answer = readline.question().trim();

  while (!["y", "n", "yes", "no"].includes(answer.toLowerCase())) {
    prompt(
      "Sorry, that's not a valid response. Would you like to play again? (y|n)"
    );
    answer = readline.question().trim();
  }
  return answer.toLowerCase();
}

function getPlayerAction(playerHand, playerTotal) {
  prompt(
    `Your hand is ${joinAnd(
      playerHand
    )}. Your total is ${playerTotal}. Hit or stay?`
  );

  let action = readline.question().trim().toLowerCase();

  while (!["hit", "stay"].includes(action)) {
    prompt("Sorry, that's not a valid entry. Hit or stay?");
    action = readline.question().trim().toLowerCase();
  }

  return action;
}

function displayComputerHand(computerHand) {
  prompt(`The computer's hand is ${computerHand[0]} and unknown card.`);
}

function displayMatchResults() {
  if (playerWins === 5) {
    prompt("You win the match!");
  } else {
    prompt("Dealer wins the match!");
  }
}

function displayMatchScore() {
  prompt(`Dealer score: ${dealerWins}; your score: ${playerWins}.\n`);
}

while (true) {
  displayGreeting();
  while (true) {
    let deck = createDeck();
    shuffleDeck(deck);

    let playerHand = deal(deck);
    let action;
    let playerTotal = calculateHandTotal(playerHand);
    let computerHand = deal(deck);
    let computerTotal = calculateHandTotal(computerHand);

    while (true) {
      displayComputerHand(computerHand);
      action = getPlayerAction(playerHand, playerTotal);

      if (action === "hit") {
        hit(deck, playerHand);
        playerTotal = calculateHandTotal(playerHand);
      }

      if (action === "stay" || busted(playerTotal)) break;
    }

    if (action === "stay") {
      prompt(`Your total is ${playerTotal}.`);
    }

    while (true) {
      if (busted(playerTotal)) break;

      computerTotal = calculateHandTotal(computerHand);

      if (computerTotal < MAX_TOTAL - 4) {
        hit(deck, computerHand);
      }

      computerTotal = calculateHandTotal(computerHand);
      prompt(
        `Computer has ${joinAnd(computerHand)} for a total of ${computerTotal}`
      );

      if (computerTotal >= MAX_TOTAL - 4) break;
    }

    console.clear();

    displayGameResult(computerTotal, playerTotal, playerHand, computerHand);
    displayMatchScore();

    if (playerWins === GAMES_TO_WIN_MATCH || dealerWins === GAMES_TO_WIN_MATCH)
      break;
  }

  displayMatchResults();

  if (["n", "no"].includes(playAgain())) break;
}

console.log("***********************");
console.log("* Thanks for playing! *");
console.log("***********************");
