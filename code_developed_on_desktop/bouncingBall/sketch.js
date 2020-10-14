let xPos, yPos;
let xDir, yDir;

function setup() {
  // put setup code here
    createCanvas(windowWidth, windowHeight);
    xPos = width/2;
    yPos = height/2;
    
    xDir = random(-3.0, 3.0);
    yDir = random(-3.0, 3.0);
    
    console.log(xDir + "," + yDir);
}

function draw() {
  // put drawing code here
    // background(200, 180, 220);
    
    noStroke();
    ellipse(xPos, yPos, 100);
    
    // update the ball position
    // xPos = xPos + 1;
    xPos += xDir;
    yPos += yDir;
    // xPos++;
    // yPos++;
    
    if(xPos >= width-50 || xPos <= 50){
        xDir = xDir*-1;
        fill(random(255), random(255), random(255)); 
    }
    if(yPos >= height-50 || yPos <= 50){
        yDir = yDir*-1;
        fill(random(255), random(255), random(255));
    }
}