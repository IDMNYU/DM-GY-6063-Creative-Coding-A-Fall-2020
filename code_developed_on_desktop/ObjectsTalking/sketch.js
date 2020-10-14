let mover1, mover2;

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    mover1 = new Ball(100, 100, random(50, 100));
    mover2 = new Ball(250, 100, random(50, 100));    
   
}

function draw() {
    // put drawing code here
    background(0);

    mover1.update();
    mover1.render();
    mover2.update();
    mover2.render();
    
    if(dist(mover1.x, mover1.y, mover2.x, mover2.y) <= mover2.rad + mover1.rad){
        
        mover1.r = 255;
        mover2.r = 255;
    }else{
        mover1.r = 100;
        mover2.r = 100;    
    }
    
}

class Ball {
    constructor(_x, _y, _rad) {
        this.r = 100;
        this.g = 100;
        this.b = 100;

        this.rad = _rad;
        this.x = _x;
        this.y = _y;
    }

    update() {
        this.x += random(-1, 1);
        this.y += random(-1, 1);
    }

    render() {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.rad * 2);
    }
}