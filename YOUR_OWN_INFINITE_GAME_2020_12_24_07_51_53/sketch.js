var spaceImg, space;
var climberImg, climber, climbersGroup;
var jumper, jumperImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  spaceImg = loadImage("space.png");
  climberImg = loadImage("asteroid.jpg");
  jumperImg = loadImage("jumoer.jpg");
  
}

function setup(){
  createCanvas(600,600);
  //spookySound.loop();
  space = createSprite(300,300);
  space.addImage("spacce",spaceImg);
  space.velocityY = 1;
  
  
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  jumper = createSprite(200,200,50,50);
  jumper.scale = 0.1;
  jumper.addImage("jumpp", jumperImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      jumper.x = jumper.x - 3;
    }
    
    if(keyDown("right_arrow")){
      jumper.x = jumper.x + 3;
    }
    
    if(keyDown("space")){
      jumper.velocityY = -10;
    }
    
    jumper.velocityY = jumper.velocityY + 0.8
    
    if(space.y > 400){
      space.y = 300
    }
    spawnClimber();

    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(jumper)){
      jumper.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(jumper) || jumper.y > 600){
      jumper.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnClimber() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var climber = createSprite(200, -50);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    climber.x = Math.round(random(120,400));
    invisibleBlock.x = door.x;
    
    climber.addImage(climberImg);

    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    jumper.depth = climber.depth;
    jumper.depth +=1;
   
    //assign lifetime to the variable
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}

