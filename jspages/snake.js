body=[[6, 6],[6, 7]]
grid=[]

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

var temp = 1;

function draw() {

    if(temp == 1) {
        for(i = 0; i < body.length; i++) {
            fill(0);
            rect(smallWidth*body[i][0], smallHeight*body[i][1], smallWidth, smallHeight, 10);
        }
    }
    
    for(var x = 0; x <= width; x += width/12) {
        for(var y = 0; y <= height; y += height/12) {
            stroke(211, 211, 211)
            line(0, y, width, y)
            line(x, 0, x, height)
        }
    }

    nextTime++;
    key;
    document.addEventListener('keydown', function(event) {
        if(event.key.indexOf("Arrow") != -1) {
            event.preventDefault();
        }
        const key = event.key;
    })
    
    if(nextTime == speedHz) { //wait until counter hits this to update

        coord = body.shift();
        headx = coord[0];
        heady = coord[1];

        collision = checkCollision(headx, heady, key); //checks if snake ran into body or wall

        if(collision) {
            location.reload();
        }

        body.unshift([headx, heady]); //add the current head back since snake body needs to stay connected, so should only leave tail deleted

        nextTime = 0;
        moveHead(headx, heady, key);
        
        fill(0);
        rect(smallWidth*headx, smallHeight*heady, smallWidth, smallHeight, 10);
        
        if(body.length > 0) {
            tail = body.pop();
            fill(255);
            rect(smallWidth*tail[0], smallHeight*tail[1], smallWidth, smallHeight);
        }

        body.unshift([headx, heady]);

    }




}

function checkCollision(x, y, key) {
    switch(key) {
        case "ArrowUp":
            if(y == 0) return true;
        case "ArrowDown":
            if(y == 12) return true;
        case "ArrowLeft":
            if(x == 0) return true;
        case "ArrowRight":
            if(x == 12) return true;
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