/*
 * A simple calculator project to put in practice what I've learnt
 * on javascript, css and html so far.
 * This project exhibits DOM manipulation and user interactivity.
 */

// MATHEMATICAL OPERATORS

// Addition operator
const add = (num1, num2) => isNaN(num2) ? num1 : num1 + num2;

// Subtraction operator
const subtract = (num1, num2) => isNaN(num2) ? -num1 : num1 - num2;

// Multiplication operator
const multiply = (num1, num2) => isNaN(num2) ? 'Math error' : num1 * num2;

// Division operator
const divide = (num1, num2) => isNaN(num2) ? 'Math error' : (num1 / num2);

//Perform an operation on values
const operate = (num1, num2, operator) => {
    num1 = Number(num1);
    num2 = Number(num2);

    if (operator == undefined && isNaN(num2)) return num1;

    switch (operator) {
        case '+': result = add(num1, num2); break;
        case '-': result = subtract(num1, num2); break;
        case 'x': result = multiply(num1, num2); break;
        case '/': result = divide(num1, num2); break;
    }

    return (result.toString().substring('.').length > 12) ?
        Number(result).toFixed(12) : result;
}

const update_screen = () => document.querySelector('.user-input').innerText = exp.join('');

const display_result = value => document.querySelector('.result').innerText = value;

const digitBtns = document.getElementsByClassName('digit');
for (let btn of digitBtns) {
    btn.addEventListener( 'click', (event) => {
        const value = event.target.getAttribute('data-key');

        if (exp.length < 1) exp.push(value);
        else {
            const lastVal = exp[exp.length - 1][0];
           
            if (lastVal == '+' || lastVal == '-' || lastVal == 'x' || lastVal == '/')
                exp.push(value);
            else exp[exp.length - 1] += value;
        }

        update_screen();
    });
}

// Add current value and operator to expression when an operator button is clicked
const exp = [];
const operators = document.getElementsByClassName('operator');
for (let btn of operators) {
    btn.addEventListener('click', (event) => {
        const currentOperator = event.target.getAttribute('data-key');
        const lastVal = exp[exp.length - 1];

        if (lastVal == '+' || lastVal == '-' || lastVal == 'x' || lastVal == '/')
            exp[exp.length - 1] = currentOperator;
        else exp.push(currentOperator);

        decimalFlag = false;
        update_screen();
    });
}

// Allow only single decimals for each number
let decimalFlag = false; // Decimal switch
document.getElementById('decimal') .addEventListener('click',
    () => {
        const lastVal = exp[exp.length - 1];

        if (!isNaN(Number(lastVal)))
            if (!lastVal.includes(".")) exp[exp.length - 1] += ".";

        update_screen();
    }
);

// Clear current expression
document.getElementById('clear').addEventListener('click',
    () => {
        exp.length = 0;
        update_screen();
        display_result('');
    }
);

// Delete previous input
document.getElementById('delete').addEventListener('click',
    () => {
        if (exp[exp.length - 1].length < 2) {
            exp.pop();
        } else {
            let val = exp.pop();
            val = val.slice(0, val.length -1);
            exp.push(val);
        }

        update_screen();
        display_result('');
    }
);

// Show user result of current expression
document.getElementById('equals').addEventListener('click',
    () => {
        display_result(calculate());
    }
);

// Caculator logic
function calculate() {
    const solvedExp = Array(...exp);

    if (solvedExp[0] == '/' || solvedExp[solvedExp.length - 1] == '/') return 'Math Error!';
    if (solvedExp[0] == 'x' || solvedExp[solvedExp.length - 1] == 'x') return 'Math Error!';

    while (true) {
        if (solvedExp.includes("x")) {
            const index = solvedExp.indexOf("x");
            const subExp = solvedExp.splice(index - 1, 3);
            solvedExp.splice(
                index - 1,
                0, 
                operate(subExp[0], subExp[2], subExp[1])
            );
        } else if (solvedExp.includes("/")) {
            const index = solvedExp.indexOf("/");
            const subExp = solvedExp.splice(index - 1, 3);
            solvedExp.splice(
                index - 1,
                0, 
                operate( subExp[0], subExp[2], subExp[1])
            );
        } else break;
    }

    let result;
    for (let i = 0; i < solvedExp.length; i += 2) {
        if (i == 0) {
            if (solvedExp[i] == '-'|| solvedExp[i] == '+') {
                result = operate(
                    solvedExp[i + 1],
                    undefined,
                    solvedExp[i]
                );
            } else {
                result = operate(
                    solvedExp[i],
                    solvedExp[i + 2],
                    solvedExp[i + 1]
                );
                i++;
            }
            continue;
        }
        result = operate(result, solvedExp[i + 1], solvedExp[i])
    }
    
    return result;
}
