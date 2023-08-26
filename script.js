function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return Number(a) - Number(b);
}

function multiply(a, b) {
    return Number(a) * Number(b);
}

function divide(a, b) {
    return Number(a) / Number(b);
}

let leftNumber = "";
let operator;
let operatorUsed = false;
let rightNumber = "";
let resultGot = false;
let result;
let mainScreenReset = false;
let rightNumberCheck = false;

const buttonReset = document.querySelector("#reset");
const buttonDelete = document.querySelector("#delete");
const buttonNumber = document.querySelectorAll(".button-number");
const buttonOperator = document.querySelectorAll(".button-operator");
const buttonEqual = document.querySelector("#button-equal");
const buttonDot = document.querySelector("#button-dot");
const screenMainDisplay = document.querySelector("#main-display");
const screenSubDisplay = document.querySelector("#sub-display");

function resetCalculator() {
    screenMainDisplay.textContent = "0";
    screenSubDisplay.textContent = "";
    leftNumber = "";
    rightNumber = "";
    operator = "";
    operatorUsed = false;
    resultGot = false;
    mainScreenReset = false;
    rightNumberCheck = false;
}

function deleteDigit() {
    screenMainDisplay.textContent = screenMainDisplay.textContent.slice(0, -1);
    if (screenMainDisplay.textContent === "") screenMainDisplay.textContent = "0";
}

buttonReset.addEventListener("click", resetCalculator);

buttonDelete.addEventListener("click", deleteDigit);

function resetScreen() {
    if (screenMainDisplay.textContent === "0" || mainScreenReset) {
        screenMainDisplay.textContent = "";
    }
    mainScreenReset = false;
}

function getNumber(number) {
    if (!rightNumberCheck) {
        if (resultGot) {
            resetCalculator();
        }
        resetScreen();
        screenMainDisplay.textContent += number;
    } else {
        resetScreen();
        screenMainDisplay.textContent += number;
        operatorUsed = true;
    }
}

buttonNumber.forEach(button => {
    button.addEventListener("click", () => {
        getNumber(button.textContent);
    });
})

function divideByCero() {
    resetCalculator();
    screenSubDisplay.textContent = "ERROR";
    screenMainDisplay.textContent = "You can not divide by 0!";
    resultGot = true;
}

function operateSymbol(symbol) {
    if (!operatorUsed){
        leftNumber = screenMainDisplay.textContent;
        operator = symbol;
        screenSubDisplay.textContent = `${screenMainDisplay.textContent} ${operator} `;
        mainScreenReset = true;
        rightNumberCheck = true;
    } else {
        rightNumber = screenMainDisplay.textContent;
        if (rightNumber === "0" && operator === "÷") {
            divideByCero();
        } else {
            leftNumber = doOperation();
            operator = symbol;
            screenSubDisplay.textContent = `${leftNumber} ${operator}`
            screenMainDisplay.textContent = leftNumber;
            mainScreenReset = true;
            operatorUsed = false;
            rightNumberCheck = true;
        }
    }
}

buttonOperator.forEach(button => {
    button.addEventListener("click", () => {
        operateSymbol(button.textContent);
    })
})

function getOperation(operator) {
    switch (operator) {
        case "+":
            return add(leftNumber, rightNumber);
        case "-":
            return subtract(leftNumber, rightNumber);
        case "*":
            return multiply(leftNumber, rightNumber);
        case "÷":
            return divide(leftNumber, rightNumber);            
    }
}

function doOperation() {
    let operation = Math.round((getOperation(operator) + Number.EPSILON) * 1000) / 1000;
    screenSubDisplay.textContent = `${leftNumber} ${operator} ${rightNumber} =`
    screenMainDisplay.textContent = operation;
    resultGot = true;
    rightNumber = "";
    rightNumberCheck = false;
    return operation.toString();
    }

buttonEqual.addEventListener("click", getResult)

function getResult() {
    if (operatorUsed === true) { // To avoid pressing '=' many times in a row.
        rightNumber = screenMainDisplay.textContent;
        if (rightNumber === "0" && operator === "÷") {
            divideByCero();
        } else if (leftNumber !== "" && rightNumber !== "") {
            leftNumber = doOperation();
            operatorUsed = false;
            mainScreenReset = true;
        }
    }    
}

function addDecimalPoint(){
    if (!rightNumberCheck) {
        if (resultGot) {
            resetCalculator();
        }
        if (!screenMainDisplay.textContent.includes(".")) {
            screenMainDisplay.textContent += ".";
        }
        mainScreenReset = false;
    } else {
        console.log(screenMainDisplay.textContent, leftNumber)
        if (screenMainDisplay.textContent === leftNumber) {
            screenMainDisplay.textContent = "0";
            mainScreenReset = false;
        }
        if (!screenMainDisplay.textContent.includes(".")) {
            screenMainDisplay.textContent += ".";
        }
    }
}

buttonDot.addEventListener("click", addDecimalPoint);

function handleKeyboard(e) {
    if (e.key >= "0" && e.key <= "9") getNumber(e.key);
    if (e.key === ".") addDecimalPoint();
    if (e.key === "Enter")  getResult();
    if (e.key === "Backspace") deleteDigit();
    if (e.key === "Escape") resetCalculator();
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        e.preventDefault(); // Avoid opening the search bar when pressed '/'.
        let operationKey = e.key; // Used to change '/' symbol to '÷'.
        if (operationKey === "/") operationKey = "÷";
        operateSymbol(operationKey);
    }
}

window.addEventListener("keydown", handleKeyboard);