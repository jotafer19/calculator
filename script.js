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
}

function deleteDigit() {
    console.log(leftNumber, operator, rightNumber)
    let stringToRemove = leftNumber + operator + rightNumber;
    console.log(stringToRemove);
    let removedString = stringToRemove.slice(0, -1);
    console.log(removedString);
}

buttonReset.addEventListener("click", resetCalculator);

buttonDelete.addEventListener("click", deleteDigit);

function resetScreen() {
    if (screenMainDisplay.textContent === "0" || mainScreenReset) {
        screenMainDisplay.textContent = "";
    }
    mainScreenReset = false;
}

function getNumber(e) {
    if (!operatorUsed) {
        if (resultGot) {
            resetCalculator();
        }
        resetScreen();
        screenMainDisplay.textContent += e.target.textContent;
    } else {
        resetScreen();
        screenMainDisplay.textContent += e.target.textContent;
    }
}

buttonNumber.forEach(button => {
    button.addEventListener("click", getNumber);
})

buttonOperator.forEach(button => {
    button.addEventListener("click", e => {
        if (!operatorUsed){
            leftNumber = screenMainDisplay.textContent;
            operator = e.target.textContent;
            screenSubDisplay.textContent = `${screenMainDisplay.textContent} ${operator} `;
            operatorUsed = true;
            mainScreenReset = true;
        } else {
            rightNumber = screenMainDisplay.textContent;
            if (rightNumber === "0" && operator === "÷") {
                resetCalculator();
                screenSubDisplay.textContent = "ERROR";
                screenMainDisplay.textContent = "You can not divide by 0!";
                resultGot = true;
            } else {
                leftNumber = doOperation();
                operator = e.target.textContent;
                screenSubDisplay.textContent = `${leftNumber} ${operator}`
                screenMainDisplay.textContent = leftNumber;
                mainScreenReset = true;
            }
        }
    })
})

function getOperation(operator) {
    switch (operator) {
        case "+":
            return add(leftNumber, rightNumber);
        case "-":
            return subtract(leftNumber, rightNumber);
        case "×":
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
    return operation;
    }

buttonEqual.addEventListener("click", () => {
    rightNumber = screenMainDisplay.textContent;
    if (rightNumber === "0" && operator === "÷") {
        resetCalculator();
        screenSubDisplay.textContent = "ERROR";
        screenMainDisplay.textContent = "You can not divide by 0!";
        resultGot = true;
    } else if (leftNumber !== "" && rightNumber !== "") {
        leftNumber = doOperation();
        operatorUsed = false;
        mainScreenReset = true;
    }
})

buttonDot.addEventListener("click", () => {
    if (!operatorUsed) {
        leftNumber = screenMainDisplay.textContent;
        if (!leftNumber.includes(".")) {
            leftNumber += ".";
            screenMainDisplay.textContent = leftNumber;
        }
    } else {
        if (screenMainDisplay.textContent === leftNumber) {
            screenMainDisplay.textContent = "0";
            mainScreenReset = false;
        }
        if (!screenMainDisplay.textContent.includes(".")) {
            screenMainDisplay.textContent += ".";
            rightNumber = screenMainDisplay.textContent;
        }
    }
});