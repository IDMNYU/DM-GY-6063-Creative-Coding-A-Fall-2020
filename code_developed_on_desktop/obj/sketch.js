let dancers = [];
let disco = 0.0;

let numDancers = 20;

function setup() {
    // put setup code here
    createCanvas(windowWidth, windowHeight);
    for (let i = 0; i < numDancers; i++) {
        dancers.push(new Body(i));
    }

    background(0);
}

function draw() {
    // put drawing code here
    discoBackground(disco);

    for (let i = 0; i < numDancers; i++) {
        dancers[i].update();
        dancers[i].wallCheck();
        dancers[i].render();
    }

    disco += .005;
}


function discoBackground(spins) {
    fill(0, 50);
    rect(0, 0, width, height);
    push();
    translate(200, 150);
    rotate(spins);
    noStroke();
    fill(220);
    ellipse(0, 0, 100);
    stroke(220)
    strokeWeight(10);
    for (var i = 0; i < 10; i++) {
        line(0, 0, random(-200, 200), random(-200, 200));
    }
    pop();
}

class Body {
    constructor(_h) {
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);

        this.wide = random((_h+1), (_h+1)*10);
        this.high = (_h+1)*30;
        this.wiggle = 0.0;
        this.seed = random(1.);
        this.increment = random(.01, .09);

        this.xpos = random(this.wide + 20, width - this.wide + 20);
        this.ypos = random(this.high + 20, height - this.high + 20);

    }

    update() {
        this.xpos += random(-1, 1);
        this.ypos += random(-1, 1);
    }

    wallCheck() {
        if (this.xpos >= width) this.xpos = width - 1;
        if (this.xpos <= 0) this.xpos = 1;

        if (this.ypos >= height) this.ypos = height - 1;
        if (this.ypos <= 0) this.ypos = 1
    }

    render() {
        push();
        translate(this.xpos, this.ypos);
        rotate(this.wiggle - PI / 8);
        rectMode(CENTER);
        noStroke();
        fill(this.r, this.g, this.b, this.a);
        rect(0, 0, this.wide, this.high);
        stroke(0);
        strokeWeight(.5);
        ellipse(0, -this.high / 2, this.wide + 30);
        pop();

        this.wiggle = noise(this.seed);
        this.seed += this.increment;
    }

}
