function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
}

function draw() {
  // put drawing code here
//    background(255);
//    ellipse(mouseX, mouseY, 100);
    strokeWeight(abs(mouseX-pmouseX));
    stroke(constrain(abs(mouseY-pmouseY), 0, 255));
    line(mouseX, mouseY, pmouseX, pmouseY);
}