class PlugSlot
{
    constructor(c, x, y)
    {
        this.c = c;
        //rect is drawn top left corner
        this.x = x;
        this.y = y;

        this.width = 25;
        this.height = 55;
        this.cornerRadius = 15;

        this.plug = null;
        //alternative way
        //this.toSlot = this;
        
    }

    draw()
    {
        fill(200);
        ellipse(this.x, this.y, this.height, this.height);

        fill(0);
        textAlign(CENTER, CENTER);
        textSize(18);

        let charNum = this.c.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
        text(this.c + "    " + charNum, this.x, this.y);

        fill(255);

        //draw slot
        ellipse(this.x, this.y-this.height*0.25, this.width*0.8, this.width*0.8);
        fill(0)
        ellipse(this.x, this.y-this.height*0.25, this.width*0.4, this.width*0.4);
        
        fill(255)
        ellipse(this.x, this.y+this.height*0.25, this.width*0.8, this.width*0.8);
        fill(0)
        ellipse(this.x, this.y+this.height*0.25, this.width*0.3, this.width*0.3);
    }
}