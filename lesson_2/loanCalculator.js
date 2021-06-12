const readline = require("readline-sync");

let loanAmount;
let apr;
let loanDurationInYears;
let additionalLoanDurationMonths;

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
  prompt("Enter the amount of the loan without the dollar sign ($):");
  loanAmount = readline.question();

  while (invalidInput(loanAmount)) {
    prompt("Hmm... that is not a valid loan amount. Please try again:");
    loanAmount = readline.question();
  }
}

function getAPR() {
  prompt(
    "Enter the Annual Percentage Rate (APR) without the percent sign (%):"
  );
  apr = readline.question();

  while (invalidInput(apr)) {
    prompt("Hmm... that is not a valid APR. Please try again:");
    apr = readline.question();
  }
}

function getLoanDurationInYears() {
  prompt("Enter the loan duration in years:");
  loanDurationInYears = readline.question();

  while (invalidInput(loanDurationInYears)) {
    prompt("Hmm... that is not a valid loan duration. Please try again:");
    loanDurationInYears = readline.question();
  }
}

function getAdditionalLoanDurationMonths() {
  prompt("Enter the remaining months of the loan duration:");

  additionalLoanDurationMonths = readline.question();

  while (invalidInput(additionalLoanDurationMonths)) {
    prompt("Hmm... that is not a valid entry. Please try again:");
    additionalLoanDurationMonths = readline.question();
  }
}

function calculateMonthlyPayment(
  loanAmount,
  apr,
  loanDurationInYears,
  additionalLoanDurationMonths
) {
  loanAmount = Number(loanAmount);
  apr = Number(apr);
  loanDurationInYears = Number(loanDurationInYears);
  additionalLoanDurationMonths = Number(additionalLoanDurationMonths);

  console.log(additionalLoanDurationMonths, "Add");

  let monthlyInterestRate = apr / 100 / 12;
  let durationInMonths =
    loanDurationInYears * 12 + additionalLoanDurationMonths;
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

  getLoanDurationInYears();

  getAdditionalLoanDurationMonths();

  let monthlyPayment = calculateMonthlyPayment(
    loanAmount,
    apr,
    loanDurationInYears,
    additionalLoanDurationMonths
  );

  prompt(`Your monthly payment is: $${monthlyPayment.toFixed(2)}\n`);

  if (offerOtherCalculation() === "n") {
    break;
  }
}
