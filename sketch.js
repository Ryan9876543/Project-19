var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score

var towerImg, tower;
var doorImg, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameOverImg, restartImg


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")

  doorsGroup = new Group()
  climbersGroup = new Group()
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.35

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,300);
  restart.addImage(restartImg);

  gameOver.scale = 0.5;
  restart.scale = 0.5;

  score = 0

}

function reset(){
  score = 0
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  ghost = createSprite(200,200)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.35

}


function draw() {
  background(200);
  text ("Score: "+ score, 500,50);
  
   score.depth = ghost.depth;
   score.depth = score.depth + 11;


  if(gameState === PLAY){ 
    gameOver.visible = false
    restart.visible = false

  
    score = score + Math.round(getFrameRate()/50); 

    if(tower.y > 400){
      tower.y = 300
    }

    if(keyIsDown(LEFT_ARROW)){
      ghost.x = ghost.x - 3
    }


    if(keyIsDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 3
    }

    if(keyIsDown(UP_ARROW)){
      ghost.velocityY = -5
    }

  spawnClimbers()
  spawnDoors()

  if(climbersGroup.isTouching(ghost) || ghost.x > 600){
    gameState = END;  
  }

  }

  else if (gameState === END) {
     gameOver.visible = true;
     restart.visible = true;
    
    
     //set lifetime of the game objects so that they are never destroyed
    climbersGroup.setLifetimeEach(-1);
    doorsGroup.setLifetimeEach(-1);
    

    if (mousePressedOver(restart)) {
     reset()
    }

  }
 

    ghost.velocityY = ghost.velocityY + 0.8
    
    spawnDoors()
    spawnClimbers()

    drawSprites()
}

function spawnClimbers () {
  if (frameCount % 210 == 0) {
    var climbers = createSprite(200,10)
    climbers.addImage(climberImg)
    climbers.x = Math.round (random(100,480))
    climbers.velocityY = 1
    climbers.lifetime = 800
    climbersGroup.add(climbers)
  }
}



function spawnDoors () {
  if (frameCount % 280 == 0) {
    var door = createSprite(200,-50)
    door.addImage(doorImg)
    door.x = Math.round (random(100,480))
    door.velocityY = 1
    door.lifetime = 800
    doorsGroup.add(door)
  }
}
