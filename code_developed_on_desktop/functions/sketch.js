let xPos, yPos; // ball 1 position 
let xPos2, yPos2; // ball 2 position
let xSpeed, ySpeed; // ball 1 speed
let xSpeed2, ySpeed2; // ball2 speed

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    
    // oinital valuse for balls
    xPos = width / 2;
    yPos = height / 2;
    xPos2 = width / 2;
    yPos2 = height / 2;
    
    // initial speeds for balls
    xSpeed = random(-2, 2);
    ySpeed = random(-2, 2);
    xSpeed2 = random(-10, 10);
    ySpeed2 = random(-10, 10);

}

function draw() {
    // put drawing code here
    background(0);
    
    // update position
    xPos += xSpeed;
    yPos += ySpeed;
    xPos2 += xSpeed2;
    yPos2 += ySpeed2;

    // draw balls
    ball(xPos, yPos);
    ball(xPos2, yPos2);

    // check for collisions
    xSpeed = updateX(xPos, xSpeed, 50);
    ySpeed = updateY(yPos, ySpeed, 50);
    xSpeed2 = updateX(xPos2, xSpeed2, 50);
    ySpeed2 = updateY(yPos2, ySpeed2, 50);

}

function ball(x, y) {
    ellipse(x, y, 100);
    ellipse(x, y, 75);
    ellipse(x, y, 50);
    ellipse(x, y, 25);
}

function updateX(_pos, _speed, _rad) {
    if (_pos >= width -_rad || _pos <= _rad) {
        _speed = -_speed;
    }
    return _speed;
}

function updateY(_pos, _speed, _rad) {
    if (_pos >= height-_rad || _pos <= _rad) {
        _speed = -_speed;
    }
    return _speed;
}
