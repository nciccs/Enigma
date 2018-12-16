//main role of engine is to handle the mechanics of the rotors
class Engine
{
    constructor(x=width/2, y=100)
    {
        this.red = color(255, 0, 0);

        //0 is right most rotor
        //start as empty stack
        this.rotorStack = new RotorStack();

        //location of slot should be relative to left most rotor
        this.reflectorSlot = new ReflectorSlot(this.rotorStack);

        //create reflectors
        this.reflectors = [new Reflector(this.reflectorSlot), new Reflector(this.reflectorSlot)];
        this.reflectors[0].setToC();
        this.reflectors[1].setToB();

        //create rotors
        this.rotors = [new Rotor(this.rotorStack), new Rotor(this.rotorStack), new Rotor(this.rotorStack), new Rotor(this.rotorStack), new Rotor(this.rotorStack)];
        this.rotors[0].setToV();
        this.rotors[1].setToIV();
        this.rotors[2].setToIII();
        this.rotors[3].setToII();
        this.rotors[4].setToI();

this.reflectorSlot.reflector = this.reflectors[1];


//this.rotorStack.rotors.push(this.rotors[0]);
//this.rotorStack.rotors.push( this.rotors[0], this.rotors[1]);
this.rotorStack.rotors.push( this.rotors[2], this.rotors[3], this.rotors[4]);
//this.rotorStack.rotors.push( this.rotors[0], this.rotors[1], this.rotors[2], this.rotors[3]);
//this.rotorStack.rotors.push( this.rotors[0], this.rotors[1], this.rotors[2], this.rotors[3], this.rotors[4] );

        //stacking them like cards, looks cool but can accidentally click/touch the ones behind it
        // let startOffsetX = 2;
        // let startOffsetY = 10;

        // for(let i = this.rotors.length-1; i > -1; i--)
        // {
        //     this.rotors[i].x = this.rotors[i].x - i * startOffsetX;
        // }

        // startOffsetX = 10;
        // startOffsetY = 10;

        // this.reflectors[0].x = this.reflectors[1].x - startOffsetX;
        // this.reflectors[0].y = this.reflectors[1].y + startOffsetY;
    }

    cipher(inIndex)
    {
    }

    draw()
    {
        this.rotorStack.draw();
        this.reflectorSlot.draw();
    }
}