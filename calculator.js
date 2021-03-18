"use strict";

let calcString = ""; // String to input information for calculation
let inputValue = ""; // String which will be appeared on top display

// The state of calculator
const stateList = {
  default: "default", // Default status
  calculating: "calculating", // Just after pushing one of four operation buttons
  input: "input", // Inputting some numbers
  executed: "executed" // Just after pushing "=" button
};
let state = stateList.default; // Set default state to variable
const result = document.getElementById('result');
const calc = document.getElementsByClassName('calculation');

// Change the result depending on user's input
// Set the default value to display "0"
const showResult = (value = "0") => { 
  result.textContent = value;
};

// When inputting numbers, this function will be executed.
// Push numbers input into array to calculate later
const pressNumber = (input) => {
  if (
    (inputValue === "" && (input === "00" || input === ".")) || // Ignore "00" and "." when nothing input in a result area.
    (calcString[calcString.length - 1] === "." && input === ".") // Ignore "." just after user input it.
  ) {
    return;
  }
  if (state === stateList.executed) { // Make all information for calculation/displaying empty after user pushes "=" button
    calcString = "";
    inputValue = "";
  }
  state === stateList.calculating && resetColor(); // Make operator buttons original color if it's after user push them
  calcString += input; // Add input number at the end of string
  inputValue += input;
  showResult(inputValue); // Show what is input currently
  state = stateList.input; // Make the state of calculator "input"
};

// When operator buttons clicked, add that character at the end of string
const calculation = (operator) => {
  // Ignore input if nothing appeared in the top display.
  if(state !== stateList.default) { 
    // Delete the operator at the end of string if it's just after operator buttons input
    if (state === stateList.calculating) calcString = calcString.slice(0, -1);
    calcString += operator;
    inputValue = ""; // Clear the information to display
    state = stateList.calculating; // Make the state "calculating"
  }
};

// Reset all operator buttons color
const resetColor = () => {
  for (let i = 0; i < calc.length; i++) {
    calc[i].classList.remove('clicked');
  }
};

// Color input operator button
const calcClicked = (event) => {
  if(state !== stateList.default) {
    resetColor();
    event.classList.add('clicked');    
  }
};

// When "+/-" button pushed, 
// reverse the number signs of displayed numbers and calculation result
const reverse = () => {
  inputValue = parseFloat(inputValue) * (-1);
  calcString += "*(-1)";
  showResult(inputValue);
};

// When "%" button pushed, divide displayed numbers and calculation result by 100
const parcent = () => {
  inputValue = parseFloat(inputValue) / 100;
  calcString += "/100";
  showResult(inputValue);
};

// Make all information for calculation/displaying empty
const allClear = () => {
  calcString = "";
  inputValue = "";
  showResult();
  resetColor(); // Reset operator buttons color
  state = stateList.default; // Reset state default
};

// Calculate the formula inside calcString, and display the result of it
const execute = () => {
  console.log(calcString, inputValue);
  calcString = Function(`return ${calcString};`)(); // Carry out calculation by using Function object
  showResult(calcString);
  inputValue = calcString;
  resetColor();
  state = stateList.executed; // Set state executed
};

showResult(); // Make initial value 0