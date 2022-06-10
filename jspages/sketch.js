let y = 100;
function setup() {
    canvas = createCanvas(720, 400);
    //canvas.parent('canvasBox');
    stroke(0);
    frameRate(60);
    background(255);
}

function draw() {
    if(mouseIsPressed) {
        fill(0);   //fills shapes drawn later a certain colour
    } else {
        fill(255);
    }

    ellipse(mouseX, mouseY, 30, 30);






    //Auto line
    // y = y-1;
    // if (y < 0) {
    //     y = height;
    // }
    // line (0, y, width, y); // line(x1, y1, x2, y2) || line(x1, y1, z1, x2, y2, z2)
}