// Intial Values
let counter = 20;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

//If the timer is over, go to the next question
function nextQuestion() {
const isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
if (isQuestionOver) {

    console.log('Game Over!');
    displayResult();

} else {
    currentQuestion++;
    loadQuestion();
}

}
//Start a 20 second timer for user to respond or choose an anser to each question
function timeUp() {
    clearInterval(timer);

    lost++;

    nextQuestion();
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter); 

    if(counter === 0) {
        timeUp();
    }
}
//Display the questions and choices in the browser

function loadQuestion() {
counter = 20;
timer = setInterval(countDown, 1000);

    const question = quizQuestions[currentQuestion].question; //
    const choices = quizQuestions[currentQuestion].choices;//
 
  $('#time').html('Timer: ' + counter);
  $('#game').html(`
  <h4>${question}</h4>
  ${loadChoices(choices)}
  `);
}

function loadChoices(choices) {
    let result = '';

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
   
    return result;

}

//Either correct ir wrong go to next question

$(document).on('click', '.choice', function() {
clearInterval(timer);
 const selectedAnswer = $(this).attr('data-answer');
 const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

 if (correctAnswer === selectedAnswer) {
     score++;
     nextQuestion();
     console.log('Winner');
 } else {
     lost++;
     nextQuestion();
     console.log('LOSER');
 }
console.log('Yessir', selectedAnswer);
});;

function displayResult(){
    const result = `
    <p>You get ${score} questions(s) right</p>
    <p>You missed ${lost} questions(s)</p>
    <p>Total Questions ${quizQuestions.length} questions(s) right</p>
    <button class="btn btn-primary" id="reset"> Reset Game</button>
    `;

    $('#game').html(result);
}

loadQuestion();

