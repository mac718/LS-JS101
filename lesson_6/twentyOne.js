const readline = require("readline-sync");

const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];
const suits = ["clubs", "spades", "hearts", "diamonds"];

let deck = [];

suits.forEach((suit) => {
  values.forEach((value) => {
    deck.push([value, suit]);
  });
});

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
    if (card[0] === "jack" || card[0] === "queen" || card[0] === "king") {
      total += 10;
    } else if (card[0] === "ace") {
      if (total + 11 > 21) {
        total += 1;
      } else {
        total += 11;
      }
    } else {
      total += card[0];
    }
  });

  return total;
}

shuffleDeck(deck);

let playerHand = deal(deck);
let action;
let playerTotal = calculateHandTotal(playerHand);

while (true) {
  prompt(
    `Your hand is ${playerHand}. Your total is ${playerTotal}. Hit or stay?`
  );
  action = readline.question().trim();

  if (action === "hit") {
    hit(deck, playerHand);
  } else if (action === "stay") {
    break;
  }
  playerTotal = calculateHandTotal(playerHand);
  prompt(
    `Now your hand is ${playerHand}. Your total is ${playerTotal}. Hit or stay?`
  );
}
