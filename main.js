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
  if (b === "0") {
    return "nice try Einstein";
  }
  return a / b;
}
function multiply(a, b) {
  return a * b;
}

function operate(op, a, b) {
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
        return "error";
  }
}

const buttonsNumber = document.querySelectorAll(".buttonNumber");
const buttonsOperator = document.querySelectorAll(".operator");
const display = document.querySelector("#display");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const decimalButton = document.querySelector(".dot");
const clearButton = document.querySelector(".clear");

clearButton.addEventListener("click", () => {
firstNumber = "";
secondNumber = "";
operator = "";
updateDisplay();
});

buttonsNumber.forEach((button) => {
    button.addEventListener("click", () => {
        if(operator === "") {
            firstNumber += button.textContent;
        } else {
            secondNumber += button.textContent;
        }

        updateDisplay();
    })
})

buttonsOperator.forEach((button) => {
    button.addEventListener("click", () => {
        if(firstNumber !== "" && secondNumber !== ""){
            let result = operate(operator, firstNumber, secondNumber);
            firstNumber = result.toString();
            secondNumber = "";
        }
        if(firstNumber !== ""){
            operator = button.textContent;
            updateDisplay();
        }
    });
});


equalsButton.addEventListener("click", () => {
    if (firstNumber !== "" && secondNumber !== "" && operator !== "") {
        let result = operate(operator, firstNumber, secondNumber);
        display.textContent = result;

        firstNumber = result.toString();
        operator = "";
        secondNumber = "";
        
    }
});

deleteButton.addEventListener("click", () => {
    if (secondNumber !== "") {
        secondNumber = secondNumber.slice(0, -1);
    } else if (operator !== "") {
        operator = "";
    } else if ( firstNumber !== "") {
        firstNumber = firstNumber.slice(0, -1);
    } else {
        return "error";
    }
    updateDisplay();
});


decimalButton.addEventListener("click", () => {
  if(operator === "") {
    if(!firstNumber.includes(".")) {
      if (firstNumber === "") 
      firstNumber = "0";
      firstNumber += ".";
       updateDisplay();
    }
  } else {
    if(!secondNumber.includes(".")) {
      secondNumber += ".";
      if (secondNumber === "") 
      secondNumber = "0";
       updateDisplay();
    }
  }
});