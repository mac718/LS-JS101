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
    total + 11 > 21 ? (total += 1) : (total += 11);
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
  return total > 21;
}

function displayGameResult(computerTotal, playerTotal, playerHand) {
  if (computerTotal > 21) {
    prompt("Dealer busts; you win!");
  } else if (computerTotal > playerTotal) {
    prompt(
      `You have ${playerTotal} and computer has ${computerTotal}. Computer wins!`
    );
  } else if (playerTotal > 21) {
    prompt(
      `You have ${joinAnd(
        playerHand
      )} for a total of ${playerTotal}. You bust; dealer wins!`
    );
  } else {
    prompt(
      `You have ${playerTotal} and computer has ${computerTotal}.You win!`
    );
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

while (true) {
  let deck = createDeck();
  shuffleDeck(deck);

  let playerHand = deal(deck);
  let action;
  let playerTotal = calculateHandTotal(playerHand);
  let computerHand = deal(deck);
  let computerTotal = calculateHandTotal(computerHand);

  displayGreeting();
  while (true) {
    prompt(`The computer's hand is ${computerHand[0]} and unknown card.`);

    prompt(
      `Your hand is ${joinAnd(
        playerHand
      )}. Your total is ${playerTotal}. Hit or stay?`
    );

    action = readline.question().trim();

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

    if (computerTotal < 17) {
      hit(deck, computerHand);
    }

    computerTotal = calculateHandTotal(computerHand);
    prompt(
      `Computer has ${joinAnd(computerHand)} for a total of ${computerTotal}`
    );

    if (computerTotal >= 17) break;
  }
  displayGameResult(computerTotal, playerTotal, playerHand);
  if (["n", "no"].includes(playAgain())) break;
}

console.log("***********************");
console.log("* Thanks for playing! *");
console.log("***********************");
