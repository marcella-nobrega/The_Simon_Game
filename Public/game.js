var randomNumber;
var randomChosenColors;
var userChosenColor;

var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];


// User First Click
function firstClik() {
  nextSequence(event.key);
  $("h1").text("Level 0");
}



// Generating the color sequence


function nextSequence() {

  // Random Number Generation
  var randomNumber = Math.floor(Math.random() * 3) + 1;

  console.log(randomNumber);

  // Transforming the number in Color
  var randomChosenColors = buttonColors[randomNumber];

  // Adding the new color to the array
  var buildingPattern =
    gamePattern.push(randomChosenColors);
  console.log(gamePattern);

  // Animating the button with

  // Sound
  playSound(randomChosenColors);

  // & Shade
  animatePress(randomChosenColors);

  $("h1").text("Level " + gamePattern.length);
}

// Sound Animation

function playSound(colorName) {
  switch (colorName) {
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    case "wrong":
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      break;
  }
}

// Shading Animation

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Comparing the elements of arrays

function arraysEqual(userClickedPattern, gamePattern) {

  return Array.isArray(userClickedPattern) &&
    Array.isArray(gamePattern) &&
    userClickedPattern.length === gamePattern.length &&
    userClickedPattern.every((val, index) => val === gamePattern[index]);
}



//** Starting the Game  **




// After the user pressed a key to start



$(document).keydown(function(event) {

  firstClik();

});


// User followed clicks

$(".btn").on("click", function(event) {

  var userChosenColor = $(this).attr("id");

  playSound(userChosenColor);

  animatePress(userChosenColor);

  userClickedPattern.push(userChosenColor);

  if (userClickedPattern.length === gamePattern.length) {

    console.log(userClickedPattern, gamePattern);

    checkColorPicked();
  }
});


// Checking if user clicked the right color sequence
function checkColorPicked() {

  if (arraysEqual(userClickedPattern, gamePattern) === true) {


    while (userClickedPattern.length > 0) {
      userClickedPattern.pop();
    }
    console.log(userClickedPattern);


    setTimeout(function() {
      nextSequence();
    }, 1000);



  } else {
    $("h1").text("Game Over Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 100);
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();

    while (gamePattern.length > 0) {
      userClickedPattern.pop();
    }

    $(document).keydown(function(event) {

      firstClik();

    });

  }


}
