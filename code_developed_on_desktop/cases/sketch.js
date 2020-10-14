let xPos = 10;
let yPos = 100;

function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
    xPos = xPos * random(1.0, 3.0);

    console.log('yPosition is ' + yPos);
}

function draw() {
  // put drawing code here
    background(0);
    ellipse(xPos, height/2, 200);
    xPos = xPos+1;
//    console.log(xPos);
    console.log('yPosition is ' + yPos);
}