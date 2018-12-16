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

    add(inRotor)
    {
this.rotors.push(inRotor);
    }
//findRotor(inMouseX, inMouseY)

    remove(inRotor)
    {
        for(let i = 0; i < this.rotors.length; i++)
        {
            if(this.rotors[i] === inRotor)
            {
                this.rotors.splice(i, 1);
                i = this.rotors.length;
            }
        }
    }

    //so far into the project and only just learnt push and pop...
    //basically can draw what ever style i want inside push, but pop restores everything back
    //
    //work out based on how many rotors, the width of this whole thang
    draw()
    {
        //number of slots to draw
        //let numSlots = this.numSlots;
        let numSlots = this.rotors.length == 0 ? 1 : this.rotors.length;

        //need to deal with margin
        this.width = (this.startWidth-this.margin)*(numSlots) + this.margin;

        this.topLeftX = this.x-this.width/2;
        this.topLeftY = this.y-this.height/2;

        //draw background rect
        fill(this.backgroundColor);
        rect(this.topLeftX, this.topLeftY, this.width, this.height);

        let leftoverSpace = this.width - Rotor.START_WIDTH * numSlots;
        let gap = leftoverSpace / (1+numSlots);

        for(let i = 0; i < numSlots; i++)
        {
            //add in a gap and add in to middle of rotor, offset by multiple of gap + rotor width
            let rotorX = this.topLeftX + (gap+Rotor.START_WIDTH/2) + i*(gap+Rotor.START_WIDTH);

            //draw a shadow/silhouette of rotor representing rotor slot          
            Rotor.drawRotor(rotorX, this.y, this.slotColor, this.slotColor);

            //this teleports rotor inside rotors into position every draw call
            if(this.rotors.length > 0)
            {
                this.rotors[i].x = rotorX;
                this.rotors[i].y = this.y;
            }
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