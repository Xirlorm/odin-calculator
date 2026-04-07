let calculator = {
  // variable and operators necessary to form an expression
  leftOperand: "",
  rightOperand: "",
  operation: undefined,

  // Operations to be performed by calculator
  add: (leftOperand, rightOperand) => leftOperand + rightOperand,
  subtract: (leftOperand, rightOperand) => leftOperand - rightOperand,
  divide: (leftOperand, rightOperand) => leftOperand / rightOperand,
  multiply: (leftOperand, rightOperand) => leftOperand * rightOperand,

  // Perform an operation
  operate() {
    let leftOperand, rightOperand;

    if (this.leftOperand.includes(".") || this.rightOperand.includes(".")) {
      leftOperand = parseFloat(this.leftOperand);
      rightOperand = parseFloat(this.rightOperand);
    } else {
      leftOperand = parseInt(this.leftOperand);
      rightOperand = parseInt(this.rightOperand);
    }

    switch (this.operation) {
      case "+":
        return this.add(leftOperand, rightOperand);
      case "-":
        return this.subtract(leftOperand, rightOperand);
      case "*":
        return this.multiply(leftOperand, rightOperand);
      case "/":
        return this.divide(leftOperand, rightOperand);
    }
  },

  // Erase the current expression
  clear() {
    this.leftOperand = "";
    this.rightOperand = "";
    this.operation = undefined;
  },
};

// Update the display with an expression
function updateDisplay(exprssn = "", result = "") {
  document.querySelector(".display .expression").textContent = exprssn;
  document.querySelector(".display .answer").textContent = result;
}

// Erase the current expresion from calculator
function clear() {
  updateDisplay();
  calculator.clear();
}

// Delete the last entered character from the expression
function del() {
  if (calculator.rightOperand) {
    calculator.rightOperand = calculator.rightOperand.substring(
      0,
      calculator.rightOperand.length - 1,
    );
  } else if (calculator.operation) {
    calculator.operation = "";
  } else {
    calculator.leftOperand = calculator.leftOperand.substring(
      0,
      calculator.leftOperand.length - 1,
    );
  }
}

// Calculator button UI pressing effect
document.querySelector(".controls").addEventListener("mousedown", (e) => {
  switch (e.target.className.includes("btn")) {
    case true:
      e.target.classList.add("mousedown");
  }
});

document.querySelector(".controls").addEventListener("mouseup", (e) => {
  const eventElement = e.target;
  e.target.classList.remove("mousedown"); // Remove calculator button UI effect

  // Update the operator to be used in performing the math calculation
  if (eventElement.className.includes("operator")) {
    if (calculator.operation && calculator.rightOperand) {
      calculator.leftOperand = `${calculator.operate()}`;
      calculator.rightOperand = "";
    }
    calculator.operation = e.target.getAttribute("data-value");
  }

  // Update the operands when a number button is pressed
  // If a decimal point is clicked instead update the current operand
  if (!isNaN(parseInt(eventElement.getAttribute("data-value")))) {
    if (!calculator.operation) {
      calculator.leftOperand += eventElement.getAttribute("data-value");
    } else {
      calculator.rightOperand += eventElement.getAttribute("data-value");
    }
  } else if (eventElement.getAttribute("data-value") === ".") {
    if (!calculator.operation && !calculator.leftOperand.includes(".")) {
      calculator.leftOperand += ".";
    } else if (!calculator.rightOperand.includes(".")) {
      calculator.rightOperand += ".";
    }
  }

  // Handler for clear, delete and equal button click events
  switch (eventElement.getAttribute("id")) {
    case "clear":
      clear();
      break;
    case "delete":
      del();
      break;
    case "equals":
      if (!calculator.rightOperand || !calculator.operation) {
        updateDisplay("", "Error");
        return;
      }
      break;
  }

  updateDisplay(
    `${calculator.leftOperand} ${calculator.operation || ""} ${calculator.rightOperand}`,
    `${calculator.rightOperand && calculator.operation ? calculator.operate() : ""}`,
  );
});
