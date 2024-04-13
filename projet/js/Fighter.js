import Entity from "./Entity.js";

export default class Fighter extends Entity {

    jumpState = 10;
    jumpLeft = 0;
    hp;
    hpMax = 200;
    vx=2;
    vy=2;
    

    constructor(sprite){
        super(50, 100, 100, 200,'red', sprite)
        this.vx = 0;
        this.vy = 0;
        this.speed = 5;
    }

    moveForward() {    
        this.x += 3;             
    }

    moveBackward(){        
        this.x -= 3;  
    }

    jump(){        
        if(this.jumpLeft!=0){
            this.jumpState=50;            
            this.jumpLeft=0;
        }        
    }  

    punch(){

    }

    kick(){

    }

    gravity(){
        if (this.y<500){
            console.log("this");
            this.y+=6;
        }
        else{
            this.jumpLeft=1;
        }
        if(this.jumpState>0){
            console.log("this");
            this.y-=12;
            this.jumpState--;
        }
    }

}