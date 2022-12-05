const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is 50 + 19?",
    answers: [
      { text: "69", correct: true },
      { text: "75", correct: false },
      { text: "60", correct: false },
      { text: "65", correct: false },
    ],
  },
  {
    question: "What does “www” stand for in a website browser?",
    answers: [
      { text: "Web Dev Simplified", correct: false },
      { text: "Traversy Media", correct: false },
      { text: "Dev Ed", correct: false },
      { text: "World Wide Web", correct: true },
    ],
  },
  {
    question: "How many days are there in a year?",
    answers: [
      { text: "7", correct: false },
      { text: "365", correct: true },
      { text: "180", correct: false },
      { text: "100", correct: false },
    ],
  },
  {
    question: "At which time “Namaz-e-khasoof” is offered ?",
    answers: [
      { text: "Storm", correct: false },
      { text: "Lunar eclipse", correct: true },
      { text: "Solar eclipse", correct: false },
      { text: "earthquake", correct: false },
    ],
  },
];
