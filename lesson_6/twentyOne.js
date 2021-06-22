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

function deal(deck) {
  return [deck.pop(), deck.pop()];
}

function hit(deck, hand) {
  let newCard = deck.pop();
  hand.push(newCard);
}

function calculateHandTotal(hand) {
  let total = 0;
  hand.forEach((card) => {
    if (["jack", "queen", "king"].includes(card)) {
      total += 10;
    } else if (card === "ace") {
      if (total + 11 > 21) {
        total += 1;
      } else {
        total += 11;
      }
    } else {
      total += Number(card);
    }
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

function displayGameResult(computerTotal, playerTotal) {
  if (computerTotal > 21) {
    prompt("Dealer busts; you win!");
  } else if (computerTotal > playerTotal) {
    prompt(`Computer wins!`);
  } else if (playerTotal > 21) {
    prompt(`You bust; dealer wins!`);
  } else {
    prompt("You win!");
  }
}

let deck = createDeck();
shuffleDeck(deck);

let playerHand = deal(deck);
let action;
let playerTotal = calculateHandTotal(playerHand);
let computerHand = deal(deck);
let computerTotal = calculateHandTotal(computerHand);

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
  prompt(`Computer has ${computerTotal} and you have ${playerTotal}`);

  if (computerTotal >= 17) break;
}
displayGameResult(computerTotal, playerTotal);
