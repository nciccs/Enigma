class RotorStack
{
    constructor(x = width/2, y = 100)
    {
        this.x = x;
        this.y = y;
        
        this.rotorWidth = Rotor.START_WIDTH;
        this.rotorHeight = Rotor.START_HEIGHT;

        this.margin = 5;
        
        //start out with 1 rotor width
        this.startWidth = Rotor.START_WIDTH + this.margin*2;
        this.width = this.startWidth;
        this.height = Rotor.START_HEIGHT + this.margin*2;

        this.topLeftX = this.x-this.width/2;
        this.topLeftY = this.y-this.height/2;

        this.backgroundColor = 160;
        
        this.slotColor = 50;

        //holds multiple rotors
        this.rotors = [];
    }

    //so far into the project and only just learnt push and pop...
    //basically can draw what ever style i want inside push, but pop restores everything back
    //
    //work out based on how many rotors, the width of this whole thang
    draw()
    {
        //number of slots to draw
        let numSlots = this.rotors.length;

        if(this.rotors.length == 0)
        {
            numSlots = 1;
        }

        this.width = this.startWidth*(numSlots);

        this.topLeftX = this.x-this.width/2;
        this.topLeftY = this.y-this.height/2;

        fill(this.backgroundColor);

        //draw background rect
        rect(this.topLeftX, this.topLeftY, this.width, this.height);

        let leftoverSpace = this.width - Rotor.START_WIDTH * numSlots;
        let gap = leftoverSpace / (1+numSlots);

        for(let i = 0; i < numSlots; i++)
        {
            //draw a silhouette of rotor representing rotor slot          
            Rotor.drawRotor(this.topLeftX+(gap+Rotor.START_WIDTH/2)+i*(gap+Rotor.START_WIDTH), this.y, this.slotColor, this.slotColor);
        }

        /*
        fill(255);
        stroke(255);
        textSize(18);
        //text("Place\nRotors\nHere", this.x, this.y);
        
        fill(0);
        stroke(0);
        //text("Walzen", this.x+this.width/2+35, this.y);
        */
    }
}