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

const update_screen = () => document.querySelector('.user-input').innerText = expression.join('');

const display_result = value => document.querySelector('.result').innerText = value;

const digitBtns = document.getElementsByClassName('digit');
for (let btn of digitBtns) {
    btn.addEventListener( 'click', (event) => {
        const value = event.target.getAttribute('data-key');

        if (expression.length < 1) expression.push(value);
        else {
            const last_val = expression[expression.length - 1][0];
           
            if (last_val == '+' || last_val == '-' || last_val == 'x' || last_val == '/')
                expression.push(value);
            else
                expression[expression.length - 1] += value;
        }

        update_screen();
    });
}

// Add current value and operator to expression when an operator button is clicked
const expression = [];
const operators = document.getElementsByClassName('operator');
for (let btn of operators) {
    btn.addEventListener('click', (event) => {
        const currentOperator = event.target.getAttribute('data-key');
        const last_val = expression[expression.length - 1];

        if (last_val == '+' || last_val == '-' || last_val == 'x' || last_val == '/')
            expression[expression.length - 1] = currentOperator;
        else
            expression.push(currentOperator);

        decimalFlag = false;
        update_screen();
    });
}

// Allow only single decimals for each number
let decimalFlag = false; // Decimal switch
document.getElementById('decimal') .addEventListener('click',
    () => {
        const lastExprssn = expression[expression.length - 1];

        if (lastExprssn != "+" && lastExprssn != "-" &&
            lastExprssn != "/" && lastExprssn != "x") 
            if (!lastExprssn.includes("."))
                expression[expression.length - 1] += ".";

        update_screen();
    }
);

// Clear current expression
document.getElementById('clear').addEventListener('click',
    () => {
        expression.length = 0;
        update_screen();
        display_result('');
    }
);

// Delete previous input
document.getElementById('delete').addEventListener('click',
    () => {
        if (expression[expression.length - 1].length < 2) {
            expression.pop();
        } else {
            let val = expression.pop();
            val = val.slice(0, val.length -1);
            expression.push(val);
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


function calculate() {
    let result = 0;

    if (expression[0] == '÷' || expression[0] == '×')
        return "Math error!"
    else {
        for (let i = 0; i < expression.length; i += 2) {
            if (i == 0) {
                if (expression[i] == '-'|| expression[i] == '+') {
                    result = operate(
                        expression[i + 1], undefined, expression[i]
                    );
                } else {
                    result = operate(
                        expression[i], expression[i + 2], expression[i + 1]
                    );
                    i++;
                }
                continue;
            }

            result = operate(
                result, expression[i + 1], expression[i]
            )
        }
    }
    return result;
}
