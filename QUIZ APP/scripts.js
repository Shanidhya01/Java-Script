document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const topicSelect = document.getElementById('topic-select');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');
    const topicContainer = document.getElementById('topic-container');
    const quizContainer = document.getElementById('quiz-container');
  
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let selected = false;
  
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) showQuestion();
      else showResult();
    });
  
    restartBtn.addEventListener('click', () => {
      currentQuestionIndex = 0;
      score = 0;
      resultContainer.classList.add('hidden');
      topicContainer.classList.remove('hidden');
      quizContainer.classList.add('hidden');
    });
  
    async function startQuiz() {
      const topic = topicSelect.value;
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${topic}&type=multiple`);
        const data = await response.json();
        questions = data.results.map(q => ({
          question: decodeHTML(q.question),
          choices: shuffle([...q.incorrect_answers, q.correct_answer].map(decodeHTML)),
          answer: decodeHTML(q.correct_answer)
        }));
  
        topicContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        score = 0;
        currentQuestionIndex = 0;
        showQuestion();
      } catch (err) {
        alert("Error loading questions. Please try again.");
      }
    }
  
    function showQuestion() {
      nextBtn.classList.add('hidden');
      questionText.textContent = questions[currentQuestionIndex].question;
      choicesList.innerHTML = '';
      selected = false;
  
      questions[currentQuestionIndex].choices.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => selectAnswer(li, choice));
        choicesList.appendChild(li);
      });
    }
  
    function selectAnswer(li, choice) {
      if (selected) return;
      selected = true;
      const correct = questions[currentQuestionIndex].answer;
  
      if (choice === correct) {
        li.style.backgroundColor = "#4CAF50"; // Green
        score++;
      } else {
        li.style.backgroundColor = "#E53935"; // Red
        const correctLi = [...choicesList.children].find(item => item.textContent === correct);
        if (correctLi) {
          correctLi.style.backgroundColor = "#4CAF50";
        }
      }
  
      nextBtn.classList.remove('hidden');
    }
  
    function showResult() {
      questionContainer.classList.add('hidden');
      resultContainer.classList.remove('hidden');
      scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }
  
    function decodeHTML(html) {
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  });
  