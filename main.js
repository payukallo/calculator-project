const numberButtons = document.querySelectorAll(".numberButton");
const operatorButtons = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector(".dot");
const clearButton = document.querySelector(".clear");

let firstNumber = "";
let secondNumber = "";
let operator = "";

function updateDisplay() {
  let displayString = firstNumber;

  if (operator !== "") {
    displayString += " " + operator;
  }
  if (secondNumber !== "") {
    displayString += " " + secondNumber;
  }

  display.textContent = displayString;
}

function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function divide(a, b) {
  if (b === 0) {
    return "Error";
  }
  return a / b;
}
function multiply(a, b) {
  return a * b;
}

function operate(op, a, b) {
  a = Number(a);
  b = Number(b);

  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "/":
      return divide(a, b);
    case "*":
      return multiply(a, b);
    default:
      return null;
  }
}

clearButton.addEventListener("click", () => {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  updateDisplay();
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (operator === "") {
      firstNumber += button.textContent;
    } else {
      secondNumber += button.textContent;
    }

    updateDisplay();
  });
});

function roundResult(num) {
  return Math.round(num * 1000) / 1000;
}

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (firstNumber !== "" && secondNumber !== "") {
      let result = roundResult(operate(operator, firstNumber, secondNumber));
      firstNumber = result.toString();
      secondNumber = "";
    }
    if (firstNumber !== "") {
      operator = button.textContent;
      updateDisplay();
    }
  });
});

decimalButton.addEventListener("click", () => {
  if (operator === "") {
    if (!firstNumber.includes(".")) {
      if (firstNumber === "") firstNumber = "0";
      firstNumber += ".";
      updateDisplay();
    }
  } else {
    if (!secondNumber.includes(".")) {
      secondNumber += ".";
      if (secondNumber === "") secondNumber = "0";
      updateDisplay();
    }
  }
});

deleteButton.addEventListener("click", () => {
  if (secondNumber !== "") {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator !== "") {
    operator = "";
  } else if (firstNumber !== "") {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    return "error";
  }
  updateDisplay();
});

equalsButton.addEventListener("click", () => {
  if (firstNumber !== "" && secondNumber !== "" && operator !== "") {
    let result = roundResult(operate(operator, firstNumber, secondNumber));
    display.textContent = result;
    firstNumber = result.toString();
    operator = "";
    secondNumber = "";
  }
});


