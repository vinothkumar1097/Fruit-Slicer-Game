var playing = false;
var score;
var trailsLeft;
var step;
var action;
var loading;
var fruits = ["apple","banana","grapes","mango","orange","peach","pear","cherries","watermelon"];

$(document).ready(function(){
    
    //loading page design
    $("#fruitsContainer").hide();
    $("#information").hide();
    $("#startreset").hide();
    $("#score").hide();
    $("#lifeRemaining").hide();
    
    $("#run").show();
    $("#run").button();
    
   $("#run").click(function(){
   $("#run").hide();
   $("#progress").show();
   $("#label").show();
   $("#label").html('<span id="load">Initializing</span>');
   setTimeout(function(){
      var x = 0;
    var progress = setInterval(function(){
        x++;
        $("#label").text(x + " % ");
        $("#progress").progressbar({
    value: x});
        if (x>99) {
            clearInterval(progress);
            $("#label").text("Completed");
            setTimeout(function(){
                $("#progress").hide();
                $("#label").hide();
                $("#fruitsContainer").show();
                $("#information").show();
                $("#startreset").show();
                $("#score").show();
                $("#lifeRemaining").show();
                $("#score").hide();
                $("#lifeRemaining").hide();
            },1000)
                    
        }
    },100) 
   },2000)
});
    
    
    //clicking on start/reset button
    $("#startreset").click(function(){
        
        //Are we playing?
        if(playing == true) {
            
            //yes
            location.reload();
            
        } else { //no
            
            //playing mode to true
            playing = true;
                
            //change button text to Reset Game
            $("#startreset").html("Reset Game");
            
            //hide the game over box,score
            $("#gameover").hide();
            $("#score").show();
                        
            //setting up score
            score = 0;
            $("#scorevalue").html(score);
            
            //show trailsleft box and add hearts
            $("#lifeRemaining").show();
            trailsLeft = 3;
            addHearts();
            
            //Generate random fruit
            startAction();
        }
        
    });
    
    //Once we crush the fruit
    $("#fruit1").mouseover(function(){
       
        //increase the score
        score++;
        $("#scorevalue").html(score);
        
        //play sound
        $("#sliceSound")[0].play();
        
        //stop the fruit
        clearInterval(action);
        
        //Hide the fruit when crushed
        $("#fruit1").hide("explode",300);
        
        //Generate new fruit
        setTimeout(function(){
            startAction();
        },500);
    });
    
    
    //functions
    
    // 1. populating lifes
    function addHearts(){
    $("#lifeRemaining").empty();
    for(i=0;i<trailsLeft;i++){
    $("#lifeRemaining").append('<img src="images/heart.png" class="life">')
    }
    }
    
    // 2. Generating random fruit
    function startAction(){
    
    //show the fruit
    $("#fruit1").show();

    //generating random fruit
    $("#fruit1").attr('src','images/' + fruits[Math.round(8*Math.random())]+ '.png');

    //adjusting fruits top and left positions
    $("#fruit1").css('top',-50);
    $("#fruit1").css('left',Math.round(500*Math.random()));
        
    //creating a random speed b/w 1 to 6
    step = 1 + Math.round(4*Math.random());
    
    //move fruit down every 10 milliseconds
    action = setInterval(function(){
    
    //moving fruits position based on step value
    $("#fruit1").css('top',$("#fruit1").position().top + step);
        
        //check if the fruit has disappeared from container
        if ($("#fruit1").position().top > $("#fruitsContainer").height()) {
            
            //if yes
            
                //check for trailsLeft
                if (trailsLeft > 1){
                    
                    //if we have trails
                    
                    //show the fruit
                    $("#fruit1").show();

                    //generating random fruit
                    $("#fruit1").attr('src','images/' + fruits[Math.round(8*Math.random())]+ '.png');

                    //adjusting fruits top and left positions
                    $("#fruit1").css('top',-50);
                    $("#fruit1").css('left',Math.round(500*Math.random()));

                    //creating a random speed b/w 1 to 6
                    step = 1 + Math.round(4*Math.random());
                    
                    //decrease life and populate hearts
                    trailsLeft--;
                    addHearts();

                } else 
                {
                    
                    //if we have no trails - Game Over
                    
                    //changing playing mode
                    playing = false;
                    
                    //show game over box
                    $("#gameover").show();
                    $("#gameover").html("<p>game over!</p><p>Your score is " + score + "</p>");
                    
                    //hide lifes box
                    $("#lifeRemaining").hide();
                    
                    //changing button text
                    $("#startreset").html("Start Game");
                    
                    //stop the interval
                    stopAction();
                    
                }
            
        } 
        
    },10);
    
    }
    
    // 3. Stop the interval and hide the fruit once crushed
    function stopAction(){      
    clearInterval(action);
    $("#fruit1").hide();
    }
});
//Game Logic
//click on start reset button
    //Are we playing?
        //yes
            //reload page
        //no
            //show trails left
            //change button text to "Reset Game"
            //1.create a random fruit
            //define a random step(speed)
            //2.move fruit down one step every 30 second
                //is fruit too low?
                    //no-->repeat step2
                    //yes-->any trials left?
                        //yes: repeat step 1 and decrease one life
                        //no: show game over, button text: Start Game

//slice a fruit
    //play sound
        //explode fruit