const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");//what is context of the canvas? I guess it means what controls the pixels inside of it.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "2c2c2c";
const CANVAS_SIZE = 700;

//should give pixel modifier, let it knows how big the pixel of window manipulation
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;


ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

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
    
    if(!painting) {//painting is false which means not painting
        /*
        PATH IS LINE!
        it means everytime moving a mouse on canvas, starting point of the path is where my mouse is.
        and the paths is being created but none of them will be used!

        console.log("creating path in ", x, y);

        some methods regarding html element canvas
        beginPath() : Create one path.Starts a new path??? by emptying the list of sub-paths. Call this method when you want to create a new path.
        moveTo(x,y) : Move the path.Moves the starting point of a new sub-path to the (x,y) coordinates
        lineTo(x,y) : Connects the last point in the current sub-path to the specified (x,y) coordinates WITH A STRAIGHT LINE.
        stroke() : make stroke like outline.
        */
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {//painting is true which means painting. when you click, dont create any more path.just use one path and make it line. everytime I move the mouse!
        //it is same one path as above(in if statement)
        console.log("creating line in ", x, y);
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
//when you click the color button, the color changes.
function handleColorClick(event) {
    //when click the color, log shows its RGB color value
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;//set strokeStyle color as what you choose
    ctx.fillSttyle = color;
} 

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
    
}

function handleModeClick(event) {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}

function handleCanvasClick() {
    if(filling) {//only when filling is true
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);// == ctx.fillRect(0,0,canvas.width,canvas.height);
    }

}

function handleCM(event) {
    //console.log(event);
    event.preventDefault();
}

function handleSaveClick() {
    //first, get canvas data as image.
    const image = canvas.toDataURL();
    //console.log(image);
    const link = document.createElement("a");
    link.href = image;//"download" is an attribute of anchor, a tag
    link.download = "PaintJS[EXPORT]👩🏻‍🎨"
    link.click();
}
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
    //event5. when click the fill button
    canvas.addEventListener("click", handleCanvasClick);
    //when you press right button of mouse it is called "contextmenu"
    canvas.addEventListener("contextmenu", handleCM);
}
//"potato" represents each item inside of array.
Array.from(colors).forEach(potato => 
    potato.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input",handleRangeChange)
}

if(mode) {
    mode.addEventListener("click",handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click",handleSaveClick);
}
