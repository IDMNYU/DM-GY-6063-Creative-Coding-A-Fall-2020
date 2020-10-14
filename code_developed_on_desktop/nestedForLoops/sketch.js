let increment = 0.;

function setup() {
    // put setup code here
    createCanvas(1000, 500);
    colorMode(HSB);
}

function draw() {
noStroke();
    fill(0, 0, 100, .01);
 rect(0, 0, width, height);
    strokeWeight(15);
    noFill();
    for (let x = 0; x < width; x += 50) {
        for (let y = 0; y < height; y += 50) {
            stroke(360*(x/width), 100*(y/height), 100, .25);
            let size = noise((x+y*width)/1000. + increment)* 50.;
            ellipse(x+25, y+25, size*2);
            increment +=.00001;
        }
    }
   
}
