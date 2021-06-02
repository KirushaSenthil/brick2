var paddle, ball;
var tile;
var gameState=0;
var edges;
var obstacleGroup
var life=3
var ball2;
var flag=0
var haert,heartGroup,heartImage;
var x=160;

function preload(){
heartImage=loadImage("heart.png")
}
function setup() {
  createCanvas(800,400);
  //ground=createSprite(800, 380, 1900, 50);
  paddle= createSprite(700,385,70,20)
  paddle.shapeColor="pink"
  ball=createSprite(700,365,20,20)
  ball2=createSprite(700,365,20,20)
  ball2.visible=false
  obstacleGroup=new Group()
  heartGroup=new Group()
  spawnTile()
  spawnHearts()
  edges=createEdgeSprites()
 
}

function draw() {
  background("green");  
  paddle.x=World.mouseX
  fill("black")
  textSize(20)
  //text("life:"+life,160,30)
  if(gameState===0){
    textSize(30)
    fill ("black")
    text ("Press enter to start game",250,290)
  }
  if(keyDown("space")&&gameState===0){
    serveBall()
    gameState=1
  }
  for(var i=0; i<obstacleGroup.length;i++){
    if(ball.isTouching(obstacleGroup.get(i))){
      ball.bounceOff(obstacleGroup.get(i))
       obstacleGroup.get(i).destroy();
       }
  }
  
    if(obstacleGroup.length===0){
      text("GAME OVER. YOU WON",300,400)
      text("press r to restart",300,300)
      gameState=2;
      resetBall()
      spawnTile()
     // spawnHearts()
    }
    if(obstacleGroup.length===22){
      flag=1
     
    }
    if(flag===1){
     // ball2=createSprite(ball.x,ball.y,20,20)
     ball2.x=ball.x
     ball2.y=ball.y
     ball2.visible=true
      ball2.lifetime=300
      ball2.velocityX=-3
      ball2.velocityY=-4
      
     
  flag=0
    }
    for(var i=0; i<obstacleGroup.length;i++){
      if(ball2.isTouching(obstacleGroup.get(i))){
        ball2.bounceOff(obstacleGroup.get(i))
         obstacleGroup.get(i).destroy();
         }
    }

  if(ball.y>400){
    gameState=0
    resetBall()
    life=life-1
    heartGroup.get(life).destroy()

  }
  if(life===0){
    gameState=2
    resetBall()
    //life=3
    obstacleGroup.destroyEach()
    textSize(20)
    text("game over. press r to restart",300,300)
  }
  if(keyDown("r")&&gameState===2){
    gameState=0
    life=3
    spawnTile()
    spawnHearts()
  }

  ball.bounceOff(paddle)
  ball.bounceOff(edges[0])
  ball.bounceOff(edges[1])
  ball.bounceOff(edges[2])
  ball2.bounceOff(paddle)
  ball2.bounceOff(edges[0])
  ball2.bounceOff(edges[1])
  ball2.bounceOff(edges[2])
  
  drawSprites();
}
function serveBall(){
  ball.velocityX=3
  ball.velocityY=4
}
function resetBall(){
  ball.x=700
  ball.y=365
  ball.velocityX=0
  ball.velocityY=0

}
function spawnTile(){
  for(var i=50; i<800;i=i+100){
    for(var j=50;j<300;j=j+50){
      tile=createSprite(i,j,60,20)
      tile.shapeColor=rgb(random(0,255),random(0,0),random(0,255))
      obstacleGroup.add(tile)
    }
  }
}

function spawnHearts(){
  for(var i=0;i<3;i=i+1){
    heart=createSprite(x,20,20,20)
    heart.addImage(heartImage)
    heart.scale=0.2
    x=x+30
    heartGroup.add(heart)
  }
}




