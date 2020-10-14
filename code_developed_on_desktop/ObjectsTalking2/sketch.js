let movers = [];

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < 10; i++) {
        movers.push(new Ball((i + 5) * 10, (i + 5) * 10, 20));
    }
}

function draw() {
    // put drawing code here
    background(0);

   for (let i = 0; i < movers.length; i++) {
        movers[i].update();
        movers[i].render();
        let intersect = false;
       for(let j = 0; j<movers.length; j++){
           
           if(i !=j && movers[i].intersects(movers[j])){
               intersect = true;
           }
       }
       if(intersect){
           movers[i].r = 255;
       }else{
           movers[i].r = 100;
       }
       
   }
}

function mousePressed(){
    movers.push(new Ball(mouseX, mouseY));
}


class Ball {
    constructor(_x, _y, _rad = 30) {
        this.r = 100;
        this.g = 100;
        this.b = 100;

        this.rad = _rad;
        this.x = _x;
        this.y = _y;

        this.xdir = random(-2, 2);
        this.ydir = random(-2, 2);
    }

    update() {
        this.x += this.xdir;
        this.y += this.ydir;

        if (this.x >= width - this.rad || this.x <= this.rad) this.xdir = -this.xdir;
        if (this.y >= height - this.rad || this.y <= this.rad) this.ydir = -this.ydir;
    }

    intersects(otherball) {
        if (dist(this.x, this.y, otherball.x, otherball.y) <= this.rad + otherball.rad) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        fill(this.r, this.g, this.b);
        ellipse(this.x, this.y, this.rad * 2);
    }
}
