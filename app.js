const canvas = document.getElementById("jsCanvas");

let painting = false;

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    //console.log(event);캔버스 위에 마우스가 있을 때 위치값 로그로 출력.
    const x = event.offsetX;
    const y = event.offsetY;
    //console.log(x,y);
}

function onMouseDown(event){
    //console.log(event);
    painting = true;//마우스를 클릭하면 painting은 true로 바꾼다.
}

function onMouseUp(event){
    stopPainting();
}


if(canvas){
    //동작1. 캔버스 위에서 마우스의 위치를 생각.
    canvas.addEventListener("mousemove", onMouseMove);
    //동작2. 캔버스 위에서 마우스가 클릭했을 때 페인팅을 시작!
    canvas.addEventListener("mousedown",onMouseDown);//mousedown은 클릭했을 때를 의미한다!
    //동작3. 캔버스 위에서 클릭하다가 뗐을 때 페인팅을 종료!
    canvas.addEventListener("mouseup",onMouseUp);//mouseup은 클릭했다가 뗐을 때를 의미한다!
    //동작4. 캔버스 위에서 페인팅하다가 캔버스를 벗어나도 페인팅을 종료!
    canvas.addEventListener("mouseleave",stopPainting);
}