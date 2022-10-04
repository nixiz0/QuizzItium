let header_screen = document.getElementById("header_screen");
let questions_screen = document.getElementById("questions_screen");
let result_screen = document.getElementById("result_screen");


function Quiz(){
    this.questions = [];
    this.nbrCorrects = 0;
    this.indexCurrentQuestion = 0;

    this.addQuestion = function(question) {
        this.questions.push(question);
    }

    this.displayCurrentQuestion = function() {
        if(this.indexCurrentQuestion < this.questions.length) {
            this.questions[this.indexCurrentQuestion].getElement(
                this.indexCurrentQuestion + 1, this.questions.length
            );
        }
        else {
            questions_screen.style.display = "none";

            let NbrCorrectUser = document.querySelector("#nbrCorrects");
            NbrCorrectUser.textContent = quiz.nbrCorrects;
            result_screen.style.display = "block";
        }
    }
}


function Question(title, answers, answerCorrect) {
    this.title = title,
    this.answers = answers,
    this.answerCorrect = answerCorrect,

    this.getElement = function(indexQuestion, nbrOfQuestions) {
        let questionTitle = document.createElement("h3");
        questionTitle.classList.add("title_questions");
        questionTitle.textContent = this.title;

        questions_screen.append(questionTitle);

        let questionAnswer = document.createElement("ul");
        questionAnswer.classList.add("list_questions");

        this.answers.forEach((answer, index) => {
            let answerElement =  document.createElement("li");
            answerElement.classList.add("answers");
            answerElement.textContent = answer;
            answerElement.id = index + 1;
            answerElement.addEventListener("click", this.checkAnswer)
    
            questionAnswer.append(answerElement);
        });

        let questionNumber = document.createElement("h4");
        questionNumber.classList.add("avancement_question");
        questionNumber.textContent = "Questions : " + indexQuestion + "/" + nbrOfQuestions;

        questions_screen.append(questionNumber);

        questions_screen.append(questionAnswer);
    }

    this.addAnswer = function(answer) {
        this.answers.push(answer);
    },

    // Ici on va checker la réponse correcte avec une écoute d'évènement :
    this.checkAnswer = (e) => {
        let answerSelect = e.target;
        if(this.isCorrectAnswer(answerSelect.id)) {
            answerSelect.classList.add("answersCorrect");
            quiz.nbrCorrects++;
        }
        else {
            answerSelect.classList.add("answersWrong");
            let RightAnswer = document.getElementById(this.answerCorrect);
            RightAnswer.classList.add("answersCorrect");
        }

        setTimeout(function() {
            questions_screen.textContent = '';
            quiz.indexCurrentQuestion++;
            quiz.displayCurrentQuestion();
        }, 1100);
    }

    this.isCorrectAnswer = function(answerUser) {
        if(answerUser == this.answerCorrect) {
            return true;
        }
        else {
            return false;
        }
    }
};

let quiz = new Quiz();

let question1 = new Question("Combien de pâtes dans un paquet ? ", [5130, 20, 8523], 1);
quiz.addQuestion(question1);

let question2 = new Question("De quel pays provient les pâtes ?", ["Grèce", "Espagne", "Italie"], 3);
quiz.addQuestion(question2);

let question3 = new Question("De quel pays provient la pizza ?", ["France", "Italie", "Japon"], 2);
quiz.addQuestion(question3);

// quiz.start();



// Ici je suis obligé de passer par un querySelectroAll pour avoir accès à la fonction ForEach (car le getElement ne le possède pas)
let NbrQuestion = document.querySelectorAll(".nbrQuestion");

NbrQuestion.forEach(function(NbrQuestion) {
    NbrQuestion.textContent = quiz.questions.length;
});


// Fonction servant à lancer le questionnaire en enlevant la page d'introduction du quiz et en mettant la première question
function startQuestions() {
    header_screen.style.display = "none";
    questions_screen.style.display = "block";

    quiz.displayCurrentQuestion();
}


// Récupérer le bouton dans mon html avec le ElementById car le ElementsByClassName n'a pas le addEventListener)
let btn_start = document.getElementById("btn_start");
btn_start.addEventListener("click", startQuestions);
