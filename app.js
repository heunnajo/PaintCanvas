const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    //console.log(x,y); when mouse is on the canvas, log offsetX and offsetY of the mouse
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting) {//if I am not painting
        ctx.beginPath();//Starts a new path??? by emptying the list of sub-paths. Call this method when you want to create a new path.
        ctx.moveTo(x,y);//Moves the starting point of a new sub-path to the (x,y) coordinates
    } else {//if I am painting
        ctx.lineTo(x,y);//Connects the last point in the current sub-path to the specified (x,y) coordinates with a straight line.
        ctx.stroke();
    }
}

function onMouseDown(event){
    //console.log(event);
    painting = true;//when mouse clicks, painting comes true.
}

/*function onMouseUp(event){ this logic should go into onMouseDown.
    stopPainting();
}*/

//when mouse clicks, we care the startpoint and endpoint of it.
//when we click, we are going to make a line from the starting point to where we're clicking(releasing)
if(canvas){
    //event1. when mouse moves on the canvas.
    canvas.addEventListener("mousemove", onMouseMove);
    //event2. when mouse clicks on the canvas
    canvas.addEventListener("mousedown",startPainting);
    //event3. when mouse clkicks and releases clicking, stop painting
    canvas.addEventListener("mouseup",stopPainting);
    //event4. when mouse leaves the canvas, stop painting
    canvas.addEventListener("mouseleave",stopPainting);
}