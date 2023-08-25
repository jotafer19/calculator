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

const buttonReset = document.querySelector("#reset");
const buttonDelete = document.querySelector("#delete");
const buttonNumber = document.querySelectorAll(".button-number");
const buttonOperator = document.querySelectorAll(".button-operator");
const buttonEqual = document.querySelector("#button-equal");
const buttonDot = document.querySelector("#button-dot");
const screenMainDisplay = document.querySelector("#main-display");
const screenSubDisplay = document.querySelector("#sub-display");

function resetCalculator() {
    screenMainDisplay.textContent = 0;
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

function getNumber(e) {
    if (!operatorUsed) {
        if (resultGot) {
            leftNumber = "";
            resultGot = false; 
        }
        (leftNumber === "") ? leftNumber = e.target.textContent : leftNumber += e.target.textContent;
        screenMainDisplay.textContent = leftNumber;
    } else {
        console.log("right");
        (rightNumber === "") ? rightNumber = e.target.textContent : rightNumber += e.target.textContent;
        screenMainDisplay.textContent = rightNumber;
    }
}

buttonNumber.forEach(button => {
    button.addEventListener("click", getNumber);
})

buttonOperator.forEach(button => {
    button.addEventListener("click", e => {
        if (leftNumber === "") leftNumber = "0";
        if (rightNumber === "0" && operator === "÷") {
            resetCalculator();
            screenSubDisplay.textContent = "ERROR";
            screenMainDisplay.textContent = "You can not divide by 0!";
        } else if (operatorUsed && rightNumber !== "") {
            leftNumber = doOperation();
            operator = e.target.textContent;
            screenSubDisplay.textContent = `${leftNumber} ${operator}`
        } else {
            operator = e.target.textContent;
            screenSubDisplay.textContent = `${screenMainDisplay.textContent} ${operator} `;
            operatorUsed = true;
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
    let operation = Math.round((getOperation(operator) + Number.EPSILON) * 100) / 100;
    screenSubDisplay.textContent = `${leftNumber} ${operator} ${rightNumber} =`
    screenMainDisplay.textContent = operation;
    resultGot = true;
    rightNumber = "";
    return operation;
    }

buttonEqual.addEventListener("click", () => {
    if (rightNumber === "0" && operator === "÷") {
        resetCalculator();
        screenSubDisplay.textContent = "ERROR";
        screenMainDisplay.textContent = "You can not divide by 0!";
    } else if (leftNumber !== "" && rightNumber !== "") {
        leftNumber = doOperation();
        operatorUsed = false;
    }
})

buttonDot.addEventListener("click", () => {
    if (!operatorUsed) {
        if (leftNumber === "") leftNumber = "0";
        if (!leftNumber.includes(".")) {
            leftNumber += ".";
            screenMainDisplay.textContent = leftNumber;
        }
    } else {
        if (rightNumber === "") rightNumber = "0";
        if (!rightNumber.includes(".")) {
            rightNumber += ".";
            screenMainDisplay.textContent = rightNumber;
        }
    }
});