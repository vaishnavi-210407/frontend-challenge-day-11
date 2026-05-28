const quizData = [
  {
    question: "Which language is used for web page styling?",
    options: ["HTML", "CSS", "Python", "Java"],
    answer: "CSS"
  },

  {
    question: "Which HTML tag is used for JavaScript?",
    options: ["<style>", "<script>", "<js>", "<javascript>"],
    answer: "<script>"
  },

  {
    question: "Which company developed JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: "Netscape"
  },

  {
    question: "Which symbol is used for comments in CSS?",
    options: ["// comment", "# comment", "/* comment */", "<!-- -->"],
    answer: "/* comment */"
  },

  {
    question: "Which method is used to select an element in JS?",
    options: [
      "getElementById()",
      "selectElement()",
      "query()",
      "findElement()"
    ],
    answer: "getElementById()"
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const nextBtn = document.getElementById("nextBtn");
const questionNumber = document.getElementById("questionNumber");

function loadQuestion(){

  clearInterval(timer);

  timeLeft = 15;
  timeEl.innerText = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;

    if(timeLeft <= 0){
      clearInterval(timer);
      disableOptions();
      nextBtn.style.display = "block";
    }

  },1000);

  const currentQuiz = quizData[currentQuestion];

  questionNumber.innerText =
    `Question ${currentQuestion + 1} of ${quizData.length}`;

  questionEl.innerText = currentQuiz.question;

  optionsEl.innerHTML = "";

  currentQuiz.options.forEach(option => {

    const button = document.createElement("button");

    button.innerText = option;
    button.classList.add("option");

    button.addEventListener("click", () => checkAnswer(button, option));

    optionsEl.appendChild(button);

  });

  nextBtn.style.display = "none";
}

function checkAnswer(button, selectedAnswer){

  clearInterval(timer);

  const correctAnswer = quizData[currentQuestion].answer;

  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach(btn => {

    btn.disabled = true;

    if(btn.innerText === correctAnswer){
      btn.classList.add("correct");
    }
  });

  if(selectedAnswer === correctAnswer){
    button.classList.add("correct");
    score++;
    scoreEl.innerText = score;
  }else{
    button.classList.add("wrong");
  }

  nextBtn.style.display = "block";
}

function disableOptions(){

  const correctAnswer = quizData[currentQuestion].answer;

  const allOptions = document.querySelectorAll(".option");

  allOptions.forEach(btn => {

    btn.disabled = true;

    if(btn.innerText === correctAnswer){
      btn.classList.add("correct");
    }

  });
}

nextBtn.addEventListener("click", () => {

  currentQuestion++;

  if(currentQuestion < quizData.length){
    loadQuestion();
  }else{
    showResult();
  }

});

function showResult(){

  document.getElementById("quizBox").style.display = "none";

  document.getElementById("resultBox").style.display = "block";

  document.getElementById("finalScore").innerText =
    `${score} / ${quizData.length}`;

}

function restartQuiz(){

  currentQuestion = 0;
  score = 0;

  scoreEl.innerText = score;

  document.getElementById("quizBox").style.display = "block";

  document.getElementById("resultBox").style.display = "none";

  loadQuestion();
}

loadQuestion();