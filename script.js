var gamePattern = [];
var userClickedPattern = []

var started = false;
var level = 0;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started =  true;
    }
})

var buttonColours=["red","blue", "green", "yellow"];

function startOver() {
    level=0;
    gamePattern=[];
    started=false;
}

function nextSequence(){

    level++;

    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    
    userClickedPattern = [];

}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
    
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

 


$(".btn").on("click", function() {
    var userClick = $(this).attr("id");
    userClickedPattern.push(userClick);

    playSound(userClick);
    animatePress(userClick);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
    console.log("Checking answer...");
    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

    
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else{
        console.log("wrong");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}