var trex, trexCorrendo, trexBateu;
var chao, chaoInvisivel, imagemdochao;
var nuvem, nuvemImage;
var novaImagem;
var obstaculos, obs1, obs2, obs3, obs4, obs5, obs6;
var JOGAR = 1;
var ENCERRAR = 0;
var estado = JOGAR;
var grupoDeNuvens,grupoDeObstaculos;
var placar = 0;
var recomecar,recomecarImage;
var fimDeJogo,fimDeJogoImage;
var checkPointSound;
var puloSound;
var morteSound;




function preload(){
  trexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexBateu = loadAnimation("trex_collided.png");
  
  imagemdochao = loadImage("ground2.png");
  
  nuvemImage = loadImage("cloud.png");
 
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  
  recomecarImage = loadImage("restart.png");
  
  fimDeJogoImage = loadImage("gameOver.png");
  
  checkPointSound = loadSound("checkPoint.mp3");
  
  puloSound = loadSound("jump.mp3");
  
  morteSound = loadSound("die.mp3");
  
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("correndo", trexCorrendo);
  trex.addAnimation("bateu",trexBateu);
  trex.scale = 0.5;
  
  chao = createSprite(200,180,400,20);
  chao.addImage("ground",imagemdochao);
  chao.x = chao.width /2;
  chao.velocityX = -4;
  
  chaoInvisivel = createSprite(200,190,400,10);
  chaoInvisivel.visible = false;
  
  grupoDeNuvens = new Group();
  
  grupoDeObstaculos = new Group();
  
  recomecar = createSprite(300,130);
  recomecar.addImage("recomecar",recomecarImage);
  recomecar.scale = 0.5;
  recomecar.visible = false;
  
  fimDeJogo = createSprite(300,100);
  fimDeJogo.addImage("Fim de jogo",fimDeJogoImage)
  fimDeJogo.scale = 0.5;
  fimDeJogo.visible = false;
}

function draw() {
  background("white");
  
  text("Pontuação :"+ placar,2,20);
  
  trex.setCollider("circle",0,0,40);
  
  if(estado == JOGAR){
    
    if(keyDown("space") && trex.y>=160) {
      trex.velocityY = -12;
      
      puloSound.play();
    }
    trex.velocityY = trex.velocityY + 0.8
    
    if (chao.x < 0){
    chao.x = chao.width/2;
    }
    
    gerarNuvens();
    
    gerarObstaculos();
    
    if(trex.isTouching(grupoDeObstaculos)){
      estado = ENCERRAR;
      
      morteSound.play();
      
      trex.velocityY = 0;
    }
    
    placar = placar + Math.round(frameRate()/60);
  }
  
  else if(estado == ENCERRAR){
    
    grupoDeNuvens.setVelocityXEach(0);
    
    grupoDeObstaculos.setVelocityXEach(0);
    
    chao.velocityX = 0;
    
    nuvem.lifetime = 250;
    
    obstaculos.lifetime = 250; 
    
    grupoDeObstaculos.setLifetimeEach(-1);
    
    grupoDeNuvens.setLifetimeEach(-1);
    
    trex.changeAnimation("bateu",trexBateu);
    
    recomecar.visible = true;
    
    fimDeJogo.visible = true;
    
    if(mousePressedOver(recomecar)){
        reset();
   }
  }
  
  trex.collide(chaoInvisivel);
  
  if(placar%500 == 0 && placar > 0){
    checkPointSound.play();
  }
  
  
  drawSprites();
}

function gerarNuvens() {

  if(frameCount%70 == 0){
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(nuvemImage);
    nuvem.velocityX = -6;
    nuvem.scale = 0.4;
    nuvem.y = Math.round(random(0,100));
    console.log(nuvem.depth);
    nuvem.lifetime = 250;
    nuvem.depth = trex.depth;
    trex.depth ++;
    grupoDeNuvens.add(nuvem);
  }

}
function gerarObstaculos(){
  
  if (frameCount%70 == 0){
    obstaculos = createSprite(600,170,10,40);
    obstaculos.velocityX = -6;
    var rand = Math.round(random(1,6));
    
    switch(rand){
        
      case 1:obstaculos.addImage(obs1); break;
      case 2:obstaculos.addImage(obs2); break;
      case 3:obstaculos.addImage(obs3); break;
      case 4:obstaculos.addImage(obs4); break;
      case 5:obstaculos.addImage(obs5); break;
      case 6:obstaculos.addImage(obs6); break;
      
      default: break;  
    }
  
    obstaculos.scale = 0.6;
    obstaculos.lifetime = 250;
    obstaculos.depth = trex.depth;
    trex.depth ++;
    grupoDeObstaculos.add(obstaculos);
  }
  
}

function reset(){
  
  recomecar.visible = false;
  fimDeJogo.visible = false;
  
  estado = JOGAR;
  
  placar = 0;
  
  grupoDeObstaculos.destroyEach();
  grupoDeNuvens.destroyEach();
  
  trex.changeAnimation("correndo",trexCorrendo);
  
  chao.velocityX = -4;
}