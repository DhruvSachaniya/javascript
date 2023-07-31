gamePattern = [];

userClickedPattern = []

buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$('body').keypress(function () {
    if (!started) {
        $('#level-title').text('Level '+level);
        nextSequence();
        started = true;
    }
    
})


$('.btn').on('click', function (){

    var userChosenColur = this.id;

    userClickedPattern.push(userChosenColur);
    
    playSound(userChosenColur);

    animatePress(userChosenColur);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer (currentLevel) {
    console.log(gamePattern);
    console.log(userClickedPattern);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log('sucsedss');

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
        
        // userClickedPattern.length = 0;
    } else {
        console.log('fail');

        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200)

        playSound('wrong');

        $('#level-title').text('Game Over, Press Any Key to Restart');

        startOver();
    }
}


function nextSequence () {
    userClickedPattern = [];

    level ++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * (4 - 1 + 1) + 0); 
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" +randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    animatePress(randomChosenColour);
}

function playSound (name) {
    var audio = new Audio('sounds/'+name+'.mp3');
    audio.play();
}

function animatePress (currentColour) {
    $('#'+ currentColour).addClass('pressed');
    setTimeout(() => {
        $('#'+ currentColour).removeClass('pressed');
    }, 100);
}


function startOver () {
    level = 0;
    gamePattern = [];
    started = false;
}





