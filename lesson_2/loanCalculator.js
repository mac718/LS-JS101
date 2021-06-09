const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidLoanAmount(number) {
  let splitNum = number.split(".");
  return (
    Number.isNaN(Number(number)) ||
    splitNum.length > 2 ||
    (splitNum[1] && splitNum[1].length !== 2)
  );
}

console.log("******************************************");
console.log("* Hello! Welcome to the Loan Calculator! *");
console.log("******************************************");

prompt("Enter the amount of the loan:");
let loanAmount = readline.question();

while (invalidLoanAmount(loanAmount)) {
  prompt("Hmm... that is not a valid loan amount. Please try again:");
  loanAmount = readline.question();
}

prompt("Enter the Annual Percentage Rate (APR):");
let apr = readline.question();

prompt("Enter the loan duration:");
let loanDurationInYears = readline.question();

let monthlyInterestRate = apr / 100 / 12;
let durationInMonths = loanDurationInYears * 12;

let monthlyPayment =
  loanAmount *
  (monthlyInterestRate /
    (1 - Math.pow(1 + monthlyInterestRate, -durationInMonths)));

prompt(`Your monthly payment is: $${monthlyPayment}`);
