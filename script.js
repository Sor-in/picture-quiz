var images = {
    "dog": "img/dog.jpg",
    "cow": "img/cow.jpg",
    "cat": "img/cat.jpg",
    "goat": "img/goat.jpg",
    "deer": "img/deer.jpg",
    "hen": "img/hen.jpg",
    "lion": "img/lion.jpg",
    "parrot": "img/parrot.jpg",
    "tiger": "img/tiger.jpg"

}

var notes = {
    "note1": "Note 1 - Voluptate reprehenderit pariatur ullamco tempor ut incididunt aliqua ad excepteur ut cupidatat nulla. Lorem duis cupidatat est exercitation eiusmod voluptate. Sint veniam laboris reprehenderit tempor ipsum minim. Anim anim deserunt adipisicing fugiat laboris laborum occaecat incididunt sunt eiusmod. Aute aliquip dolore duis ea reprehenderit nostrud excepteur consectetur eiusmod velit ullamco ipsum esse.",
    "note2": "Note 2 - Elit laborum tempor nisi laboris consectetur ex ullamco incididunt ex nisi consectetur velit. Laboris ipsum dolor incididunt sunt nostrud nulla sunt do aliquip proident sunt cillum sunt. Non nisi incididunt culpa voluptate ex elit laborum irure amet eu culpa deserunt eu. Elit veniam ea quis quis eu ullamco laboris mollit in anim.",
    "note3": "Note 3 - Deserunt irure ipsum anim culpa aliquip. Amet pariatur proident sunt ipsum. Elit Lorem aute laboris adipisicing Lorem esse deserunt cillum laboris exercitation cillum deserunt nisi ad. Labore eu deserunt ipsum tempor cillum. Culpa nulla exercitation nostrud incididunt in Lorem sit irure commodo.",
    "note4": "Note 4 - Officia elit nostrud nisi esse mollit enim consequat exercitation. Ad dolore laborum laborum dolor velit ullamco eu duis eu nostrud velit aliqua irure ea. Cupidatat incididunt dolore laboris pariatur. Tempor consectetur incididunt tempor fugiat irure nulla dolor quis do Lorem in veniam.",
    "note5": "Note 5 - Tempor do quis ut dolor sit. Anim occaecat deserunt do deserunt et consectetur incididunt. Proident nostrud cillum in officia elit. Laboris laboris minim proident labore anim exercitation officia ea sit Lorem reprehenderit ad id laborum. Nulla elit sit commodo culpa eu ea officia dolore qui qui nulla. Laborum adipisicing pariatur Lorem reprehenderit nostrud ullamco elit adipisicing aliquip voluptate."
}

// creare intrebari
// (intrebare, [keyImg1, keyImg2], raspCorect(keyImg 1 or 2) ,raspUser(""), keyNotes)


var questions = [
    new Question("Which one is dog?", ["cat", "dog"], "dog", "", "note1"),
    new Question("select tiger below", ["tiger", "lion"], "tiger", "", "note2"),
    new Question("choose parrot pls?", ["hen", "parrot"], "parrot", "", "note3"),
    new Question("Find cat below?", ["cat", "dog"], "cat", "", "note4"),
    new Question("choose lion pls?", ["lion", "tiger"], "lion", "", "note5")
];

dialog.addEventListener('close', (event) => {
    populate();
});

function populate() {
    if (quiz.isEnded()) {
        showScores();   
    } else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text; 

        // show options
        var choices = quiz.getQuestionIndex().choices;  
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = images[choices[i]] ? '<img src="' + images[choices[i]] + '"/>' : choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();

    }
}

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.setQuestionGuess(guess);

        var guessElement = document.getElementById("guess")
        var noteElement = document.getElementById("note")

        if(quiz.getQuestionIndex().isCorrectAnswer(guess)){
            guessElement.innerHTML = '<p>Raspuns corect: <span  class="correctguess">'+ quiz.getQuestionIndex().guess +'</span></p>';
        }else{
            guessElement.innerHTML = '<p>Raspuns gresit: <span class="wrongguess">'+ quiz.getQuestionIndex().guess +'</span> ( <span class="correctguess">'+ quiz.getQuestionIndex().answer +'</span>)</p>';
        }

        noteElement.innerHTML = '<p class="">' + notes[quiz.getQuestionIndex().note] + '</p>'

        quiz.guess(guess);
        dialog.showModal();
    }
};

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function Question(text, choices, answer, guess, note) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.guess = guess;
    this.note = note;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;

}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.setQuestionGuess = function (guess) {
    this.questions[this.questionIndex].guess=guess;
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

// create quiz
var quiz = new Quiz(questions);
// console.log(quiz)

// display quiz
populate();
