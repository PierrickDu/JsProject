export default class Entity {

    xspeed;
    yspeed;
    i=0;
    n=0;

    constructor(x, y, l, h, color, sprite) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.h = h;        
        this.color = color;
        this.sprite = sprite;
    }   

    draw(ctx) {
        this.n++;
        if(this.n>=20){  
            this.i++;
            if(this.i>3){
                this.i=0
            }          
            
            
            this.n=0;
        }
        ctx.save();
        //ctx.translate(this.x, this.y);
        ctx.drawImage(this.sprite[this.i], this.x, this.y)              
        //ctx.fillStyle = this.color;
        //ctx.fillRect(0, 0, this.l, this.h);
        ctx.restore();
    }

    drawBoundingBox(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(0, 0, this.l, this.h);
        ctx.restore();
    }

    testCollide(Entity){
        this.x;
        this.y;
    }

    routine(){

    }
}