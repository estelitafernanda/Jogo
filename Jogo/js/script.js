const openDialogBtn = document.getElementById('openDialogBtn');
const customDialog = document.getElementById('customDialog');
const userInput = document.getElementById('userInput');
const feedbackMessage = document.getElementById('feedbackMessage');
const questionContainer = document.getElementById('questionContainer');
const questionText = document.getElementById('questionText');


let currentQuestionIndex = 0;
const questions = [
    { question: '2 + 2', answer: '4' },
    { question: '5 + 3', answer: '8' },
];

function openDialog() {
    console.log("openDialog chamada");
    setTimeout(() => {
        const bonequinhaRect = {
            x: bonequinha.position.x,
            y: bonequinha.position.y,
            width: bonequinha.width,
            height: bonequinha.height
        };

        const customDialogRect = {
            x: 441.6799999999999,
            y: 307,
            width: customDialog.offsetWidth,
            height: customDialog.offsetHeight
        };
        console.log('bonequinhaRect:', bonequinhaRect);
        console.log('customDialogRect:', customDialogRect);

        if (isCollision(bonequinhaRect, customDialogRect)) {
            resetDialog();
            customDialog.style.display = 'block';
            displayNextQuestion();
            console.log("bonequinha colidiu");
        }    
    }, );    
}

function closeDialog() {
    customDialog.style.display = 'none';
}

function resetDialog() {
    userInput.value = '';
    feedbackMessage.textContent = '';
    currentQuestionIndex = 0;
}

function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex].question;
        // Mostra a próxima pergunta na caixa de diálogo
        questionText.textContent = currentQuestion;
    } else {
        // Se todas as perguntas foram respondidas, fecha a caixa de diálogo
        closeDialog();
    }
}

function checkAnswer() {
    const userAnswer = userInput.value.trim();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        feedbackMessage.textContent = 'Correto!';
        currentQuestionIndex++;
        displayNextQuestion();
    } else {
        feedbackMessage.textContent = '';
        window.location.href = 'gameover.html'
    }

}

