        // const dialog = document.getElementById('dialog');
        // // const text = document.getElementById('text');
        // // const jsbutton = document.getElementById('closeIt');
        // const modalless = document.getElementById('modalless');
        // // const reset = document.getElementById('reset');

        // modalless.addEventListener('click', (event) => {
        //     dialog.show();
        //     text.textContent = '';
        // });

        // // jsbutton.addEventListener('click', (event) => {
        // //     dialog.close();
        // //     text.innerHTML += '"close the dialog" closed the dialog.<br/>';
        // // });


        // // dialog.addEventListener('cancel', (event) => {
        // //     text.innerHTML += 'cance event happened<br/>';
        // // });

        dialog.addEventListener('close', (event) => {
          // text.innerHTML += 'close event happened<br/>';
          populate();
      });


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
          "note1":"Text for Note 1",
          "note2":"Text for Note 2",
          "note3":"Text for Note 3",
          "note4":"Text for Note 4",
          "note5":"Text for Note 5"
      }

      var questions = [
          new Question("Which one is dog?", ["cat", "dog"], "dog", "note1"),
          new Question("select tiger below", ["tiger", "lion"], "tiger", "note2"),
          new Question("choose parrot pls?", ["hen", "parrot"], "parrot", "note3"),
          new Question("Find cat below?", ["cat", "dog"], "cat", "note4"),
          new Question("choose lion pls?", ["lion", "tiger"], "lion", "note5")
      ];

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

              var note = document.getElementById("dialogid")
              note.innerHTML = notes[quiz.getQuestionIndex().note]
              console.log(quiz.getQuestionIndex())
              
              showProgress();
              
          }
      };

      function guess(id, guess) {
          var button = document.getElementById(id);
          button.onclick = function () {
              quiz.guess(guess);
              // populate();
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

      // create questions


      function Question(text, choices, answer, note) {
          this.text = text;
          this.choices = choices;
          this.answer = answer;
          this.note = note;
      }

      Question.prototype.isCorrectAnswer = function (choice) {
          return this.answer === choice;
      }


      function Quiz(questions) {
          this.score = 0;
          this.questions = questions;
          this.notes = notes;
          this.questionIndex = 0;
      }

      Quiz.prototype.getQuestionIndex = function () {
          return this.questions[this.questionIndex];
      }

      Quiz.prototype.guess = function (answer) {
          if (this.getQuestionIndex().isCorrectAnswer(answer)) {
              this.score++;
          }

          dialog.showModal();

          this.questionIndex++;
      }

      Quiz.prototype.isEnded = function () {
          return this.questionIndex === this.questions.length;
      }

      // create quiz
      var quiz = new Quiz(questions);
      console.log(quiz)

      // display quiz
      populate();
