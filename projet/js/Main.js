import Ai from './Ai.js';
import Entity from './Entity.js';
import Fighter from './Fighter.js';
import Player from './Player.js';
import Question from './Question.js';

let canvas, ctx;
let gameState = 'jeuEnCours';
let GraphObjects = [];
let player;
let ai;
let randomPos = {x: 0, y: 0};
let ack;

window.onload = init;

function init(event) {    
    canvas = document.querySelector('#myCanvas');    
    ctx = canvas.getContext('2d');  
    canvas.width = window.innerWidth-1;
    canvas.height = window.innerHeight-1; 
    parseQuestion();   
    startGame();    
}

function startGame() {    
    const img0 = new Image();
    img0.src = "ryu_idle/tile000.png"
    test[0]=img0;
    const img1 = new Image();
    img1.src = "ryu_idle/tile001.png"
    test[1]=img1;
    const img2 = new Image();
    img2.src = "ryu_idle/tile002.png"
    test[2]=img2;
    const img3 = new Image();
    img3.src = "ryu_idle/tile003.png"
    test[3]=img3;
    player = new Player(test);
    //ai = new Ai();
    //GraphObjects.push(ai);
    //GraphObjects.push(new Entity(200,600,50,50,'black', img));
    GraphObjects.push(player);
    /*player = new Player();
    GraphObjects.push(player);
    for(let i = 0; i<10; i++){
        getRandomSpawn();
        GraphObjects.push(new Enemy(randomPos.x, randomPos.y, 50, 50));        
    }    
    GraphObjects.push(new ATH()); */
    requestAnimationFrame(animationLoop);
}

function animationLoop() {        
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'question':
            question(ctx);
            break;
        case 'test':
            test(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'ecranDebutNiveau':
            afficheEcranDebutNiveau(ctx);
            break;
        case 'jeuEnCours': 
            GraphObjects.forEach(o => {                
                o.draw(ctx);
            });          
            //testeEtatClavierPourJoueur();
            
            GraphObjects.forEach (o => {
                if(o instanceof Fighter){
                    o.routine();
                }   
            }) ; 
           /* testeEtatClavierPourJoueur();         
            player.move();             
            if (player.hp<=0){
                gameState = 'gameOver';
            }
            player.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            GraphObjects.forEach((o, index)=> {
                if(o instanceof Projectile){
                    if(o.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height)==true){
                        GraphObjects.splice(index, 1);
                    }
                }
            });
            detecteCollisionJoueurAvecObstaclesEtPieces();*/
            break;
    }    
    requestAnimationFrame(animationLoop);
}

function detecteCollisionJoueurAvecObstaclesEtPieces() {
    let collisionExist = false;    
    GraphObjects.forEach((o, index) => {
        if (o instanceof Enemy) {
            if (rectsOverlap(player.x, player.y, player.l, player.h, o.x, o.y, o.l, o.h)) {                                
                Player.hp-=5;
                GraphObjects.splice(index, 1);
                GraphObjects.push(new Xp ((o.x+o.l/2), (o.y+o.h/2), 10, 10))
                getRandomSpawn();
                o.x = randomPos.x;
                o.y = randomPos.y;
                GraphObjects.push(o);
                //assets.plop.play();
            } 
            GraphObjects.forEach((p, indexp) => {
                if (p instanceof Projectile){
                    if(rectsOverlap(p.x, p.y, p.l, p.h, o.x, o.y, o.l, o.h)){
                        GraphObjects.splice(index, 1);    
                        GraphObjects.splice(indexp, 1);  
                        GraphObjects.push(new Xp ((o.x+o.l/2), (o.y+o.h/2), 10, 10))
                        getRandomSpawn();
                        o.x = randomPos.x;
                        o.y = randomPos.y;
                        GraphObjects.push(o);
                    }
                }
            })
        } else if(o instanceof Xp) {
            if (rectsOverlap(player.x, player.y, player.l, player.h, o.x, o.y, o.l, o.h)) {
                GraphObjects.splice(index, 1);
                Player.xp += 5;                
                if(Player.xp>=Player.xpMax){
                    Player.xp-=Player.xpMax;
                    Player.lv++; 
                    Player.xpMax+=50                   
                }
            }
        } 
    });
}

function testeEtatClavierPourJoueur() {        
    player.vx=((inputState.left+inputState.right)*player.xspeed); 
    //player.vy=((inputState.up+inputState.down)*player.xspeed); 
      
}

function getRandomSpawn(){    
    switch(getRandomInt(4)){
        case 1 :            
            randomPos.x = -50;
            randomPos.y = getRandomInt(canvas.height);           
           break;
        case 2 :            
            randomPos.x = canvas.width;
            randomPos.y = getRandomInt(canvas.height);
           break;
        case 3 :   
            randomPos.x = getRandomInt(canvas.width); 
            randomPos.y = -50;          
           break;
        case 4 : 
            randomPos.x = getRandomInt(canvas.width);   
            randomPos.y = canvas.height;        
           break;

    }  
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function afficheMenuStart(ctx) {
    ctx.save();
    draw(ctx);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("Press space to start ", 190, 100);
    ctx.strokeText("Press space to start", 190, 100);
    if (inputState.space) {
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}

function afficheGameOver(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("GAME OVER", 0, 200);
    ctx.strokeText("GAME OVER", 0, 200);
    if (inputState.space) {
        gameState = 'menuStart';        
    }
    ctx.restore();    
}

function parseQuestion(){
    fetch("./questions.txt")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            (`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => 
                      console.log(data))
                .catch((error) => 
                       console.error("Unable to fetch data:", error)); 
}

const quizData = {
    "questions": [
      {
        "question": "Quelle est la capitale de la France ?",
        "options": ["Paris", "Londres", "Berlin", "Madrid"],
        "answer": "Paris"
      },
      {
        "question": "Quelle est la plus grande planète du système solaire ?",
        "options": ["Mars", "Vénus", "Jupiter", "Saturne"],
        "answer": "Jupiter"
      },
      {
        "question": "Qui a peint la Joconde ?",
        "options": ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michel-Ange"],
        "answer": "Leonardo da Vinci"
      }
    ]
  };

function question(){
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText(quizData.questions[0].question, 0, 200);
    ctx.strokeText(quizData.questions[0].question, 0, 200);
    ctx.fillText(quizData.questions[0].options[0], 0, 300);
    ctx.strokeText(quizData.questions[0].options[0], 0, 300);
    ctx.fillText(quizData.questions[0].options[1], 400, 300);
    ctx.strokeText(quizData.questions[0].options[1], 400, 300);
    ctx.fillText(quizData.questions[0].options[2], 1000, 300);
    ctx.strokeText(quizData.questions[0].options[2], 1000, 300);

    if (inputState.space) {
        gameState = 'menuStart';        
    }
    ctx.restore();
}

function test(){    
    ctx.save();
    fitText("truc", ctx);
    ctx.restore();
}



function loadQuiz() {
    const quizContainer = document.getElementById('quiz');
    
    quizData.questions.forEach((question, index) => {
        question.question

    }
    
    );
  }

  function drawText(fontSize, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = fontSize + 'px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    
    // Dessiner le texte au centre du canvas
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  }
  
  function fitText(text, ctx) {
    let fontSize = 30; // Taille de police initiale
    let textWidth;
    
    do {
      fontSize--;
      ctx.font = fontSize + 'px Arial';
      textWidth = ctx.measureText(text).width;
    } while (textWidth > maxWidth);
    
    drawText(fontSize, ctx);
  }
  