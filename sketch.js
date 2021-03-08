var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;

function preload(){
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(540,350);
 
PLAY = 1;
gameState = PLAY;
END = 0;

FoodGroup = new Group();
obstacleGroup = new Group();
  
monkey = createSprite(70,300,50,50);
monkey.addAnimation("monkey",monkey_running);
monkey.scale = 0.1
  
ground = createSprite(300,340,600,20);

score = 0;
survivalTime = 0;
}

function draw() {
    background("green");
 
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
        //jumpSound.play();
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    createObstacles();
    createBananas();
    
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();
     score = score+1;
  }
  
  
monkey.collide(ground);

drawSprites();
  
fill("purple")
textSize(15)
text("Score:"+ score,450,50)
  
fill("black")
textSize(20)
survivalTime=Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,100,50)
}

function createBananas() {
  if (frameCount % 120 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    FoodGroup.add(banana);
  }

}

function createObstacles(){
  if (frameCount % 150 === 0){
  obstacle = createSprite(600,320,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -6;
    
    var rand = Math.round(random(1));
    switch(rand) {
      case 1: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 500;
    
    obstacleGroup.add(obstacle);
  }
}