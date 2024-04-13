export default class Question{
    draw(ctx) {
        ctx.save();
        ctx.translate(0, 0);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, 205, 5);
        ctx.fillRect(0, 15, 205, 5);
        ctx.fillRect(0, 0, 5, 15);
        ctx.fillRect(205, 0, 5, 20);    
        ctx.fillRect(0, 30, 205, 5);
        ctx.fillRect(0, 15, 5, 15);
        ctx.fillRect(205, 15, 5, 20); 
        ctx.fillRect(mousePos.x+10, mousePos.y+10, 20, 20);
        ctx.font = "35px Arial";
        ctx.fillText("lv: "+Player.lv, 210, 30);
        ctx.strokeText("lv: "+Player.lv, 210, 30);   
        ctx.fillStyle = "red";
        ctx.fillRect(5, 5, (Player.hp/Player.hpMax)*200, 10);
        ctx.fillStyle = "yellow";
        ctx.fillRect(5, 20, (Player.xp/Player.xpMax)*200, 10);        
        ctx.restore();
    }

}