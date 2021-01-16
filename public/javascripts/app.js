var timeLeft = 10;
var currentScore = 0;
var highScore = 0;
var isStarted = false;
var operators = ["+"];
var range = 10;
firstValue = 0;
secondValue = 0;
operatorUsed = "+";
$(document).ready(function () {
  $("#current-score").html(currentScore);
  $("#high-score").html(highScore);
  firstValue = findFirstValue();
  secondValue = findSecondValue();
  displayValues(firstValue, secondValue, operatorUsed);
});
//display values Used

function displayValues(firstValue, secondValue, operatorUsed) {
  $("#firstValue").html(firstValue);
  $("#secondValue").html(secondValue);
  $("#operatorUsed").html(operatorUsed);
}
//Interval To Let user know what time is left
setInterval(function () {
  if (isStarted) {
    if (timeLeft <= 0) {
      var answerEntered = $("#answer-box").val();
      var answer = 0;
      if (operatorUsed == "+") {
        answer = Number(firstValue) + Number(secondValue);
      } else if (operatorUsed == "-") {
        answer = firstValue - secondValue;
      } else if (operatorUsed == "*") {
        answer = firstValue * secondValue;
      } else if (operatorUsed == "/") {
        answer = firstValue / secondValue;
      }
      if (answer == answerEntered) {
        operatorUsed = findOperator();
        firstValue = findFirstValue();
        secondValue = findSecondValue();
        displayValues(firstValue, secondValue, operatorUsed);
        currentScore++;
        if (currentScore > highScore) {
          highScore = currentScore;
        }
        $("#current-score").html(currentScore);
        $("#high-score").html(highScore);
        $("#answer-box").val("");
      } else {
        if (currentScore > highScore) {
          highScore = currentScore;
        }
        currentScore = 0;
        $("#current-score").html(currentScore);
        $("#high-score").html(highScore);
      }

      timeLeft = 10;
    }
    $("#counter-time-left").html(timeLeft);
    timeLeft--;
  }
}, 1000);

function findOperator() {
  var selected = [];
  $("input[name='operators[]']:checked").each(function (e) {
    selected.push($(this).val());
  });
  var operator = selected[Math.floor(Math.random() * selected.length)];
  return operator;
}

function findFirstValue() {
  return Math.ceil(Math.random() * range);
}
function findSecondValue() {
  return Math.ceil(Math.random() * range);
}

//To Start Interval Initially when user presses any key in answer box
$("body").delegate("#answer-box", "keyup", function () {
  isStarted = true;

  var answerEntered = $(this).val();
  var answer = 0;
  if (operatorUsed == "+") {
    answer = Number(firstValue) + Number(secondValue);
  } else if (operatorUsed == "-") {
    answer = firstValue - secondValue;
  } else if (operatorUsed == "*") {
    answer = firstValue * secondValue;
  } else if (operatorUsed == "/") {
    answer = firstValue / secondValue;
  }
  if (answer == answerEntered) {
    operatorUsed = findOperator();
    firstValue = findFirstValue();
    secondValue = findSecondValue();
    displayValues(firstValue, secondValue, operatorUsed);
    currentScore++;
    if (currentScore > highScore) {
      highScore = currentScore;
    }
    $("#current-score").html(currentScore);
    $("#high-score").html(highScore);
    $("#answer-box").val("");
  } else {
    if (currentScore > highScore) {
      highScore = currentScore;
    }
    currentScore = 0;
    $("#current-score").html(currentScore);
    $("#high-score").html(highScore);
  }
});

$("body").delegate("#limit", "change", function (e) {
  range = e.target.value;
  $("#range-indicator").html(range);
});
/*
current socre jo hai wo hr point py change ho rha hai.
lekin high score tb change hoga jb hm koi glti kren gay ya phr sai type ni kren gay.
r high score r current score hr counter khtm hony py update hoga.

*/
