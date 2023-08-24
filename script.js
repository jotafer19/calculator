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

let leftNumber;
let operator;
let operatorUsed = false;
let rightNumber;
const buttonNumber = document.querySelectorAll(".button-number");
const buttonOperator = document.querySelectorAll(".button-operator");
const buttonEqual = document.querySelector("#button-equal");
const screenMainDisplay = document.querySelector("#main-display");
const screenSubDisplay = document.querySelector("#sub-display");

buttonNumber.forEach(button => {
    button.addEventListener("click", e => {
        if (!operatorUsed) {
            (leftNumber === undefined) ? leftNumber = e.target.textContent : leftNumber += e.target.textContent;
            screenMainDisplay.textContent = leftNumber;
        } else {
            (rightNumber === undefined) ? rightNumber = e.target.textContent : rightNumber += e.target.textContent;
            screenMainDisplay.textContent = rightNumber;
        }
        console.log(typeof(leftNumber));
        console.log("Right number: ", rightNumber)
    })
})

buttonOperator.forEach(button => {
    button.addEventListener("click", e => {
        if (leftNumber === undefined) leftNumber = 0;
        operator = e.target.textContent;
        console.log(operator);
        screenSubDisplay.textContent = `${screenMainDisplay.textContent} ${operator} `;
        operatorUsed = true;
    })
})

function getOperation(symbol) {
    console.log("hey")
    switch (symbol) {
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


buttonEqual.addEventListener("click", () => {
    if (rightNumber == 0 && operator === "÷") {
        alert("You can not divide by 0!");
        rightNumber = undefined;
    } else if (rightNumber !== undefined) {
        let result = getOperation(operator, rightNumber);
        screenSubDisplay.textContent = `${screenSubDisplay.textContent} ${rightNumber} =`
        screenMainDisplay.textContent = result;
        leftNumber = result;
        rightNumber = undefined;
        operatorUsed = false;
    }
})