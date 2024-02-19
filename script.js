//defining essential functions

var questions = document.getElementById("output")



function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function chooseOp() {
  let operator = ["+", "-", "*", "/"];
  let rand = operator[Math.floor(Math.random()*operator.length)];
  return rand;
}

function generateProblem() {
  let num1 = getRandomInt(1,10);
  let num2 = getRandomInt(1,10);
  let operator = chooseOp();
  let correct;
    if (operator == "+"){
      correct = num1 + num2;
    }

    else if (operator == "-"){
      correct = num1 - num2;
    }

    else if (operator == "*"){
      correct = num1 * num2;
    }

    else if (operator == "/"){
      if (newQuestion = true) {
        num1 = num1 * getRandomInt(1,4);
        num2 = num2 * getRandomInt(1,4);
      }

      if (num1 < num2){
        let numSwap = num1;
        num1 = num2;
        num2 = numSwap;
      }
      var remainder = num1%num2;
      if (remainder != 0) {
        num1 -= remainder;
      }

      correct = num1 / num2;
    }
  return [`${num1} ${operator} ${num2}`, correct];
}

//defining essential variables, arrays, and objects

var initTime = Date.now();
var timePassed = Date.now();
var newQuestion = true;
var answer = "";
console.log(timePassed,initTime)

//program begins

function onStart() {

  
  while (timePassed <= initTime + 61000) {

    var [problem, correct] = generateProblem();
    document.getElementById("output").innerText = `What is: ${problem}`
    timePassed = Date.now()

    if ()

  }
}