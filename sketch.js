var gameState = "play";

var tower, ghost, door, climber, invisibleBlock;

var towerImage, ghostImage, doorImage, climberImage

var doorGroup, climberGroup, invisibleGroup;

function preload(){
  towerImage  = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
}

function setup(){
  createCanvas(600, 600);
  
  tower = createSprite(300, 300);
  tower.addImage( "tower" , towerImage);
  tower.velocityY = 1;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
  
  ghost = createSprite(300, 300);
  ghost.addImage(ghostImage);
  ghost.scale = 0.5
  
  
}

function draw(){
  
  if(gameState === "play"){
  
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 3;
  }
  
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
  }
  
 if(keyDown("space")){
   ghost.velocityY = -5 ;
 }
  
ghost.velocityY = ghost.velocityY + 0.8;
  
  if(tower.y > 400){
    tower.y = 300;
 }
  
   spawnDoor();
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(ghost.y >= 600 || invisibleGroup.isTouching(ghost)){
    ghost.destroy();
   gameState = "end";
  }
    
    
  drawSprites();
  } 
   
  if(gameState === "end"){
    textSize(30);
    fill("yellow");
    text("GAME OVER" , 300, 300);
  }
}

function spawnDoor(){
  if(frameCount % 240 === 0){
    door = createSprite(200, 50);
    climber = createSprite(200, 100);
    invisibleBlock = createSprite(200, 115);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    door.addImage(doorImage);
    climber.addImage(climberImage);
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;
    invisibleBlock.debug = true;     
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth +1;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
  }
}
