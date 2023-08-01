// this is the array of questions 
const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      answer: "Paris",
      userAnswer: null,
    },
    {
      question: "Which one is the smallest ocean in the World?",
      options: ["Indian", "Pacific", "Atlantic", "Arctic"],
      answer: "Atlantic",
      userAnswer: null,
    },
    {
      question: " Dead Sea is located between which two countries?",
      options: ["ordan and Sudan", "Jordan and Israel", "UAE and Egypt", "Turkey and UAE"],
      answer: "Jordan and Israel",
      userAnswer: null,
    },
    {
        question: " Which one is the longest continental mountain range in the world?",
        options: ["Himalaya", "Andes", "Rocky Mountains", "Ural Mountains"],
        answer: "Andes",
        userAnswer: null,
      },
      {
        question: " Which country has the most number of lakes?",
        options: ["Canada", "USA", "Finland", "Brazil"],
        answer: "Canada",
        userAnswer: null,
      },
  ];
  
  // this functions take array of questions and array of options and shuffle them in a random order.
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // sending question array and options to get randomized
  shuffleArray(questions);
  questions.forEach((question) => shuffleArray(question.options));
  
  let currentQuestionIndex = 0;
  let score = 0;
  const questionTimeLimit = 15; 
  let timer; 
  
  function displayQuestion() {
    clearInterval(timer); 
    timer = setInterval(updateTimer, 1000); 
  
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const currentQuestion = questions[currentQuestionIndex];
  
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    optionsElement.innerHTML = "";
  
    currentQuestion.options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.className = "option";
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => selectOption(option, optionElement));
  
      if (currentQuestion.userAnswer === option) {
        optionElement.classList.add("selected");
      }
  
      optionsElement.appendChild(optionElement);
    });
  }
  
  function selectOption(selectedOption, optionElement) {
    const currentQuestion = questions[currentQuestionIndex];
    currentQuestion.userAnswer = selectedOption;
  
    const selectedOptions = document.querySelectorAll(".option.selected");
    selectedOptions.forEach((option) => {
      option.classList.remove("selected");
    });
  
    optionElement.classList.add("selected");
  
    if (currentQuestionIndex < questions.length - 1) {
      clearInterval(timer);// Clear the timer when an option is selected and it's not the last question
      timer = setInterval(updateTimer, 1000); // Restart the timer
    }
    }
  

  
  function checkAnswer() {
    clearInterval(timer); // Clear previous timer (if any)

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const timeLeftElement = document.getElementById("time-left"); // Add this line
  
    timeLeftElement.textContent = questionTimeLimit.toString(); // Reset the timer to the original time limit
  
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.userAnswer === currentQuestion.answer) {
      score++;
    }
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
  
  function displayResult() {
    const resultContainer = document.getElementById("result-container");
    const totalQuestions = questions.length;
    resultContainer.innerHTML = `<h2>Quiz Result</h2>
      <p>You scored ${score} out of ${totalQuestions}! ${score>3?" Great job!":"  Try better next time"} </p>
      <h3>Review your answers:</h3>
      <ul>`;
  
    questions.forEach((question, index) => {
      const result = question.userAnswer === question.answer ? "Correct" : "Incorrect";
      resultContainer.innerHTML += `<li>${index + 1}. ${question.question} - Your Answer: ${question.userAnswer} (${result})</li>`;
    });
  
    resultContainer.innerHTML += "</ul>";
    resultContainer.style.display = "block";
  
    // Hide question container and submit button
    document.querySelector(".question-container").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("timer").style.display = "none";
  }

  function updateTimer() {
    const timeLeftElement = document.getElementById("time-left");
    let timeLeft = parseInt(timeLeftElement.textContent);
    timeLeft--;
  
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer();
    } else {
      timeLeftElement.textContent = timeLeft.toString();
    }
  }

  function resetTimer() {
    clearInterval(timer);
    const timeLeftElement = document.getElementById("time-left");
    timeLeftElement.textContent = questionTimeLimit.toString();
  }
  
  function restartQuiz() {
    shuffleArray(questions);
    questions.forEach((question) => shuffleArray(question.options));
  
    questions.forEach((question) => {
      question.userAnswer = null;
    });
    resetTimer();
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("result-container").style.display = "none";
    document.getElementById("submit-btn").style.display = "block";
    document.querySelector(".question-container").style.display = "block";
    document.getElementById("timer").style.display = "inline";
    displayQuestion();
  }
  
  // Add event listener to the submit button
  document.getElementById("submit-btn").addEventListener("click", checkAnswer);
  
  // Add event listener to the restart button
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
  
  // Display the first question when the page loads
  displayQuestion();
  