var PLAY = 1;
var END = 0;
var gameState = PLAY;
var character, background, obstacle1, obstacle2, obstacle3, obstacle4, floor
var characterImg,  floorImg

var backgroundImg

var gameoverImg, restartImg, sounduwu, soundlose

var score=0;

function preload(){
    characterImg = loadImage("chuchu.jpg")
    floorImg = loadImage("ground2.png")
    obstacle1 = loadImage("ashuash.png")
    obstacle2 = loadImage("obstacle2.jpg")
    obstacle3 = loadImage("obstacle3.png")
    obstacle4 = loadImage("obstacle4.png")

    gameoverImg = loadImage("gameover.jpg")
    restartImg = loadImage("restart.png")

    sounduwu = loadSound("sound uwu.mp3")
}

function setup() {
    createCanvas(400,300);

    floor = createSprite (200,200,800,10)
    floor.addImage("floor", floorImg)

    gameover = createSprite(200,100)
    gameover.addImage("too bad lol", gameoverImg)
    gameover.scale = 0.3

    restart = createSprite(200,150)
    restart.addImage("restart", restartImg)
    restart.scale = 0.3
 

    character = createSprite(50,100)
    character.addImage("chuchu", characterImg);
    character.setCollider('circle',0,0,350)
    character.scale = 0.03

    character.setCollider('rectangle',0,0,1400,800)
    character.debug = false

    obstacleGroup = new Group();
 
}

function draw() {
    background("white")
    textSize(15);
    fill("black")
    text("Pontuação: "+ score,30,50);

    if (gameState === PLAY){
        
        if(keyDown("space") && character.y >= 100){
            character.velocityY = -10
        }

        character.velocityY = character.velocityY + 0.8

        floor.velocityX=-(5+6*score/1000)

        if(floor.x < 0){
            floor.x = 500
        }

        character.collide(floor)

        gameover.visible = false
        restart.visible = false

        score = score + Math.round(frameCount/500)

       
    }

    if(character.isTouching(obstacleGroup)){
        gameState= "end"
    }

    if(gameState === "end"){
        character.velocityX=0
        character.velocityY=0
        floor.velocityX=0

        obstacleGroup.setVelocityXEach(0)

        gameover.visible = true
        restart.visible = true

        score = 0


    }

    if(mousePressedOver(restart)){
        reset();
    }


    obstacles();
    drawSprites();
 
}


function obstacles(){

    if (frameCount % 60 === 0) {
     var obstacle = createSprite(500,175);
     obstacle.velocityX = -(6+3*score/1000)

     var rand = Math.round(random(1,4))
     
     switch(rand){
          case 1: obstacle.addImage(obstacle1);
          obstacle.scale = 0.5
          obstacle.x = 500
          obstacle.y = 175
                 break;
          case 2: obstacle.addImage(obstacle2);
          obstacle.scale = 0.05
          obstacle.x = 500
          obstacle.y = 175
                 break;
          case 3: obstacle.addImage(obstacle3);
          obstacle.scale = 0.5
          obstacle.x = 500
          obstacle.y = 175
                 break;
         case 4: obstacle.addImage(obstacle4)  // editar img
         obstacle.scale = 0.15 
         obstacle.x = 500
         obstacle.y = 90
                 break;
          deaful:break;
        }
      
        obstacleGroup.add(obstacle)

    }

}

function reset(){
    gameState = PLAY
    gameover.visible = false
    restart.visible = false

    obstacleGroup.destroyEach()
    
    score = 0

}

