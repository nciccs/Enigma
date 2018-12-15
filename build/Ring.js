class Ring
{
    constructor(rotor)
    {
        this.rotor = rotor;

        this.red = color(255, 0, 0);

        this.displayColor = color(0, 0, 128);

        this.x;
        this.y;

        this.width = Ring.START_WIDTH;
        this.height = Ring.START_HEIGHT;

        this.topLeftX = this.x-this.width/2;
        this.topLeftY = this.y-this.height/2;

        this.ringSetting = 0;
        
        this.length = 26;
    }

    //static class variables   
    static get START_WIDTH()
    {
        return (this._START_WIDTH) ? this._START_WIDTH : 40;
    }

    static get START_HEIGHT()
    {
        return (this._START_HEIGHT) ? this._START_HEIGHT : 140;
    }
    
    getPosition(inOffset)
    {
        let position = inOffset % this.length;

        if(position < 0)
        {
            position = this.length + position;
        }

        return position;
    }

    setPosition(inPosition)
    {
        let rotate = false;

        if(typeof inPosition == "number")
        {
            this.ringSetting = this.getPosition(inPosition-1 );
            rotate = true;
        }
        else if(typeof inPosition == "string")
        {
            this.ringSetting = this.getPosition(inPosition.toUpperCase().charCodeAt() - 'A'.charCodeAt());
            rotate = true;
        }
        
        if(rotate)
        {
            this.rotor.translate = this.rotor.translate - this.ringSetting;
        }
    }

    rotateUp()
    {
        this.ringSetting--;
    }

    rotateDown()
    {
        this.ringSetting++;
    }

    draw()
    {
        push();

        this.topLeftX = this.x-this.width/2;
        this.topLeftY = this.y-this.height/2;

        //draw boundary rectangle
        stroke(0);
        fill(255);
        rect(this.topLeftX, this.topLeftY, this.width, this.height);

        fill(0);

        //draw text
        let numLetters = 7;
        let relativeToOffset = this.rotor.translate + this.ringSetting + 3;
        let charCodeA ='A'.charCodeAt(0);

        for(let i = 0; i < numLetters; i++)
        {
            let pos = this.getPosition(relativeToOffset);
            let letter = String.fromCharCode(charCodeA + pos);

            let formattedText = letter + String("0"+(pos+1)).slice(-2);
            
            if(i == Math.floor(numLetters/2))
            {
                stroke(this.displayColor);
                fill(this.displayColor);
            }
            else
            {
                stroke(200);
                fill(200);
            }

            text(formattedText, this.x, this.topLeftY + this.height / (numLetters+1) * (i+1));
            relativeToOffset--;
        }

        stroke(0);
        fill(0);

        pop();
    }
}