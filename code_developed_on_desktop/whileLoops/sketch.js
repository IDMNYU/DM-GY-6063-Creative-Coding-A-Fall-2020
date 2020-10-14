let whee = 0;

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    background(0);
    while (whee < 50) {
        fill(255, whee*5);
        ellipse(random(width), random(height), whee*3);
        whee++;
    }

}

function draw() {
    // put drawing code here
    noLoop();
}
