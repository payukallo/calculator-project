const display = document.querySelector(".display");
const btns = document.querySelector("button");

let currentInput = "";
let previousInput = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentInput;
}

function inputNumber (num) {
    if(shouldResetDisplay) {
        currentInput = num === "." ? "0." : num ;
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }
    if(num === "." && currentInput.includes(".")) {
        return;
    }
    if(currentInput === "0" && num !== ".") {
        currentInput = num;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function calculate (operator, num1, num2 ) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num2 === 0 ? "Error" : num1 / num2;
        default:
            return num2
    }
}

function chooseOperator (nextOperator) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = Number(currentInput);
    operator = nextOperator;
    shouldResetDisplay = true;
}

function performCalculate () {
    if(operator === null || previousInput === null){
        return;
    }

    const num1 = previousInput;
    const num2 = Number(currentInput);
    const result = calculate(num1, num2, operator);

    if(result === "Error") {
        currentInput = "Error"; 
    } else {
        currentInput = string(Number(result.toPrecision(12))
        );
    }

    previousInput = null;
    operator = null;
    shouldResetDisplay = true;

    updateDisplay();
}