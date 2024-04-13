import Fighter from "./Fighter.js";
import { addMouseListener, addKeyboardListener, inputState, mousePos } from './Listener.js';

export default class Player extends Fighter{

    move() {    
        this.x += (inputState.left+inputState.right)*2;
        this.y += this.vy;               
    }

    /*test(){
        window.onkeydown = (event) => {
            console.log('event.key');
        console.log(event.key);
        }
    }*/

    constructor(sprite) {
        super(sprite);
        window.onkeydown = (event) => {
            console.log(event.key);
            switch (event.key) {
                case 'q':
                    this.backward=true;               
                    break;
                case 'd':
                    this.forward=true;
                    break;
                case 'z':
                    inputState.up = -1;
                    break;
                case 's':
                    inputState.down = 1;
                    break;
                case ' ':
                    this.space = true;
                    break;
            }
        }

        window.onkeyup = (event) => {
            console.log(event.key);
            switch (event.key) {
                case 'q':
                    this.backward=false;
                    break;
                case 'd':
                    this.forward=false;
                    break;
                case 'z':
                    inputState.up = 0;
                    break;
                case 's':
                    inputState.down = 0;
                    break;
                case ' ':
                    this.space = false;
                    break;
            }
        }
    }

    routine(){
        if(this.forward==true){
            this.moveForward();
        }
        if(this.backward==true){
            this.moveBackward();
        }
        if(this.space){
            this.jump()
        }
        this.gravity();
    }
    
}