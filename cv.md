# Notes on Video and images

So far, when we work with the screen and pixels, we’ve been drawing shapes and objects to the screen, but nothing that could be called “representational”. We can uses still images and videos (and webcams!) to get images on screen that reflect the “real” world. We can then parse these for more information and create something more interesting than reality.

## Images

We can easily load and display images. While it’s possible to load an image from a URL, it’s easier to load it locally. Put it in a folder in your projects path.

    let img;// Declare variable img
    function setup(){
        createCanvas(600,370);
        img=loadImage("assets/tenor.gif");// Load the image
    }
    function draw(){
        // Displays the image at its actual size at point 0,0
        image(img,0,0);
    }
    
You can manipulate the image however you like. Similar to a bouncing, spinning rectangle.

    let img;  // Declare variable img
    let xPos, yPos;
    let xDir, yDir;
    function setup() {
      createCanvas(600, 370);
      let = loadImage("assets/tenor.gif");  // Load the image
      yPos = random(height - 10);
      xPos = random(width - 10);
      xDir = random(-5, 5);
      yDir = random(-5, 5);
    }
    
    function draw() {
      background(255);
      // Displays the image and bounce it around at 1/4 size
      image(img, xPos, yPos, img.width/4, img.height/4);
    
     xPos += xDir;
     yPos += yDir;
    
      if (xPos > width  || xPos < 0) {
        xDir *= -1;
      }
      if (yPos > height || yPos < 0) {
        yDir *= -1;
      }
    }

[Dan Shiffman’s pointillism example](https://p5js.org/examples/image-pointillism.html) is pretty cool, and demonstrates how to access the values of the pixels in the image.

loadPixels() and get() will let us access the r/g/b values in the image.

## Video

We can use the DOM library in p5js to give us access to videos and the camera. Don’t worry, it loads automagically for us.

We need to make a capture variable to get stuff from a camera. createCapture() stores the images in the object, which can be accessed just like an image.

    let capture; // variable for the video
    
    function setup() {
      createCanvas(320, 240);
      capture = createCapture(VIDEO); // capture the video
      capture.size(320, 240); // camera size
    }
    
    function draw() {
      background(255);
      image(capture, 0, 0, 320, 240); // write to canvas
    }

A movie is similar to an image, but it … moves

    // pinched from https://itp.nyu.edu/classes/cc-s16/vision/
    
    let playing = false; // a boolean for switching between states
    let fingers; // variable to hold our video (video that happens to be about fingers)
    
    function setup() {
      fingers = createVideo('assets/fingers.mov'); // refer to your video file here
    }
    // plays or pauses the video depending on current state
    function mousePressed() {
      if (playing) {// if you click the mouse and the video is already playing
        fingers.pause();//then pause the video
      } else { // if you click the mouse and the video is not already playing
        fingers.loop(); // then play and loop the video
      }
      playing = !playing; // on each click set your playing boolean to be the opposite of what it already was. this way it will always update correctly  
    }

But my video is backwards! You can mirror your image with translate() and scale().

    let capture; // variable for the video
    
    function setup() {
      createCanvas(320, 240);
      capture = createCapture(VIDEO); // capture the video
      capture.size(320, 240); // camera size
      capture.hide();
    }
    function draw() {
      background(255);
      push();
      translate(width, 0);
      scale(-1.0, 1.0);
      image(capture, 0, 0); // write to canvas
      pop();
    }

Get the PIXELSSSSSS

All of this becomes really interesting when you start to access the pixels inside the image, video, movie, etc. Each pixel has a R,G,B, and A value associated with it. We can load the image into an array called pixels[], which holds all the information about the image. pixels[0] has the red information of the first pixel in the array, pixels[1] has the green information of the first pixel in the array, pixels[2] has the blue information of the first pixel in the array, and pixels[3] has the alpha information of the first pixel in the array.

To operate on the pixels you need to loadPixels() each frame. To write them out after doing something interesting with them, you updatePixels(). You don’t need to do this all the time though.

This will go thru all the pixels in the video, then swap the colors around.

We can ask questions about the pixels when we loop through them :

    let img; // image we will eventually display on our canvas
    
    function setup() {
      createCanvas(640, 480);
      
      mirror = createCapture(VIDEO); // our video object that will just see what the camera sees
      mirror.size(320,240);
      
      let = createImage(640, 480); // create our image to be the same size as our canvas
      let.loadPixels(); // load our pixels into our first set of pixels into the image
    }

    function draw() {
      background(255);
      mirror.loadPixels(); // load pixel information into our mirror array
    
      for (var i=0; i < 4*(mirror.width*mirror.height); i+=4) { //multiply and step by 4 since each pixel has 4 color variables associated with it (r,g,b,a)
    
          let r = mirror.pixels[i];   // store red value
          let g = mirror.pixels[i+ 1]; // store green value
          let b = mirror.pixels[i+ 2]; // store blue value
          let a = mirror.pixels[i+ 3];// store alpha value

          img.pixels[i] = b;       // in the image swap red values for blue values
          img.pixels[i + 1] = r;  // in the image swap green values for red values
          img.pixels[i + 2] = g;  // in the image swap blue values for green values
          img.pixels[i + 3]= a;   // keep alpha the same for now
    
      }
      img.updatePixels();  // update all the pixels for the image after you've looped through all the pixels
      image(img,0,0);      // finally write new processed image to the canvas
    }

This looks at the brightness of each video pixel and uses it as a means to draw circles. We can step thru each pixel and get the brightness like so :

    function setup() {
      createCanvas(640, 480);
      mirror = createCapture(VIDEO);
      mirror.size(640,480);
      noStroke();
      fill(0);
    }
    
    function draw() {
      background(255);
      mirror.loadPixels();
      let stepSize = round(constrain(mouseX / 8, 6, 32)); // based on mouseX limit the size of our ellipses' diameter to be between 6 and 32 px. 

      for (let y=0; y<height; y+=stepSize) {
        for (let x=0; x<width; x+=stepSize) {
    
          var i = y * width + x;
    
          let darkness = (255 - mirror.pixels[i*4]) / 255; // alpha is always 255
          let radius = stepSize * darkness;
          ellipse(x, y, radius, radius);
        }
      }
    }

Computer vision

Tracking things can be pretty easy sometimes :

We can double up our for loops to get the position of a pixel in the pixels array :

     for (let x = 0; x < video.width; x ++ ) {
        for (let y = 0; y < video.height; y ++ ) {
          let loc = x + y*video.width;
          // What is current color
          color currentColor = video.pixels[loc];
          let red = red(currentColor);
          let green = green(currentColor);
          let blue = blue(currentColor);
          // SOME IF STATEMENT THAT ASKS A QUESTION ABOUT THAT COLOR
         }
     }

This is the magic line :
`
let loc = x + y*video.width;
`
Tracking colors

We can use the dist() function to get the distance from one color to another :

    let video;
    
    // A variable for the color we are searching for.
    let trackColor;
    
    function setup() {
      createCanvas(640, 480);
      // devicePixelScaling(false);
      video = createCapture(VIDEO);
      video.size(320, 240);
      // The above function actually makes a separate video
      // element on the page.  The line below hides it since we are
      // drawing the video to the canvas
       video.hide();
    
      // Start off tracking for red
      trackColor = [255, 0, 0];
    }
    
    function draw() {
    
      // Draw the video
      image(video, 0, 0);
    
      // We are going to look at the video's pixels
      video.loadPixels();
    
      // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
      let worldRecord = 500;
    
      // XY coordinate of closest color
      let closestX = 0;
      let closestY = 0;
    
      for (let y = 0; y < video.height; y++) {
        for (let x = 0; x < video.width; x++) {
    
          let loc = (x + y * video.width) * 4;
    
          // The functions red(), green(), and blue() pull out the three color components from a pixel.
          let r1 = video.pixels[loc];
          let g1 = video.pixels[loc + 1];
          let b1 = video.pixels[loc + 2];
    
          let r2 = trackColor[0];
          let g2 = trackColor[1];
          let b2 = trackColor[2];
    
          // Using euclidean distance to compare colors
          let d = dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.
    
          // If current color is more similar to tracked color than
          // closest color, save current location and current difference
          if (d < worldRecord) {
            worldRecord = d;
            closestX = x;
            closestY = y;
          }
        }
      }
    
      // We only consider the color found if its color distance is less than 10. 
      // This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
      if (worldRecord < 50) {
        // Draw a circle at the tracked pixel
        fill(trackColor);
        strokeWeight(4.0);
        stroke(0);
        ellipse(closestX, closestY, 16, 16);
      }
    }

    function mousePressed() {
      // Save color where the mouse is clicked in trackColor variable
      trackColor = video.get(mouseX, mouseY);
      console.log(trackColor);
    }


Here is is a little smoother by taking the average of all the pixels under a certain threshold :


    let threshold = 20; //255 is white, 0 is black
    let aveX, aveY; //this is what we are trying to find
    let objectR =255;
    let objectG = 0;
    let objectB = 0;
    let debug = true;
    
    function setup() {
      createCanvas(640, 480);
      video = createCapture(VIDEO);
      video.size(320, 240);
      video.hide();
    }
    
    function draw(){
    
        video.loadPixels();
    
        let totalFoundPixels= 0;  //we are going to find the average location of change pixes so
        let sumX = 0;  //we will need the sum of all the x find, the sum of all the y find and the total finds
        let sumY = 0;
    
        //enter into the classic nested for statements of computer vision
        for (let row = 0; row < video.height; row++) {
          for (let col = 0; col < video.width; col++) {
            //the pixels file into the room long line you use this simple formula to find what row and column the sit in 
    
            let offset = (row * video.width + col)*4;
            //pull out the same pixel from the current frame 
            let thisColor = video.pixels[offset];
    
            //pull out the individual colors for both pixels
            let r = video.pixels[offset];
            let g = video.pixels[offset + 1];
            let b = video.pixels[offset + 2];
    
            //in a color "space" you find the distance between color the same whay you would in a cartesian space, phythag or dist in processing
            let diff = dist(r, g, b, objectR, objectG, objectB);
    
            if (diff < threshold) {  //if it is close enough in size, add it to the average
              sumX = sumX + col;
              sumY= sumY + row;
              totalFoundPixels++;
             // if (debug) video.pixels[offset] = 0xff000000;//debugging
            }
          }
        }
        video.updatePixels();
    
        image(video,0,0);
    
        if (totalFoundPixels > 0){
          aveX = sumX/totalFoundPixels;
          aveY = sumY/totalFoundPixels;
          ellipse(aveX-10,(aveY-10),20,20);
        }
    }
    
    function mousePressed(){
      //if they click, use that picture for the new thing to follow
     // var offset = mouseY * video.width + mouseX;
    
      //pull out the same pixel from the current frame 
      let thisColor = video.get(mouseX,mouseY);
    
      //pull out the individual colors for both pixels
       objectR = thisColor[0];
       objectG = thisColor[1];
       objectB = thisColor[2];
      println("Chasing new color  " + objectR + " " + objectG + " " + objectB);
    }

    function keyPressed() {
      //for adjusting things on the fly
      if (key == '-') {
        threshold--;
        println("Threshold " + threshold);
      } 
      else if (key == '=') {
        threshold++;
        println("Threshold " + threshold);
      }
      else if (key == 'd') {
        background(255);
        debug = !debug;
        println("Debug " + debug);
      }
      else if (key == 't') {
        println("Time Between Frames " + ellapsedTime);
      }
    }

Background subtraction is great too

This allows us to isolate objects from the front of the camera, it's like a DIY Zoom background

    let video;
    let display;
    let bgImage;
    
    // How different must a pixel be to be a foreground pixel
    let threshold = 20;
    
    function setup() {
      createCanvas(640, 480);
      video = createCapture(VIDEO);
      video.size(320, 240);
      video.hide();
      // Create an empty image the same size as the video
      bgImage = createImage(width, height);
      display = createImage(width, height);
    
    }
    
    function draw() {
    
      // We are looking at the video's pixels, the memorized backgroundImage's pixels, as well as accessing the display pixels. 
      // So we must loadPixels() for all!
    
      video.loadPixels();
      bgImage.loadPixels();
      display.loadPixels();
    
      // Begin loop to walk through every pixel
      for (let x = 0; x < video.width; x++) {
        for (let y = 0; y < video.height; y++) {
          let loc = (x + y * video.width) * 4; // What is the 1D pixel location
    
          // Store the RGB values for each pixel of the video and our background image
          let r1 = video.pixels[loc];
          let g1 = video.pixels[loc + 1];
          let b1 = video.pixels[loc + 2];
          let r2 = bgImage.pixels[loc];
          let g2 = bgImage.pixels[loc + 1];
          let b2 = bgImage.pixels[loc + 2];
    
          //Compare the foreground and background color
          let diff = dist(r1, g1, b1, r2, g2, b2);
    
          // Is the foreground color different from the background color
          if (diff > threshold) {
            // If so, display the foreground color
            display.pixels[loc] = video.pixels[loc];
            display.pixels[loc + 1] = video.pixels[loc + 1];
            display.pixels[loc + 2] = video.pixels[loc + 2];
            display.pixels[loc + 3] = video.pixels[loc + 3];
    
          } else {
            // If not, display green
            display.pixels[loc] = 0;
            display.pixels[loc + 1] = 255;
            display.pixels[loc + 2] = 0; // We could choose to replace the background pixels with something other than the color green!
            display.pixels[loc + 3] = 255;
          }
        }
      }
      //update the display image
      display.updatePixels();
    
      // display the updated display image
      image(display, 0, 0);
    
      // show our threshold in text at the bottom of the screen
      fill(0);
      rect(0, height - 20, width, height);
      fill(255);
      text("Threshold is now: " + threshold, 20, height - 5);
    }
    
    function mousePressed() {
      for (var i = 0; i < video.pixels.length; i++) {
        bgImage.pixels[i] = video.pixels[i];
      }
    
      bgImage.updatePixels();
      changeThreshold(); // comment this out to keep threshold constant
    }
    
    // change the threshold on the fly depending on where you click
    function changeThreshold() {
      threshold = map(mouseX, 0, width, 0, 175);
      print("Threshold is now: " + threshold);
    }

