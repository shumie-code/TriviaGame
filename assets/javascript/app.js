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
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;

    $('#time').html('Timer: ' + counter);

    if (counter === 0) {
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
  ${loadRemainingQuestion()}
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

$(document).on('click', '.choice', function () {
    clearInterval(timer);
    const selectedAnswer = $(this).attr('data-answer');
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        nextQuestion();
        console.log('Winner');
        preloadImage('win')
        setTimeout(nextQuestion, 3 * 1000);
        
    } else {
        lost++;
        nextQuestion();
        console.log('LOSER');
        preloadImage('lost')
        setTimeout(nextQuestion, 3 * 1000);
    }
    console.log('Yessir', selectedAnswer);
});;

function displayResult() {
    const result = `
    <p>You get ${score} questions(s) right</p>
    <p>You missed ${lost} questions(s)</p>
    <p>Total Questions ${quizQuestions.length} questions(s) right</p>
    <button class="btn btn-primary" id="reset"> Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on('click', '#reset', function () {;
    counter = 20;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});;

function loadRemainingQuestion() {
    const RemainingQuestion = quizQuestions.length - (currentQuestion + 1)
    const totalQuestion = quizQuestions.length;

    return `Remaining Question: ${RemainingQuestion}/${totalQuestion}`;
}

function randomImage(images) {
const random = Math.floor(Math.random() * images.length);
const randomImage = images[random];
return randomImage;
}

//display a gif for correct or wrong answers

function preloadImage(status) {
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if (status === 'win') {
        $('#game').html(`
        <p class="preload-image">Congratulations, you pick the correct answer</p>
        <p class="preload-image">The correct answer is <b>${correctAnswer}</b></p>
        <img src="${randomImage(happyImages)}"/>
        `);
    } else {
        $('#game').html (`
        <p class="preload-image">The correct answer was ${correctAnswer}</p>
        <p class="preload-image">You lost pretty bad</p>
        <img src="${randomImage(sadImages)}"/>
        `);
    }
}

$('#start').click(function(){
    $('#start').remove();
    $('#time').html(counter);
    loadQuestion();
});

