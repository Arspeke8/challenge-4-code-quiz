/*
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
*/

// Global variables
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var timerElement = document.getElementById("timer");
var scoreElement = document.getElementById("score");
var score = 0;
var timer = 60;
var timerInterval;
var shuffledQuestions, currentQuestionIndex;

// Start button event listener
startButton.addEventListener("click", startGame);

// Start game function
function startGame() {
    console.log("Started");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
    timerInterval = setInterval(function () {
        timer--;
        timerElement.textContent = timer;
        if (timer === 0) {
        clearInterval(timerInterval);
        endGame();
        }
    }, 1000);
    }

// Next button event listener
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
}
);

// Set next question function
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Show question function
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

// Reset state function
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

// Select answer function
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        endGame();
    }
}

// Set status class function
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
        score++;
        scoreElement.textContent = score;
    } else {
        element.classList.add("wrong");
        timer -= 10;
    }
}

// Clear status class function
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// End game function
function endGame() {
    clearInterval(timerInterval);
    var finalScore = score;
    var initials = prompt("Enter your initials");
    localStorage.setItem("initials", initials);
    localStorage.setItem("score", finalScore);
    window.location.href = "highscores.html";
}

// Questions array
var questions = [
    {   question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false }
        ]
    },
    {   question: "The condition in an if / else statement is enclosed within ____.",
        answers: [
            { text: "quotes", correct: false },
            { text: "curly brackets", correct: false },
            { text: "parentheses", correct: true },
            { text: "square brackets", correct: false }
        ]
    },
    {   question: "Arrays in JavaScript can be used to store ____.",
        answers: [
            { text: "numbers and strings", correct: false },
            { text: "other arrays", correct: false },
            { text: "booleans", correct: false },
            { text: "all of the above", correct: true }
        ]
    },
    {   question: "String values must be enclosed within ____ when being assigned to variables.",
        answers: [
            { text: "commas", correct: false },
            { text: "curly brackets", correct: false },
            { text: "quotes", correct: true },
            { text: "parentheses", correct: false }
        ]
    },
]







