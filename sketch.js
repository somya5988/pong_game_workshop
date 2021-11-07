var gameState="serve";
var computerscore=0;
var playerscore=0;
function setup(){
  createCanvas(400,400);
  var playerPaddle = createSprite(370,150,10,100);
  playerPaddle.setAnimation("player_1")
  var computerPaddle = createSprite(30,150,10,100);
  computerPaddle.setAnimation("robot")
  var ball = createSprite(200,200,20,20);
  ball.setAnimation("soccer_ball")
  ball.scale=0.05;
  ball.shapeColor="red";
 
}
function draw() {
  background("white");
  if(ball.isTouching(computerPaddle)||ball.isTouching(playerPaddle)){
    playSound("sound://category_hits/vibrant_crate_break_4.mp3")
  }
  
  if(gameState==="serve"){
    text("Press Space to serve",150,180);
  }
  text(computerscore,180,20);
  text(playerscore,220,20);
  //computerPaddle.y=ball.y;
  if(keyDown("w")){
    computerPaddle.y = computerPaddle.y-5;
  }
  if(keyDown("s")){
    computerPaddle.y = computerPaddle.y+5;
  }
  drawnet();
  
  if(keyDown("SPACE")&& gameState=="serve"){
    serveball();
    playerPaddle.setAnimation("player_1");
    gameState="play"
  }
  if(ball.x>400 || ball.x<0){
    if(ball.x>400){
      computerscore = computerscore+1;
      playerPaddle.setAnimation("player_fall")
    }
    if(ball.x<0){
      playerscore=playerscore+1;
    }
    resetball();
    gameState="serve"
  }
  if(playerscore==5||computerscore==5){
    gameState="over";
    text("GAME OVER",170,160);
    text("Press 'R' to restart",150,180);
  }
  if(keyDown("r")&& gameState=="over"){
    gameState="serve";
    computerscore=0;
    playerscore=0;
  }
  //playerPaddle.y=World.mouseY
  if(keyDown("UP_ARROW")){
    playerPaddle.y = playerPaddle.y-5;
  }
  if(keyDown("DOWN_ARROW")){
    playerPaddle.y = playerPaddle.y+5;
  }
  createEdgeSprites();
  if(ball.isTouching(topEdge)||ball.isTouching(bottomEdge)){
    playSound("sound://category_hits/retro_game_hit_block_4.mp3")
  }
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  drawSprites();
}
function drawnet(){
  for(var i=0; i<400; i=i+20){
   line(200,i,200,i+10); 
  }
}
function serveball(){
  ball.velocityX=7;
  ball.velocityY=5;
}
function resetball(){
  ball.x=200;
  ball.y=200;
  ball.velocityX=0;
  ball.velocityY=0;
}
