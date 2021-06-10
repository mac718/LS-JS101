const readline = require("readline-sync");

function greet() {
  console.log("******************************************");
  console.log("* Hello! Welcome to the Loan Calculator! *");
  console.log("******************************************\n");
}

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidInput(number) {
  let splitNum = number.split(".");
  return (
    Number.isNaN(Number(number)) ||
    splitNum.length > 2 ||
    (splitNum[1] && splitNum[1].length > 2)
  );
}

greet();

while (true) {
  prompt("Enter the amount of the loan without the dollar sign ($):");
  let loanAmount = readline.question();

  while (invalidInput(loanAmount)) {
    prompt("Hmm... that is not a valid loan amount. Please try again:");
    loanAmount = readline.question();
  }

  prompt(
    "Enter the Annual Percentage Rate (APR) without the percent sign (%):"
  );
  let apr = readline.question();

  while (invalidInput(apr)) {
    prompt("Hmm... that is not a valid loan amount. Please try again:");
    apr = readline.question();
  }

  prompt("Enter the loan duration in years:");
  let loanDurationInYears = readline.question();

  while (invalidInput(loanDurationInYears)) {
    prompt("Hmm... that is not a valid loan amount. Please try again:");
    loanDurationInYears = readline.question();
  }

  let monthlyInterestRate = apr / 100 / 12;
  let durationInMonths = loanDurationInYears * 12;

  let monthlyPayment =
    loanAmount *
    (monthlyInterestRate /
      (1 - Math.pow(1 + monthlyInterestRate, -durationInMonths)));

  prompt(`Your monthly payment is: $${monthlyPayment.toFixed(2)}\n`);

  prompt("Would you like to calculate another payment (y/n)?");
  let anotherCalc = readline.question();

  while (!["y", "n"].includes(anotherCalc.toLowerCase())) {
    prompt("Please enter 'y' or 'n'.");
    anotherCalc = readline.question();
  }

  if (anotherCalc === "n") {
    break;
  }
}
