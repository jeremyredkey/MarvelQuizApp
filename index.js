function updateQuestionNumber() {
  STORE.currentQuestion++;
  $('#questionNumber').html(`${STORE.currentQuestion}`)
}

/* Displays the options for the current question */
function render() {
  //Need to generate question for user
  let html = "";
  if (STORE.page === "Landing Page") {
    html = `<div id="quiz-container" class="container text-center card">
       <p class="lead">Are you nerdy enough to call yourself a superfan of Marvel? <br> Then put your knowledge to the test with this quiz!</p>
       <button id="startBtn" type="button" class="btn btn-primary btn-lg">Start Quiz Now <i
           class="fas fa-angle-right"></i></button>
       </div>
   </div>`
  }
  else if (STORE.page === "Question") {

    let renderQuestion = STORE.questions[STORE.currentQuestion]
    let thisQuestion = renderQuestion.question;
    // console.log(thisQuestion)
    html = `            
    <div id="quiz-container" class="container text-center card">
                <div class="row">
                   <div class="col">
                   <form>
                    <div id="feedback"></div>
                       <!-- Quiz question -->
                       <div id="question">
                       <p class="lead">${thisQuestion}</p>
                       </div>
                       <div id="options">
                       <!-- Where options will populate -->
                        ${updateOptions()}
                       </div>
                       <hr>
                       <button id="submitBtn" type="submit" class="btn btn-primary btn-lg">Submit Answer <i
                               class="fas fa-angle-right"></i></button>
                              
                               </form>
                  </div>
                  </div>
                  `;


  } else if (STORE.page === "Feedback") {
    const { selectedOption, indexQuestion } = STORE

    let correctHtml = `<div class="alert alert-success" role="alert"><i class="fas fa-check"></i>
          <strong>${indexQuestion.answer}</strong> is correct, you scored one point!
            </div>`;

    let incorrectHtml = `
          <div class="alert alert-danger" role="alert">
  <i class="fas fa-times"></i> That answer is incorrect, you did not score a point! The answer was <strong>${indexQuestion.answer}</strong>.
</div>`
    if (selectedOption !== indexQuestion.answer) {
      html = incorrectHtml

    } if (selectedOption === indexQuestion.answer) {
      html = correctHtml


    }
    
    html += `<button id="nextButton">Next Question</button>`
  }
  else if (STORE.page === "Completed") {
    if (STORE.score > 12) {
 html = `
        <div id="quiz-container" class="container text-center card">
                <div class="row">
                   <div class="col">
                   <p class="lead">You did it! You are definitely a Marvel Superfan!</p>
      <button id="startBtn">Restart</button>
      </div>
      </div>
      </div>
      `
    } else {
html = `
        <div id="quiz-container" class="container text-center card">
                <div class="row">
                   <div class="col">
                   <p class="lead">You did not pass the test, please try again!</p>
      <button id="startBtn">Restart</button>
      </div>
      </div>
      </div>
      `
    }
     
    }
  html = `
  <div id="scoresQuestionNumDiv">  
            <h2><small>Questions Number: <span id="questionNumber">${STORE.currentQuestion + 1}</span> of 15 | Score: <span
                        id="quizScore">${STORE.score}</span>/15
                </small></h2>
            </div>` + html;
  $('main').html(html)
};


function updateOptions() {
  let optionsHtml = "";
  //setting index value
  let question = STORE.questions[STORE.currentQuestion];

  for (let i = 0; i < question.options.length; i++) {
    optionsHtml += `
          <!-- Start of all the available answers -->
          <div class="form-check">
              <input id="option${i + 1}" class="form-check-input" name="options" type="radio" value="${question.options[i]}" tabindex ="${i + 1}" required>
              <label for="option${i + 1}" class="form-check-label">
                  ${question.options[i]} <br>
              </label>
          </div>
      `
  }
  return `${optionsHtml}` 
}

//
function eventHandlers() {
  $("main").on("click", "#startBtn", e => {
    STORE.page = "Question";
    STORE.currentQuestion = 0;
    STORE.score = 0;
    render()
  })
  $("main").on("click", "#nextButton", e => {
    
    if(STORE.currentQuestion < 14 ) {
STORE.currentQuestion++
      STORE.page = "Question";
    } else {      
      STORE.page = "Completed";
    }
    
 
    render()
  })
}


function submitAnswer() {
  $("main").on('submit', 'form', e => {

    e.preventDefault();

    STORE.indexQuestion = STORE.questions[STORE.currentQuestion];
    STORE.selectedOption = $(".form-check-input:checked").val();
        if (STORE.selectedOption === STORE.indexQuestion.answer) {
    STORE.score++

    }

    STORE.page = "Feedback";
    render();


  });
}


function updateScore() {
  STORE.score++;
  $('#quizScore').html(`${STORE.score}`)

}





/* displays results and restart quiz button */



/* checks whether it reached the end of questions list */


/*checks whether the chosen option is right or wrong and displays respective message*/

// startQuiz function needs to be created
/* when a user clicks on start quiz button */
function startQuiz() {
  render()
  eventHandlers()
  updateOptions()
  submitAnswer()
};

$(startQuiz)
