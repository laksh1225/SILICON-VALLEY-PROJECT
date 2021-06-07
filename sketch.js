 //Variables for gamestates
 var PLAY = 1;
 var END = 0;
 var gameState = PLAY;

//Variables for characters and groups
 var girl , girl_running , girl_;
 var pizzaImg , burgerImg , donutsImg;
 var grapesImg , cornImg , saladImg;
 var dumbbellImg , threadmillImg , jumpRopeImg;
 var backgr , backgr_Img;
 var hFoodGroup , jFoodGroup , workoutGroup;

//Variable for score
 var score
 var restart , restartImg;
 var gameOver , gameOver_Img;

 function preload(){
  //For loding the image for the backbackgr
    backgr_Img = loadImage("images/bg.jpeg");

    girl_running = loadAnimation("images/1.png" , "images/2.png" , "images/3.png" , "images/4.png" , "images/5.png" , "images/6.png" , "images/7.png" , "images/8.png")
    girl_ = loadImage("images/8.png");

   //For loading the images for the junk food 
    pizzaImg = loadImage("images/Junk food 3.PNG");
    burgerImg = loadImage("images/Junk food 1.PNG");
    donutsImg = loadImage("images/Junk food 2.PNG");
   
   //For loading the images for the healthy food
    grapesImg = loadImage("images/Healthy food 1.PNG");
    cornImg = loadImage("images/Healthy food 2.PNG");
    saladImg = loadImage("images/Healthy food 3.PNG");
 
   //For loading images for workout equipment
    dumbbellImg = loadImage("images/Workout 1.PNG");
    jumpRopeImg = loadImage("images/Workout 2.PNG");
    threadmillImg = loadImage("images/Workout 3.PNG");


    restartImg = loadImage("images/restart.png");
    gameOverImg = loadImage("images/gameOver.png");
 }

 
 function setup() {
  //For creating a canvas
   createCanvas(1000,500);
   
  //Setting score to 0
   score = 0;
  
   //Creating background
   backgr = createSprite(0,0,1000,500);
   backgr.addImage("backgr",backgr_Img);
   backgr.scale = 11;
   backgr.velocityX = -4
 
  //For creating the girl
   girl = createSprite(100,400,50,50);
   girl.addAnimation("running" , girl_running);
   girl.scale = 0.5;

   // creating  restart
   restart = createSprite(500,270);
   restart.addImage(restartImg);
   restart.scale = 0.5;

   //creating gameOver
   gameOver = createSprite(500,240);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5;

   gameOver.visible = false;
   restart.visible = false;

   //For creating groups
   hFoodGroup = createGroup();
   jFoodGroup = createGroup();
   workoutGroup = createGroup();
 }
 

 function draw() {
  background("white");

 //Play state
  if(gameState === PLAY){
 
   //To set the gameover and restart visibility to false
   gameOver.visible = false;
   restart.visible = false;

   //Creating a moving background
    backgr.velocityX = -4;
       
  if (backgr.x < 0){
    backgr.x = backgr.width/2;
  }

  //for moving up when the the up arrow key is preesed
   if(keyDown("UP_ARROW")&& girl.y >= 100) {
    girl.velocityY = -4;
   }

   //for moving down when the the down arrow key is preesed
   if(keyDown("DOWN_ARROW")&& girl.y >= 100) {
     girl.velocityY = 4;
   }
   
   //spawn the healthy food
    spawnHfood();
    
   //For spawning junk food
    spawnJfood();
        
   //For spawning workout equipment
    spawnWorkout();
  
  
   //Increasing the score when girl is touching to healthy food
    if (hFoodGroup.isTouching(girl)){ 
      girl.scale = girl.scale - 0.01;
      score = score + 1;
      hFoodGroup.destroyEach();
    }

    //Decreasing the score when girl is touching to junk food
    if (jFoodGroup.isTouching(girl)){
     girl.scale = girl.scale + 0.01;
     score = score - 1;
     jFoodGroup.destroyEach();
   }
 
   //Increasing the score when the girl is touching the workout equipment
   if (workoutGroup.isTouching(girl)){
     girl.scale = girl.scale - 0.05;
     score = score + 1;
     workoutGroup.destroyEach();
   }

   //If score is less than 1 then set the gamestate to end
   if(score < 0){
    gameState = END; 
   }

   /*if(girl.scale < 0.1){
     gameState = END;
   }*/
  } 

  //End state
   if(gameState === END){
   
   //To set the gameover and restart visibility to false
    restart.visible = true;
    gameOver.visible = true;

    //Changing the image
    girl.addImage(girl_);

    //To make them stop moving
    backgr.velocityX = 0;
    girl.velocityY = 0;


    hFoodGroup.setVelocityXEach(0);
    jFoodGroup.setVelocityXEach(0);
    workoutGroup.setVelocityXEach(0);

    //To rrestart the gaem when the restart is pressed
    if(mousePressedOver(restart)) {
      reset();
    }
   }

   drawSprites();

   fill("purple");
   stroke("purple");
   textSize(20);
   text("Exercise 🏋️‍♀️ and eat healthy food  ",10,100);

   fill("purple");
   stroke("purple");
   textSize(20);
   text("Use arrow keys to move 👆👇",30,50);

  //Creating the text for the score
   stroke("blue");
   textSize(20);
   fill("blue");
   text("Score: "+ score, 800,50);

   stroke("firebrick");
   textSize(21);
   fill("firebrick");
   text("' Fat to Fab '" , 400 , 50);

   stroke("firebrick");
   textSize(21);
   fill("firebrick");
   text("By Lakshyagna" , 400 , 100);

}


function spawnHfood(){
  if(frameCount % 80  === 0){
   var hFood = createSprite(900,450,50,50);
   hFood.y = Math.round(random(250,450));
    hFood.velocityX = -6;

  //For changing the images randomly
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1 : hFood.addImage(grapesImg);
               break;
      case 2 : hFood.addImage(cornImg);
               break;
      case 3 : hFood.addImage(saladImg);
               break;
      default : break;
    }
    hFood.scale = 0.5;
    hFood.lifetime = 200;

    hFoodGroup.add(hFood);

  }
}


function spawnJfood(){
  if(frameCount % 40  === 0){
   var jFood = createSprite(900,450,50,50);
   jFood.y = Math.round(random(250,450));
    jFood.velocityX = -6;

  //For changing the images randomly
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1 : jFood.addImage(pizzaImg);
               break;
      case 2 : jFood.addImage(burgerImg);
               break;
      case 3 : jFood.addImage(donutsImg);
               break;
      default : break;
    }
    jFood.scale = 0.3;
    jFood.lifetime = 200;

    jFoodGroup.add(jFood);
  }
}


function spawnWorkout(){
  if(frameCount % 120  === 0){
   var workout = createSprite(900,450,50,50);
   workout.velocityX = -6;
  
  //For changing the images randomly
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1 : workout.addImage(dumbbellImg);
               break;
      case 2 : workout.addImage(jumpRopeImg);
               break;
      case 3 : workout.addImage(threadmillImg);
               break;
      default : break;
    }
    workout.scale = 0.5;
    workout.lifetime = 200;

    workoutGroup.add(workout);
  }
}


function reset(){
  gameState = PLAY;
  girl.x = 100;
  girl.y = 400
  restart.visible = false;
  gameOver.visible = false;
  hFoodGroup.destroyEach();
  jFoodGroup.destroyEach();
  workoutGroup.destroyEach();
  score = 0;

}