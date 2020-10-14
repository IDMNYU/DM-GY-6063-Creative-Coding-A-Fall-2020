let rotme = 0.0;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(220);

    for (let x = 0; x < width; x += 50) {
        for (let y = 0; y < height; y += 50) {
            push();
            translate(x, y);
            neato();
            pop();
        }
    }
    rotme += .1;
}


function neato() {

    rectMode(CENTER);
    rect(0, 0, 25, 25);

    rotate(rotme);
    rect(0, 0, 10, 10);
}
