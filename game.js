const questions = [
    {
      question: "Koja osoba donosi konačnu odluku da li će se obaviti rad pod naponom ili rad u beznaponskom stanju?",
      choices: ["Rukovoditelj radova (operater)", "Dispečer", "Organizator radova pod naponom"],
      correctAnswers: ["Rukovoditelj radova (operater)"]
    },
    {
      question: "Da li se u slučaju jakog vjetra može raditi pod naponom na zračnoj mreži?",
      choices: ["Rad pod naponom može početi", "Rad pod naponom može se završiti", "Rad pod naponom ne može početi", "Rad pod naponom u tijeku ne može se završiti"],
      correctAnswers: ["Rad pod naponom ne može početi", "Rad pod naponom u tijeku ne može se završiti"]
    },
    {
      question: "Da li se može obaviti RPN po mraku (u uvjetima smanjene vidljivosti)?",
      choices: ["Rad pod naponom se može obaviti bez posebnih mjera opreza", "Rad pod naponom se ne može obaviti bez posebnih mjera opreza", "Rad pod naponom se može obaviti uz uporabu pomoćne rasvjete"],
      correctAnswers: ["Rad pod naponom se može obaviti uz uporabu pomoćne rasvjete", "Rad pod naponom se ne može obaviti bez posebnih mjera opreza"]
    }
    // Add more questions here
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let reviewIndex = 0;
  let userAnswers = Array(questions.length).fill([]);

  function showQuestion() {
    const questionDiv = document.getElementById("question");
    const choicesUl = document.getElementById("choices");
    const currentQuestion = questions[currentQuestionIndex];

    questionDiv.textContent = currentQuestion.question;
    choicesUl.innerHTML = '';

    currentQuestion.choices.forEach(function(choice, index) {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = `q${currentQuestionIndex}`;
      checkbox.value = choice;
      li.appendChild(checkbox);
      li.appendChild(document.createTextNode(choice));
      choicesUl.appendChild(li);
    });
  }

  function checkAnswer() {
    const selectedChoices = document.querySelectorAll(`input[name="q${currentQuestionIndex}"]:checked`);
    const selectedAnswers = Array.from(selectedChoices).map(choice => choice.value);
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswers;
    let isCorrect = selectedAnswers.length === correctAnswers.length && correctAnswers.every(answer => selectedAnswers.includes(answer));

    userAnswers[currentQuestionIndex] = selectedAnswers;

    if (isCorrect) {
      score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showReviewQuestion() {
    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = '';

    const question = questions[reviewIndex];
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>Question ${reviewIndex + 1}:</strong> ${question.question}`;
    const selectedAnswers = userAnswers[reviewIndex];

    const correctAnswers = question.correctAnswers;
    const isCorrect = selectedAnswers.length === correctAnswers.length && correctAnswers.every(answer => selectedAnswers.includes(answer));

    if (isCorrect) {
      listItem.style.color = "green";
    } else {
      listItem.style.color = "red";
      listItem.innerHTML += `<br><em>Correct answer(s): ${correctAnswers.join(", ")}</em>`;
    }

    reviewList.appendChild(listItem);
  }

  function nextQuestion() {
    reviewIndex++;
    if (reviewIndex >= questions.length) {
      reviewIndex = questions.length - 1;
    }
    showReviewQuestion();
    updateReviewButtons();
  }

  function prevQuestion() {
    reviewIndex--;
    if (reviewIndex < 0) {
      reviewIndex = 0;
    }
    showReviewQuestion();
    updateReviewButtons();
  }

  function updateReviewButtons() {
    const nextBtn = document.querySelector("#review button:nth-child(3)");
    const prevBtn = document.querySelector("#review button:nth-child(2)");

    if (reviewIndex === 0) {
      prevBtn.disabled = true;
    } else {
      prevBtn.disabled = false;
    }

    if (reviewIndex === questions.length - 1) {
      nextBtn.disabled = true;
    } else {
      nextBtn.disabled = false;
    }
  }

/*   function showResult() {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your Score: ${score} out of ${questions.length}`;
    const reviewBtn = document.getElementById("reviewBtn");
    reviewBtn.style.display = "block";
    const exitBtn = document.getElementById("exit");
    exitBtn.style.display = "block";

  
    // Hide the question and choices after the quiz is finished
    const questionDiv = document.getElementById("question");
    const choicesUl = document.getElementById("choices");
    questionDiv.style.display = "none";
    choicesUl.style.display = "none";
  } */
  
  function startReview() {
    const reviewDiv = document.getElementById("review");
    reviewDiv.style.display = "block";
    reviewIndex = 0;
    showReviewQuestion();
    updateReviewButtons();
  
    const scoreReviewDiv = document.getElementById("scoreReview");
    scoreReviewDiv.style.display = "block";
  
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "none";
    const reviewBtn = document.getElementById("reviewBtn");
    reviewBtn.style.display = "none";
  }
  
  // Add this function to show the final score and review
  function showFinalScoreAndReview() {
    const scoreResultDiv = document.getElementById("scoreResult");
    scoreResultDiv.textContent = `Your Final Score: ${score} out of ${questions.length}`;
    const exitBtn = document.getElementById("exit");
    exitBtn.style.display = "block";
    const sljedece = document.getElementById("sljedece");
    sljedece.style.display = "none";
  
    const reviewListFinal = document.getElementById("review-list-final");
    reviewListFinal.innerHTML = '';
  
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const listItem = document.createElement("li");
      listItem.innerHTML = `<strong>Question ${i + 1}:</strong> ${question.question}`;
      const selectedAnswers = userAnswers[i];
      const correctAnswers = question.correctAnswers;
      const isCorrect = selectedAnswers.length === correctAnswers.length && correctAnswers.every(answer => selectedAnswers.includes(answer));
  
      if (isCorrect) {
        listItem.style.color = "green";
      } else {
        listItem.style.color = "red";
        listItem.innerHTML += `<br><em>Correct answer(s): ${correctAnswers.join(", ")}</em>`;
      }
  
      reviewListFinal.appendChild(listItem);
    }
  
    // Hide the review section and show the final score and review
    const reviewDiv = document.getElementById("review");
    reviewDiv.style.display = "none";
    const scoreReviewDiv = document.getElementById("scoreReview");
    scoreReviewDiv.style.display = "block";
  }
  
  // Update the showResult function call
  function showResult() {
    const resultDiv = document.getElementById("result");
    resultDiv.textContent = `Your Score: ${score} out of ${questions.length}`;
    const reviewBtn = document.getElementById("reviewBtn");
    reviewBtn.style.display = "block";
    const exitBtn = document.getElementById("exit");
    exitBtn.style.display = "block";
    const sljedece = document.getElementById("sljedece");
    sljedece.style.display = "none";
  
    // Hide the question and choices after the quiz is finished
    const questionDiv = document.getElementById("question");
    const choicesUl = document.getElementById("choices");
    questionDiv.style.display = "none";
    choicesUl.style.display = "none";
  
    // Show the final score and review after the quiz is finished
    showFinalScoreAndReview();
  }
  
  // Call the initial showQuestion function to start the quiz
  showQuestion();

  