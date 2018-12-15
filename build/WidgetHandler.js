class WidgetHandler
{
    static init()
    {
        WidgetHandler._widgets = [];
        WidgetHandler._holding = null;
        WidgetHandler._holdingDistX;
        WidgetHandler._holdingDistY;

        WidgetHandler._hasMoved = false;
    }

    static get holding()
    {
        return WidgetHandler._holding;
    }

    static get hasMoved()
    {
        return WidgetHandler._hasMoved;
    }

    static add(inObject)
    {
        //create static storage if doesn't exist
        if(!WidgetHandler._widgets)
        {
            WidgetHandler.init();
        }
        
        if(inObject instanceof Array)
        {
            WidgetHandler._widgets.push.apply(WidgetHandler._widgets, inObject);
        }
        else
        {
            WidgetHandler._widgets.push(inObject);
        }
    }

    static outAll()
    {
        let string = 'length: '+WidgetHandler._widgets.length+'\n';

        for(let i = WidgetHandler._widgets.length-1; i > -1; i--)
        {
            for (var field in WidgetHandler._widgets[i])
            {
                string += field + '=' + WidgetHandler._widgets[i][field] + ', ';
            }
            
            string += '\n\n';
        }
        
        return string;
    }

    static find(inMouseX, inMouseY)
    {
        let found;
        for(let i = WidgetHandler._widgets.length-1; i > -1; i--)
        {
            let obj = WidgetHandler._widgets[i];

            if(typeof obj.contains === "function")
            {
                if(obj.contains(inMouseX, inMouseY))
                {
                    found = obj;
                    i = -1;
                }
            }
            else
            {
                //check default bound
                if(obj.topLeftX <= inMouseX && inMouseX <= obj.topLeftX + obj.width &&
                obj.topLeftY <= inMouseY && inMouseY <= obj.topLeftY + obj.height
                )
                {
                    found = obj;
                    i = -1;
                }
            }
        }
        return found;
    }

    static mousePressed()
    {
        let foundObject = WidgetHandler.find(mouseX, mouseY);
        if(foundObject)
        {
            //disable scrolling
            document.ontouchmove = function(e){e.preventDefault();}

            if(typeof foundObject.mousePressed === "function")
            {
                foundObject.mousePressed();
            }

            //hold the found object
            WidgetHandler._holding = foundObject;

            //set the distance between object and mouse
            WidgetHandler._holdingDistX = WidgetHandler._holding.x - mouseX;
            WidgetHandler._holdingDistY = WidgetHandler._holding.y - mouseY;

            WidgetHandler._hasMoved = false;
        }
    }

    static mouseDragged()
    {
        if(WidgetHandler._holding)
        {
            if(typeof WidgetHandler._holding.mouseDragged === "function")
            {
                WidgetHandler._holding.mouseDragged();
            }

            WidgetHandler.limitHoldingInCanvas();

            WidgetHandler._hasMoved = true;
        }
        else
        {
        }
    }

    static limitHoldingInCanvas()
    {
        //Code to prevent objects from leaving the canvas boundary
        WidgetHandler._holding.x = mouseX + WidgetHandler._holdingDistX;
        WidgetHandler._holding.y = mouseY + WidgetHandler._holdingDistY;

        let halfWidth = WidgetHandler._holding.width/2;
        let halfHeight = WidgetHandler._holding.height/2;
        
        WidgetHandler._holding.x = constrain(WidgetHandler._holding.x, halfWidth, width - halfWidth);
        WidgetHandler._holding.y = constrain(WidgetHandler._holding.y, halfHeight, height - halfHeight);
    }

    static mouseReleased()
    {
        if(WidgetHandler._holding)
        {
            //enable scrolling
            document.ontouchmove = function(e){return true;}

            if(typeof WidgetHandler._holding.mouseReleased === "function")
            {
                WidgetHandler._holding.mouseReleased();
            }

            //drop the holding object
            WidgetHandler._holding = null;
        }
    }

    //seems to not work here
    static mouseClicked()
    {
    }
}