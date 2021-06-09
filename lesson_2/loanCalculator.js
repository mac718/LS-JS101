const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

console.log("******************************************");
console.log("* Hello! Welcome to the Loan Calculator! *");
console.log("******************************************");

prompt("Enter the amount of the loan:");
let loanAmount = readline.question();

prompt("Enter the Annual Percentage Rate (APR):");
let apr = readline.question();

prompt("Enter the loan duration:");
let loanDuration = readline.question();

let monthlyInterestRate = apr / 100 / 12;
let durationInMonths = loanDuration * 12;

let monthlyPayment =
  loanAmount *
  (monthlyInterestRate /
    (1 - Math.pow(1 + monthlyInterestRate, -durationInMonths)));

prompt(`Your monthly payment is: $${monthlyPayment}`);
