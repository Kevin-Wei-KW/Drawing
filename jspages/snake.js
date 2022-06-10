body=[]
headx = 6;
heady = 6;
prevx = -1;
prevy = -1;

function setup() {
    canvas = createCanvas(600, 600);
    stroke(0);
    frameRate(30);
    background(255);
    fill(0);

}

var smallWidth = 50;
var smallHeight = 50;
var nextTime = 0;  //holds off next move time
var speedHz = 30;

function draw() {
    
    for(var x = 0; x <= width; x += width/12) {
        for(var y = 0; y <= height; y += height/12) {
            stroke(211, 211, 211)
            line(0, y, width, y)
            line(x, 0, x, height)
        }
    }

    nextTime++;
    document.addEventListener('keydown', function(event) {
        if(event.key.indexOf("Arrow") != -1) {
            event.preventDefault();
        }
        const key = event.key;
    })
    
    if(nextTime == speedHz) { //wait until counter hits this to update
        nextTime = 0;
        moveHead(headx, heady, key);
        
        fill(0);
        rect(smallWidth*headx, smallHeight*heady, smallWidth, smallHeight, 10);
        
        if(prevx != -1 && prevy != -1) {
            fill(255);
            rect(smallWidth*prevx, smallHeight*prevy, smallWidth, smallHeight);
        }

    }




}

function moveHead(x, y, key) {
    prevx = headx;
    prevy = heady;
    switch(key) {
        case "ArrowUp":
            if(heady > 0) heady--;
            break;
        case "ArrowDown":
            if(heady < 11) heady++;
            break;
        case "ArrowLeft":
            if(headx > 0) headx--;
            break;
        case "ArrowRight":
            if(headx < 11) headx++;
            break;
    }
    
    console.log(headx + " " + heady);

}