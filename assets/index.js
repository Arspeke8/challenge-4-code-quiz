//Selecting Start button
const startButton = document.getElementById("start-button");
//Selecting Timer
const timer = document.getElementById("timer");
//Selecting Quiz Form
const quizForm = document.getElementById("quiz-form");
//Selecting all the questions
const questions = document.querySelectorAll(".question");
//Selecting game over div
const gameOver = document.getElementById("game-over");
//Selecting initials input and score form
const scoreForm = document.getElementById("score-form");
const initialsInput = document.getElementById("initials");

let secondsLeft = 60; //change this to the amount of time you want the quiz to be
let currentQuestion = 0; // Keeps track of the current question
let score = 0; // Keeps track of the score

// function that updates the timer
function updateTimer() {
  timer.textContent = "Time: " + secondsLeft;
  secondsLeft--;
  if (secondsLeft < 0) {
    endQuiz();
  }
}

//function that starts the quiz
function startQuiz() {
  setInterval(updateTimer, 1000);
  startButton.style.display = "none";
  quizForm.style.display = "block";
  showCurrentQuestion();
}

// function that shows the current question
function showCurrentQuestion() {
  questions.forEach(function (question) {
    question.style.display = "none";
  });
  questions[currentQuestion].style.display = "block";
}

// function that handles when an answer is submitted
function handleSubmit(event) {
  event.preventDefault();
  const selectedOption = event.target.elements["answer"];
  const selectedValue = selectedOption.value;
  if (selectedValue === questions[currentQuestion].correctAnswer) {
    score++;
  } else {
    secondsLeft = secondsLeft - 5; // or any other amount of time you want to subtract
  }
  currentQuestion++;
  if (currentQuestion === questions.length) {
    endQuiz();
  } else {
    showCurrentQuestion();
  }
}

// function that ends the quiz
function endQuiz() {
  clearInterval(updateTimer);
  quizForm.style.display = "none";
  gameOver.style.display = "block";
}
// add high score button
const viewHighScores = document.getElementById("view-high-scores");
viewHighScores.addEventListener("click", function() {
   window.location.href = "leaderboard.html"; //redirect to leaderboard page 
  
});


// function that saves the score
function saveScore() {
  const initials = initialsInput.value;
  localStorage.setItem("initials", initials);
  localStorage.setItem("score", score);
  window.location.href = "leaderboard.html";
}

startButton.addEventListener("click", startQuiz);
quizForm.addEventListener("submit", handleSubmit);
scoreForm.addEventListener("submit", saveScore);
