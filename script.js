const increaseItemButton = document.querySelector(".js-increase-items");
const decreaseItemButton = document.querySelector(".js-decrease-items");
const increaseDigitButton = document.querySelector(".js-increase-digits");
const decreaseDigitButton = document.querySelector(".js-decrease-digits");
const submitButton = document.querySelector(".submit-button");
const itemNumber = document.querySelector(".js-item-number");
const digitNumber = document.querySelector(".js-digit-number");
const questionListElement = document.querySelector(".js-question-list");
const operatorButtons = document.querySelectorAll(".js-operator");
const shuffleButton = document.querySelector(".shuffle-button");
const totalCorrectElement = document.querySelector(".total-correct");
const noAnswer = document.querySelector(".js-no-answer");

let itemValue = 1;
let digitValue = 1;
let selectedOperator = "+";

increaseItemButton.addEventListener("click", () => {
  if (itemValue > 0) {
    itemValue += 1;
    itemNumber.textContent = itemValue;
    generateQuestionListHTML();
  }
});

decreaseItemButton.addEventListener("click", () => {
  if (itemValue > 1) {
    itemValue -= 1;
    itemNumber.textContent = itemValue;
    generateQuestionListHTML();
  }
});

increaseDigitButton.addEventListener("click", () => {
  if (digitValue > 0) {
    digitValue += 1;
    digitNumber.textContent = digitValue;
    generateQuestionListHTML();
  }
});

decreaseDigitButton.addEventListener("click", () => {
  if (digitValue > 1) {
    digitValue -= 1;
    digitNumber.textContent = digitValue;
    generateQuestionListHTML();
  }
});

operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener("click", () => {
    selectedOperator = operatorButton.textContent;
    generateQuestionListHTML();
  });
});

shuffleButton.addEventListener("click", () => {
  generateQuestionListHTML();
});

submitButton.addEventListener("click", () => {
  checkAnswers();
});

// Generating HTML
function generateQuestionListHTML() {
  let questionListHTML = "";

  for (let index = 1; index <= itemValue; index++) {
    const randomNumber1 = generateRandomNumber(digitValue);
    const randomNumber2 = generateRandomNumber(digitValue);

    questionListHTML += `
        <p>${index}.) ${randomNumber1} ${selectedOperator} ${randomNumber2}</p>
        <input type="number" class="input-field">
      `;
  }

  questionListElement.innerHTML = questionListHTML;
  totalCorrectElement.textContent = "";
}

// Generates a random number with a specified number of digits
function generateRandomNumber(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Checks user answers
function checkAnswers() {
  const inputFields = document.querySelectorAll(".input-field");
  let totalCorrectAnswers = 0;

  inputFields.forEach((input) => {
    const answer = parseInt(input.value);
    const questionText = input.previousElementSibling.textContent;

    const regex = /(\d+)\s*([+\-x÷])\s*(\d+)/;
    const match = questionText.match(regex);

    if (match) {
      const [, num1, operator, num2] = match;

      let correctAnswer;
      switch (operator) {
        case "+":
          correctAnswer = parseInt(num1) + parseInt(num2);
          break;
        case "-":
          correctAnswer = parseInt(num1) - parseInt(num2);
          break;
        case "x":
          correctAnswer = parseInt(num1) * parseInt(num2);
          break;
        case "÷":
          const divisionResult = parseInt(num1) / parseInt(num2);
          correctAnswer = Number.isInteger(divisionResult)
            ? divisionResult
            : divisionResult.toFixed(2);
          break;
      }

      if (parseFloat(answer) === correctAnswer) {
        input.classList.remove("incorrect-answer");
        input.classList.add("correct-answer");
        totalCorrectAnswers++;
        totalCorrectElement.textContent = `Total correct answers: ${totalCorrectAnswers}`;
      } else {
        console.log(correctAnswer);
        input.classList.remove("correct-answer");
        input.classList.add("incorrect-answer");
      }
    } else {
      console.log("Question format error");
    }
  });
}

function initialize() {
  itemNumber.textContent = itemValue;
  digitNumber.textContent = digitValue;
  generateQuestionListHTML();
}

initialize();
