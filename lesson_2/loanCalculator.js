const readline = require("readline-sync");

let loanAmount;
let apr;
let yearsInLoanTerm;
let additionalMonthsInLoanTerm;

function printGreeting() {
  console.log("******************************************");
  console.log("* Hello! Welcome to the Loan Calculator! *");
  console.log("******************************************\n");
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidInput(number) {
  return Number.isNaN(Number(number)) || Number(number) < 0 || number === "";
}

function getLoanAmount() {
  prompt(
    "Enter the amount of the loan WITHOUT the dollar sign ($) or commas; e.g 10000, 500.60, etc.:"
  );
  loanAmount = readline.question();

  while (invalidInput(loanAmount)) {
    prompt("Hmm... that is not a valid loan amount. Please try again:");
    loanAmount = readline.question();
  }
}

function getAPR() {
  prompt(
    "Enter the Annual Percentage Rate (APR) WITHOUT the percent sign (%); e.g. 5, 6.3, etc.:"
  );
  apr = readline.question();

  while (invalidInput(apr)) {
    prompt("Hmm... that is not a valid APR. Please try again:");
    apr = readline.question();
  }
}

function getYearsInLoanTerm() {
  prompt(
    "Enter the number of years in the loan term (you will be asked for additional months in the next step):"
  );
  yearsInLoanTerm = readline.question();

  while (invalidInput(yearsInLoanTerm)) {
    prompt("Hmm... that is not a valid entry. Please try again:");
    yearsInLoanTerm = readline.question();
  }
}

function getAdditionalLoanDurationMonths() {
  prompt("Enter the remaining months, if any, in the loan term:");

  additionalMonthsInLoanTerm = readline.question();

  while (invalidInput(additionalMonthsInLoanTerm)) {
    prompt("Hmm... that is not a valid entry. Please try again:");
    additionalMonthsInLoanTerm = readline.question();
  }
}

function calculateMonthlyPayment(
  loanAmount,
  apr,
  yearsInLoanTerm,
  additionalMonthsInLoanTerm
) {
  loanAmount = Number(loanAmount);
  apr = Number(apr);
  yearsInLoanTerm = Number(yearsInLoanTerm);
  additionalMonthsInLoanTerm = Number(additionalMonthsInLoanTerm);

  let monthlyInterestRate = apr / 100 / 12;
  let durationInMonths = yearsInLoanTerm * 12 + additionalMonthsInLoanTerm;
  if (apr === 0) {
    return loanAmount / durationInMonths;
  } else {
    return (
      loanAmount *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -durationInMonths)))
    );
  }
}

function offerOtherCalculation() {
  prompt("Would you like to calculate another payment (y/n)?");
  let anotherCalc = readline.question();

  while (!["y", "n"].includes(anotherCalc.toLowerCase())) {
    prompt("Please enter 'y' or 'n'.");
    anotherCalc = readline.question();
  }

  return anotherCalc;
}

printGreeting();

while (true) {
  getLoanAmount();

  getAPR();

  getYearsInLoanTerm();

  getAdditionalLoanDurationMonths();

  let monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    apr,
    yearsInLoanTerm,
    additionalMonthsInLoanTerm
  );

  prompt(`Your monthly payment is: $${monthlyPayment.toFixed(2)}\n`);

  if (offerOtherCalculation() === "n") {
    prompt("Thanks for using the Loan Calculator!");
    break;
  }
}
