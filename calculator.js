"use strict";

let calcString = "";
let inputValue = "";
const stateList = {
  default: "default",
  calculating: "calculating",
  input: "input",
  executed: "executed"
}
let state = stateList.default;
const result = document.getElementById('result');
const calc = document.getElementsByClassName('calculation');

const showResult = (value = "0") => {
  result.value = "";
  result.textContent = value;
};

const pressNumber = (input) => {
  if (
    (inputValue === "" && (input === "00" || input === ".")) ||
    (calcString[calcString.length - 1] === "." && input === ".")
  ) {
    return;
  }
  if (state === stateList.executed) {
    calcString = "";
    inputValue = "";
  }
  state === stateList.calculating && resetColor();
  calcString += input;
  inputValue += input;
  showResult(inputValue);
  state = stateList.input;
};

const calculation = (operator) => {
  if(state !== stateList.calculating) {
    calcString += operator;
    inputValue = "";
    state = stateList.calculating;
  }
};

const resetColor = () => {
  for (let i = 0; i < calc.length; i++) {
    calc[i].classList.remove('clicked');
  }
};

const calcClicked = (event) => {
  resetColor();
  event.classList.add('clicked');  
};

const reverse = () => {
  inputValue = parseFloat(inputValue) * (-1);
  calcString += "*(-1)";
  showResult(inputValue);
};

const parcent = () => {
  inputValue = parseFloat(inputValue) / 100;
  calcString += "/100";
  showResult(inputValue);
};

const allClear = () => {
  calcString = "";
  inputValue = "";
  showResult();
  resetColor();
  state = stateList.default; // Make state default
};

const execute = () => {
  calcString = Function(`return ${calcString};`)();
  showResult(calcString);
  inputValue = calcString;
  resetColor();
  state = stateList.executed;
};

showResult(); // Make initial value 0