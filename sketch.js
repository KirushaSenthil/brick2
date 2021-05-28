var paddle, ball;
var tile;
var gameState=0;
var edges;
var obstacleGroup
var life=3


function setup() {
  createCanvas(800,400);
  //ground=createSprite(800, 380, 1900, 50);
  paddle= createSprite(700,385,70,20)
  paddle.shapeColor="pink"
  ball=createSprite(700,365,20,20)
  obstacleGroup=new Group()
  spawnTile()
  edges=createEdgeSprites()
  
}

function draw() {
  background("green");  
  paddle.x=World.mouseX
  fill("black")
  textSize(20)
  text("life:"+life,160,30)
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
  if(ball.y>400){
    gameState=0
    resetBall()
    life=life-1

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
  }
  ball.bounceOff(paddle)
  ball.bounceOff(edges[0])
  ball.bounceOff(edges[1])
  ball.bounceOff(edges[2])
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
      obstacleGroup.add(tile)
    }
  }
}




