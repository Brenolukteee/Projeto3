const quizQuestions = {
  1: {
    question: "Qual é a principal causa do aquecimento global?",
    options: [
      {
        label: "Emissão de gases do efeito estufa",
        correct: true,
      },
      {
        label: "Atividade solar intensa",
        correct: false,
      },
      {
        label: "Erupções vulcânicas",
        correct: false,
      },
      {
        label: "Ciclos naturais da Terra",
        correct: false,
      },
    ],
  },
  2: {
    question:
      "Quanto tempo leva para uma garrafa plástica se degradar na natureza?",
    options: [
      {
        label: "10 anos",
        correct: false,
      },
      {
        label: "50 anos",
        correct: false,
      },
      {
        label: "450 anos",
        correct: true,
      },
      {
        label: "100 anos",
        correct: false,
      },
    ],
  },
  3: {
    question: "Qual é a melhor forma de economizar água em casa?",
    options: [
      {
        label: "Tomar banhos mais longos",
        correct: false,
      },
      {
        label: "Deixar a torneira aberta ao escovar os dentes",
        correct: false,
      },
      {
        label: "Reutilizar água da chuva",
        correct: true,
      },
      {
        label: "Usar mangueira para lavar o carro",
        correct: false,
      },
    ],
  },
  4: {
    question: "O que é energia renovável?",
    options: [
      {
        label: "Energia que nunca acaba",
        correct: false,
      },
      {
        label: "Energia obtida de fontes que se regeneram naturalmente",
        correct: true,
      },
      {
        label: "Energia mais barata",
        correct: false,
      },
      {
        label: "Energia produzida apenas durante o dia",
        correct: false,
      },
    ],
  },
  5: {
    question: "Qual porcentagem da superfície terrestre é coberta por oceanos?",
    options: [
      {
        label: "50%",
        correct: false,
      },
      {
        label: "60%",
        correct: false,
      },
      {
        label: "71%",
        correct: true,
      },
      {
        label: "80%",
        correct: false,
      },
    ],
  },
};

let quizData = {};
let currentQuestion = 1;
let score = 0;
let totalQuestions = 0;
let userAnswers = [];

document.addEventListener("DOMContentLoaded", function () {
  const currentUser = sessionStorage.getItem("currentUser");
  if (!currentUser) {
    window.location.href = "login.html";
    return;
  }

  loadQuiz();
});

function loadQuiz() {
  try {
    quizData = quizQuestions;

    totalQuestions = Object.keys(quizData).length;

    userAnswers = new Array(totalQuestions);

    displayQuestion();
    updateProgress();
  } catch (error) {
    console.error("Error loading quiz:", error);
  }
}

function displayQuestion() {
  const question = quizData[currentQuestion.toString()];
  const quizContent = document.getElementById("quiz-content");

  quizContent.innerHTML = `
        <div class="question-card">
            <h2 class="question-text">${question.question}</h2>
            <div class="options-grid">
                ${question.options
                  .map(
                    (option, index) => `
                    <button class="option-button" data-index="${index}" onclick="selectOption(${index})">
                        ${option.label}
                    </button>
                `
                  )
                  .join("")}
            </div>
            <div class="quiz-actions">
                <button class="submit-button" id="submit-btn" onclick="submitAnswer()" disabled>
                    Confirmar Resposta
                </button>
            </div>
        </div>
    `;
}

function selectOption(optionIndex) {
  document.querySelectorAll(".option-button").forEach((btn) => {
    btn.classList.remove("selected");
  });

  document
    .querySelector(`[data-index="${optionIndex}"]`)
    .classList.add("selected");

  userAnswers[currentQuestion - 1] = optionIndex;

  document.getElementById("submit-btn").disabled = false;
}

function submitAnswer() {
  const question = quizData[currentQuestion.toString()];
  const selectedIndex = userAnswers[currentQuestion - 1];
  const isCorrect = question.options[selectedIndex].correct;

  if (isCorrect) {
    score++;
  }

  showAnswerFeedback(question, selectedIndex);
}

function showAnswerFeedback(question, selectedIndex) {
  const optionButtons = document.querySelectorAll(".option-button");
  optionButtons.forEach((btn) => (btn.disabled = true));

  question.options.forEach((option, index) => {
    const button = document.querySelector(`[data-index="${index}"]`);
    if (option.correct) {
      button.classList.add("correct");
    } else if (index === selectedIndex && !option.correct) {
      button.classList.add("incorrect");
    }
  });

  const submitBtn = document.getElementById("submit-btn");
  if (currentQuestion < totalQuestions) {
    submitBtn.textContent = "Próxima Pergunta";
    submitBtn.onclick = nextQuestion;
    submitBtn.disabled = false;
  } else {
    submitBtn.textContent = "Ver Resultado";
    submitBtn.onclick = showResults;
    submitBtn.disabled = false;
  }
}

function nextQuestion() {
  currentQuestion++;
  displayQuestion();
  updateProgress();
}

function updateProgress() {
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");

  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  progressFill.style.width = `${progressPercentage}%`;
  progressText.textContent = `Pergunta ${currentQuestion} de ${totalQuestions}`;
}

function showResults() {
  const quizContent = document.getElementById("quiz-content");
  const quizResults = document.getElementById("quiz-results");

  quizContent.style.display = "none";
  quizResults.style.display = "block";

  document.getElementById("final-score").textContent = score;

  const scoreMessage = document.getElementById("score-message");
  const percentage = (score / totalQuestions) * 100;

  if (percentage >= 80) {
    scoreMessage.textContent =
      "🌟 Excelente! Você tem uma ótima consciência ambiental!";
    scoreMessage.style.color = "#4caf50";
  } else if (percentage >= 60) {
    scoreMessage.textContent =
      "👍 Bom trabalho! Continue aprendendo sobre sustentabilidade.";
    scoreMessage.style.color = "#ff9800";
  } else {
    scoreMessage.textContent =
      "📚 Continue estudando! Cada pequeno passo conta para o meio ambiente.";
    scoreMessage.style.color = "#f44336";
  }

  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  progressFill.style.width = "100%";
  progressText.textContent = "Quiz Concluído";
}

function restartQuiz() {
  currentQuestion = 1;
  score = 0;
  userAnswers = new Array(totalQuestions);

  document.getElementById("quiz-content").style.display = "block";
  document.getElementById("quiz-results").style.display = "none";

  displayQuestion();
  updateProgress();
}
