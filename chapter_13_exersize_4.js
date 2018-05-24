var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var word = getRandomWord();
var answerArray = getPreparedAnswerArray();

var numOfSecretLetters = word.length;
var attempts = 0;
var numOfFailLetters = 0;

startGame();

/**
 * Отрисовка человечка 
 * @param {number} numOfFailLetters Количество ошибочных букв
 */
function drawMan(numOfFailLetters) {
    if (numOfFailLetters == 1) {
        ctx.strokeRect(100, 100, 50, 50);
    } else if (numOfFailLetters == 2) {
        ctx.beginPath();
        ctx.moveTo(125, 150); // пер. шаг, переехать
        ctx.lineTo(125, 225);
        ctx.stroke();
    } else if (numOfFailLetters == 3) {
        ctx.beginPath();
        ctx.moveTo(125, 200);
        ctx.lineTo(150, 175);
        ctx.moveTo(125, 200);
        ctx.lineTo(100, 175);
        ctx.stroke();
    } else if (numOfFailLetters == 4) {
        ctx.beginPath();
        ctx.moveTo(125, 225);
        ctx.lineTo(150, 250);
        ctx.moveTo(125, 225);
        ctx.lineTo(100, 250);
        ctx.stroke();
    }
}

function startGame() {
    while (numOfSecretLetters > 0 && attempts < 10) {
        attempts++;
        // Показываем состояние игры
        alert(answerArray.join(" "));

        //Запрашиваем вариант ответа
        var guess = prompt("Угадайте букву или нажмите Отмена для выхода из игры.");
        if (guess === null) {
            break;
        } else if (guess.length !== 1) {
            alert("Пожалуйста, введите одиночную букву.");
        } else {
            // Обновляем состояние игры
            guess = guess.toLowerCase();
            var index = word.indexOf(guess);
            if (index == -1) {
                numOfFailLetters++;
                drawMan(numOfFailLetters);
            } else {
                for (var j = 0; j < word.length; j++) {
                    if (word[j] === guess) {
                        if (answerArray[j] == "_") {
                            answerArray[j] = guess;
                            numOfSecretLetters--;
                        }
                    }
                }
            }
        }
    }
}

function finishGame() {
    if (numOfSecretLetters == 0) {
        alert(answerArray.join(" "));
        alert("Отлично! Было загадано слово " + word);
    } else {
        alert("Очень жаль, что вы не угадали! Было загадано слово " + word);
    }
}

function getRandomWord() {
    var words = [
        "макака",
        "баран",
        "лягушка"
    ];
    return words[Math.floor(Math.random() * words.length)];
}

function getPreparedAnswerArray() {
    var array = [];
    for (var i = 0; i < word.length; i++) {
        array[i] = "_";
    }
    return array;
}