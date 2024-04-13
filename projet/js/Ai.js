import Fighter from "./Fighter.js";
import { addMouseListener, addKeyboardListener, inputState, mousePos } from './Listener.js';

export default class Ai extends Fighter{
   routine(){
    this.gravity();
    this.moveForward();
   }
    
}