var towerImg, tower;
var doorImg, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = PLAY
var gameState = END

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

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

  
}

function draw() {
  background(200);
  
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

    if(ghost.x > 600){
      gameState = END
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
