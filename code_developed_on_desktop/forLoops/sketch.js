function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
}

function draw() {

    background(0);

    for (let x = 0; x < width; x += 20) {
        stroke(abs(1.0-(x/width)) * 255);
        line(x, height / 2 + (x / 10), x, height / 2 - (x / 10));
    }
}
