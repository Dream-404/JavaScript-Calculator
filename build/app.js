const numberButton = document.querySelectorAll("[data-num]");
const operatorButton = document.querySelectorAll("[data-operator]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-del]");
const allClearButton = document.querySelector("[data-allClear]");
const preShowResult = document.querySelector("[data-previous]");
const currentShowResult = document.querySelector("[data-current]");

class Calculator {
  constructor(preShowResult, currentShowResult) {
    this.previous = preShowResult;
    this.current = currentShowResult;
    this.clear();
  }

  clear() {
    this.previousAnd = "";
    this.currentAnd = "";
    this.operation = undefined;
  }

  delete() {
    this.currentAnd = this.currentAnd.toString().slice(0, -1);
  }

  appendNumber(num) {
    if (num === "." && this.currentAnd.includes(".")) return;
    this.currentAnd = this.currentAnd.toString() + num.toString();
  }

  ChooseOperation(operator) {
    if (this.currentAnd === "") return;
    if (this.currentAnd !== "") {
      this.compute();
    }
    this.operation = operator;
    this.previousAnd = this.currentAnd;
    this.currentAnd = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousAnd);
    const current = parseFloat(this.currentAnd);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentAnd = computation;
    this.operation = undefined;
    this.previousAnd = "";
  }

  getDisplayNumber(num) {
    const stringNumber = num.toString();
    const intergerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];
    let intergerDisplay;
    if (isNaN(intergerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = intergerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigit != null) {
      return `${intergerDisplay}.${decimalDigit}`;
    } else {
      return intergerDisplay;
    }
  }

  UpdatedisplayResult() {
    this.current.innerText = this.getDisplayNumber(this.currentAnd);
    if (this.operation != null) {
      this.previous.innerText = `${this.getDisplayNumber(this.previousAnd)} ${
        this.operation
      }`;
    } else {
      this.previous.innerText = "";
    }
  }
}

const calculator = new Calculator(preShowResult, currentShowResult);

numberButton.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.UpdatedisplayResult();
  });
});

operatorButton.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.ChooseOperation(operator.innerText);
    calculator.UpdatedisplayResult();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.UpdatedisplayResult();
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.UpdatedisplayResult();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.UpdatedisplayResult();
});
