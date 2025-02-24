let a = '';
let b = '';
let op = null;
const display = document.querySelector("#calculator-display");
const numberButtons = document.querySelectorAll(".number");
const addButton = document.querySelector("#add");
const substractButton = document.querySelector("#substract");
const divideButton = document.querySelector("#divide");
const multiplyButton = document.querySelector("#multiply");
const equalButton = document.querySelector("#equal");
const clearBtn = document.querySelector("#clear");
const decimalBtn = document.querySelector("#decimal");


document.addEventListener('keydown', function(event){
    const pressedKey = event.key;

    if(!isNaN(pressedKey)){
        display.textContent +=pressedKey;
        !op ? a += pressedKey : b += pressedKey;
    }

    if(pressedKey === '.'){
        if(!op && !a.includes(".")){
            a += ".";
            display.textContent += ".";
        } else if(op && !b.includes(".")){
            b += ".";
            display.textContent += ".";
        }
    }

    if(['+','-','*','/'].includes(pressedKey)){
        if(a && !op){
            op = pressedKey;
            display.textContent += ` ${pressedKey} `;
        }
    }

    if(event.key === 'Enter'){
        event.preventDefault();
        if(a && b && op){
            const result = operate(parseFloat(a), parseFloat(b), op);
            display.textContent = result;
            a = result.toString();
            b = '';
            op = null;
        }
    }

    if(pressedKey === 'Backspace') {
        let displayText = display.textContent.trim();

        if (b.length > 0) {
            b = b.slice(0, -1);
        }
        else if (op){
            op = null;
            displayText = displayText.slice(0,-3);
        }
        else if(a.length > 0){
            a = a.slice(0,-1);
        }

        display.textContent = displayText.slice(0,-1);
    }
});

numberButtons.forEach((noBtn) => {
    noBtn.addEventListener("click", () => {
        display.textContent += noBtn.innerText;
        !op ? a += noBtn.innerText : b += noBtn.innerText;
    });
});

clearBtn.addEventListener("click", () => {
    a = '';
    b = '';
    op = null;
    display.textContent = '';
})

decimalBtn.addEventListener("click", () => {
    if(!op){
        if(!a.includes(".")){
            a+= ".";
            display.textContent += ".";
        }
    } else {
        if(!b.includes(".")){
            b += ".";
            display.textContent += ".";
        }
    }
});

function handleOperator(operator, symbol){
    if (a && !op){
        op = operator;
        display.textContent += ` ${symbol} `;
    }
}

addButton.addEventListener("click", () => handleOperator("+", "+"));
substractButton.addEventListener("click", () => handleOperator("-", "-"));
divideButton.addEventListener("click", () => handleOperator("/", "/"));
multiplyButton.addEventListener("click", () => handleOperator("*", "*"));


equalButton.addEventListener("click", ()=>{
    if(a && b && op){
        const result = operate(parseFloat(a), parseFloat(b), op);
        display.textContent = result;
        a = result;
        b = '';
        op = null;
    }
})

function operate(a, b, op){
    switch (op){
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "/":
            return a / b;
        case "*":
            return a * b;
        default:
            return null;
    }
}
