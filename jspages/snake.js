body=[[6, 6]]
grid = []; //2d array; =-1 (nothing), =0 (snake body), =1 (apple), =2 (enemy)
curTime = 1;  //in seconds

function setup() {
    canvas = createCanvas(600, 600);
    stroke(0);
    frameRate(30);
    background(255);
    fill(0);

    for(i = 0; i < 12; i++) {
        grid[i] = [];
        for(j = 0; j < 12; j++) {
            grid[i].push(-1);
        }
    }
    grid[6][6] = 0;

}

var scoreTimer = setInterval(function () {
    if(awaitRetry) {
        return;
    }
    minutes = Math.floor(curTime/60);
    seconds = Math.floor(curTime%60);

    if(minutes < 10) {
        strMin = "0" + minutes;
    } else {
        strMin = "" + minutes;
    }

    if(seconds < 10) {
        strSec = "0" + seconds;
    } else {
        strSec = "" + seconds;
    }

    document.getElementById("score").innerHTML = strMin + ":" + strSec;

    curTime++;
}, 1000)

var smallWidth = 50;
var smallHeight = 50;
var moveTimer = 0;  //holds off next move time
var appleTimer = 0;  //holds off spawning next apple
var appleCounter = 0;
var restInterval = 20;
awaitRetry = false;

var temp = 1;

function draw() {

    //detect user click for retry
    if(awaitRetry) {
        document.addEventListener('click', function(event) {
            awaitRetry = false;
            background(255);
            resetGame();
        })
        return;
    }

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

    //detects direction change
    document.addEventListener('keydown', function(event) {
        if(event.key.indexOf("Arrow") != -1) {
            event.preventDefault();
        }
        const key = event.key;
    })
    
    moveTimer++;
    if(moveTimer == restInterval) { //wait until counter hits this to update

        coord = body[0];
        headx = coord[0];
        heady = coord[1];

        //handle collision with wall
        collision = checkCollision(headx, heady, key); //checks if snake ran into body or wall
        if(collision) {
            // location.reload();
            background(255);
            awaitRetry = true;
            textSize(32);
            text("Tough Luck \n Click anywhere to try again", width/4, height/4);
            return;
        }

        //move and fill new head location
        moveHead(headx, heady, key);
        fill(0);
        rect(smallWidth*headx, smallHeight*heady, smallWidth, smallHeight, 10);
        
        //check if ate apple
        ateApple = false;
        if(grid[headx][heady] == 1) {
            ateApple = true;
            appleCounter++;
            if(restInterval > 5) {
                restInterval--;
            }
            document.getElementById("apples").innerHTML = "Apples: " + appleCounter;
        }


        //pop out tail
        if(body.length > 0 && !ateApple) {
            tail = body.pop();
            fill(255);
            rect(smallWidth*tail[0], smallHeight*tail[1], smallWidth, smallHeight);
            grid[tail[0]][tail[1]] = -1;
        }

        body.unshift([headx, heady]); //current headx heady now in new location of head
        moveTimer = 0; //reset timer
        grid[headx][heady] = 0;
    }

    //spawns apple
    appleTimer++;
    if(appleTimer == 80) {
        appleRow = Math.floor(Math.random()*12);
        appleCol = Math.floor(Math.random()*12);
        grid[appleRow][appleCol] = 1;
        // console.log("apple: " + appleRow + " " + appleCol);

        fill(255, 0, 0)
        rect(smallWidth*appleRow, smallHeight*appleCol, smallWidth, smallHeight, 40);

        appleTimer = 0;
    }




}

function resetGame() {
    body=[[6,6]];

    grid=[];
    for(i = 0; i < 12; i++) {
        grid[i] = [];
        for(j = 0; j < 12; j++) {
            grid[i].push(-1);
        }
    }
    grid[6][6] = 0;

    moveTimer = 0;  
    appleTimer = 0;  
    appleCounter = 0;
    document.getElementById("apples").innerHTML = "Apples: 0";
    restInterval = 20;

    key="";

    curTime = 0;
    document.getElementById("score").innerHTML = "00:00";

}

function checkCollision(x, y, key) {
    switch(key) {
        case "ArrowUp":
            if(y == 0 || grid[x][y-1] == 0) {
                return true;
            } 
            break;
        case "ArrowDown":
            if(y == 11 || grid[x][y+1] == 0) {
                return true;
            }
            break;
        case "ArrowLeft":
            if(x == 0 || grid[x-1][y] == 0) {
                return true;
            }
            break;
        case "ArrowRight":
            if(x == 11 || grid[x+1][y] == 0) {
                return true;
            }
            break;
    }
    return false;
}

function moveHead(x, y, key) {
    prevx = headx;
    prevy = heady;
    switch(key) {
        case "ArrowUp":
            if(heady > 0) {
                heady--;
            }
            break;
        case "ArrowDown":
            if(heady < 11) {
                heady++;
            }
            break;
        case "ArrowLeft":
            if(headx > 0) {
                headx--;
            }
            break;
        case "ArrowRight":
            if(headx < 11) {
                headx++;
            }
            break;
    }
    
    // console.log(headx + " " + heady);

}