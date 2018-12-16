var outputText = '';

var keyboardDisplay; 
var plugboard;

//var topDrawObject;

function setup()
{
    frameRate(30);
    // put setup code here
    createCanvas(800, 600);
    //createCanvas(960, 720);
    //createCanvas(windowWidth, windowHeight);

    keyboardDisplay = new KeyboardDisplay();
    plugboard = new Plugboard();
    engine = new Engine();


}

function windowResized()
{
    //resizeCanvas(windowWidth, windowHeight);
}

function draw()
{
    push();

    background(200);

    keyboardDisplay.draw();
   
    plugboard.draw();

    engine.draw();

    WidgetHandler.draw();

    /*
    let plugs = plugboard.plugs;
    for(let i = 0; i < plugs.length; i++)
    {
        plugs[i].draw();
    }

    let reflectors = engine.reflectors;
    for(let i = 0; i < reflectors.length; i++)
    {
        reflectors[i].draw();
    }
    let rotors = engine.rotors;
    for(let i = 0; i < rotors.length; i++)
    {
        rotors[i].draw();
    }*/

    if(outputText && outputText.length > 0)
    {
        //debug only
        textAlign(LEFT, BASELINE);
        fill(0);
        stroke(0);
        text("debug: " + outputText, 5 , 20);
    }

    pop();
}

function cipher(inChar)
{
    
    
    return plugboard.cipher(inChar);    
    return false;
}

function keyPressed()
{
    //outputText = key;
    keyboardDisplay.keyPressed();
    let result = cipher(keyboardDisplay.pressedKey)
    if(result)
    {
        keyboardDisplay.lightKey = result;

    }

    keyboardDisplay.pressedKey = '';

}

function keyReleased()
{
    keyboardDisplay.lightKey = '';
    keyboardDisplay.pressedKey = '';
}


function mousePressed()
{
    keyboardDisplay.mousePressed();

    let result = cipher(keyboardDisplay.pressedKey)
    if(result)
    {
        keyboardDisplay.lightKey = result;
    }

    keyboardDisplay.pressedKey = '';

    WidgetHandler.mousePressed();
}

function mouseReleased()
{
    keyboardDisplay.lightKey = '';
    keyboardDisplay.pressedKey = '';   
   
    WidgetHandler.mouseReleased();
}

function mouseDragged()
{
    WidgetHandler.mouseDragged();
}

//helps with plugboard
function mouseClicked()
{
    WidgetHandler.mouseClicked();
}
