var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var end,endImg;

var PLAY = 1;
var END = 0; 
var gameState = PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png"); 
  
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
 path=createSprite(width/2,200);
 path.addImage(pathImg);
 path.velocityY = 6;


//creating boy running
 boy = createSprite(width/2,height-20,20,20);
 boy.addAnimation("SahilRunning",boyImg);
 boy.scale=0.08;
  
  
 cashG=new Group();
 diamondsG=new Group();
 jwelleryG=new Group();
 swordGroup=new Group();
  
  boy.setCollider("circle",0,0,600);
  boy.debug = false;
  
  end = createSprite(width/2,150,20,20);
  end.addImage(endImg);
  
}



function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  console.log("this is",gameState);
  
  if(gameState === PLAY){
     
     path.velocityY = 6;
    
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-250,30);
    
    
    
    if(cashG.isTouching(boy)){
       cashG.destroyEach();
       treasureCollection = treasureCollection + 10
       }
    
    if(jwelleryG.isTouching(boy)){
       jwelleryG.destroyEach();
       treasureCollection = treasureCollection + 20
       }    
    
    if(diamondsG.isTouching(boy)){
       diamondsG.destroyEach();
       treasureCollection = treasureCollection + 50
       }  
    
    
    if(swordGroup.isTouching(boy)){
       swordGroup.destroyEach();
       gameState = END;
       }
    
      //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
    }
  }
    
    end.visible = false;
    
    
    
     }
  else if(gameState === END){
          
    boy.velocityY = 0;
    path.velocityY = 0;
    cashG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    
    cashG.setLifetimeEach(-1);
    jwelleryG.setLifetimeEach(-1);
    diamondsG.setLifetimeEach(-1);
    swordGroup.setLifetimeEach(-1);
    
    end.visible = true;
    
    cashG.destroyEach();
    jwelleryG.destroyEach();
    diamondsG.destroyEach();
    swordGroup.destroyEach();
    
      textSize(20);
  fill(255);
  treasureCollection = 0;

  
    if((keyDown("SPACE")) && gameState === END ){
      gameState = PLAY;
  
  }
    
    
          }
  


  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  
  

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 6;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 6;
  diamonds.lifetime = height;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 6;
  jwellery.lifetime = height;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 6;
  sword.lifetime = height;
  swordGroup.add(sword);
  }
}