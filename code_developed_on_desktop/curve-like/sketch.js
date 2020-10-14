function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    background(255);
    let inc = 0.0;
    let prevx, prevy = 0;
    for(let x = 0; x< width; x++){
        let y = noise(inc)*height;
        line(prevx, prevy, x, y);
        inc+=.01;
        prevx = x;
        prevy=y;
    }
}

function draw() {
    // put drawing code here
    noLoop();
}