document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionContainer = document.getElementById('question-container');
    const questionText = document.getElementById('question-text');
    const choicesList = document.getElementById('choices-list');
    const resultContainer = document.getElementById('result-container');
    const scoreDisplay = document.getElementById('score');

    const questions = [
        { 
            question: "What is the capital of France?", 
            choices: ["Paris", "London", "Berlin", "Rome"],
            answer: "Paris" 
        },
        { 
            question: "Which planet is known as the 'Red Planet'?", 
            choices: ["Venus", "Mars", "Jupiter", "Saturn"], 
            answer: "Mars" 
        },
        { 
            question: "Who wrote the play 'Romeo and Juliet'?", 
            choices: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], 
            answer: "William Shakespeare" 
        },
        { 
            question: "Which is the largest ocean on Earth?", 
            choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], 
            answer: "Pacific Ocean" 
        },
        { 
            question: "What is the chemical symbol for gold?", 
            choices: ["Au", "Ag", "Pb", "Fe"], answer: "Au" 
        },
        { 
            question: "Who was the first person to walk on the moon?", 
            choices: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], 
            answer: "Neil Armstrong" 
        },
        { 
            question: "Which country is known as the 'Land of the Rising Sun'?", choices: ["China", "Japan", "South Korea", "Thailand"], 
            answer: "Japan" 
        },
        { 
            question: "What is the hardest natural substance on Earth?", 
            choices: ["Gold", "Iron", "Diamond", "Platinum"], 
            answer: "Diamond" 
        },
        { 
            question: "How many continents are there in the world?",
            choices: ["5", "6", "7", "8"], 
            answer: "7"
        },
        { 
            question: "Which is the longest river in the world?", 
            choices: ["Amazon River", "Nile River", "Mississippi River", "Yangtze River"], 
            answer: "Nile River" 
        }
    ];

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
        startQuiz();
    });

    function startQuiz() {
        startBtn.classList.add('hidden');
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        showQuestion();
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

        const correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) {
            li.style.backgroundColor = "#4CAF50"; // Green for correct answer
            score++;
        } else {
            li.style.backgroundColor = "#E53935"; // Red for incorrect answer
        }

        nextBtn.classList.remove('hidden');
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent = `${score} out of ${questions.length}`;
    }
});
