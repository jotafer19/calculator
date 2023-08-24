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

buttonNumber.forEach(button => {
    button.addEventListener("click", e => {
        if (!operatorUsed) {
            if (resultGot === true) {
                leftNumber = "";
                resultGot = false; 
            }
            (leftNumber === "") ? leftNumber = e.target.textContent : leftNumber += e.target.textContent;
            screenMainDisplay.textContent = leftNumber;
        } else {
            (rightNumber === "") ? rightNumber = e.target.textContent : rightNumber += e.target.textContent;
            screenMainDisplay.textContent = rightNumber;
        }
    })
})

buttonOperator.forEach(button => {
    button.addEventListener("click", e => {
        if (leftNumber === "") leftNumber = 0;
        if (operatorUsed) {
            result = doOperation(rightNumber, operator);
            resultGot = true;
            leftNumber = result;
            rightNumber = "";
            operator = e.target.textContent;
            screenSubDisplay.textContent = `${result} ${operator}`
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

function doOperation(rightNumber, operator) {
    if (rightNumber == 0 && operator === "÷") {
        alert("You can not divide by 0!");
        rightNumber = "";
    } else if (rightNumber !== "") {
        let operationCheck = getOperation(operator);
        screenSubDisplay.textContent = `${leftNumber} ${operator} ${rightNumber} =`
        screenMainDisplay.textContent = operationCheck;
        return operationCheck;
    }
}

buttonEqual.addEventListener("click", () => {
    result = doOperation(rightNumber, operator);
    resultGot = true;
    operatorUsed = false;
    leftNumber = result;
    rightNumber = "";
})