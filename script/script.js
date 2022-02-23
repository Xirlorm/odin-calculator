
let currentValue = ''
let result = ''
let currentOperator = ''
let inputVal = ''

//MATHEMATICAL OPERATORS
//Addition operator
function add(num1, num2) {return num1 + num2;}
//Subtraction operator
function subtract(num1, num2) {
    if(!num2) return -num2;
    return num1 - num2;
}
//Multiplication operator
function multiply(num1, num2) {return num1 * num2;}
//Division operator
function divide(num1, num2) {
    if(num2==0) return 'Error!'
    return num1 / num2;
}


//Perform an operation on values
function operate(num1, num2, operator){
    num1 = Number(num1);
    num2 = Number(num2);
    if(isNaN(num1)) return 'Error!'
    switch(operator){
        case '+': result = add(num1, num2);
                  break;
        case '-': result = subtract(num1, num2);
                  break;
        case '×': result = multiply(num1, num2);
                  break;
        case '÷': result = divide(num1, num2);
                  break;
        default:
                  result = 'Error!';
    }
    return (result.toString().substring('.').length > 9) ? Number(result).toFixed(9) : result;
}


//Clear Screen
const clearScreen = document.querySelector('#clear-screen')
clearScreen.addEventListener('click', () => {
    currentValue = ''
    result = ''
    currentOperator = ''
    inputVal = ''
    updateScreen(0)
    displayResult(result)
})

//Update screen
function updateScreen(value){
    document.querySelector('.valInput').innerText = value
}

//Show Result
function displayResult(value){
    document.querySelector('.result').innerText = value
}

//Set operator
const operators = document.querySelectorAll('.operator')
for(let i = 0; i < operators.length; ++i){
    operators[i].addEventListener('click', (e)=>{
        if(currentOperator){
            result = operate(result, currentValue, currentOperator)
            currentOperator = e.target.innerText
        }else{
            result = currentValue
            currentOperator = e.target.innerText
        }
        currentValue = ''
        displayResult(result)
        inputVal += e.target.innerText
        updateScreen(inputVal)
        if(!decimalFlag) decimalFlag = !decimalFlag
    })
}

//Equal to
const equalTo = document.querySelector('#equals')
equalTo.addEventListener('click', ()=>{
    if(currentValue){
        result = operate(result, currentValue, currentOperator)
    }
    displayResult(result)
    currentOperator = ''
    inputVal = ''
})

//Number button
const numbers = document.querySelectorAll('.digit')
for(let i = 0; i < numbers.length; ++i){
    numbers[i].addEventListener('click', (e)=>{
        currentValue += e.target.innerText
        inputVal += e.target.innerText
        updateScreen(inputVal)
    })
}

let decimalFlag = true
//Add a decimal to the current numbers
const decimal = document.querySelector('#decimal')
decimal.addEventListener('click', ()=>{
    if(decimalFlag) {
        currentValue += '.'
        updateScreen((inputVal += '.'))
        decimalFlag = !decimalFlag
    }
})
