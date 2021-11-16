
So far we have touched on the physical side of the world of electronics, but what is even more exciting is that we can use computers to communicate with one another. A good starting point for that is sending information between a microcontroller and a multimedia computer.

We’ll send some information from the Arduino to a p5js sketch, then do the reverse. Eventually we’ll have the machines doing full fledged communication with each other.

Our Arduino sketches cannot speak to the browser directly. We need to install some software which will enable communication between the two.

To start, download the latest version of the serialcontrol application from here : [https://github.com/p5-serial/p5.serialcontrol/releases](https://github.com/p5-serial/p5.serialcontrol/releases)

Install the file you downloaded while we talk about other things and make note of where you have saved it.

We can re-use some of our earlier Arduino sketches to communicate with the browser. Let’s revisit the analog output sketch we did :
```C++

/*Reads an analog input pin, maps the result to a range from 0 to 255
  and prints the results to the serial monitor.
  The circuit: * potentiometer connected to analog pin 7.
  Center pin of the potentiometer goes to the analog pin.
  side pins of the potentiometer go to +5V and ground

  This example code is in the public domain.*/

// These constants won't change. They're used to give names
// to the pins used:
const int analogInPin = A7;
// Analog input pin that the potentiometer is attached to
int sensorValue = 0; // value read from the pot
int outputValue = 0; // value output to the PWM (analog out)

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600);
}

void loop() {
  // read the analog in value:
  sensorValue = analogRead(analogInPin);
  // map it to the range of the analog out:
  outputValue = map(sensorValue, 0, 1023, 0, 255);
  // print the results to the serial monitor:
  Serial.write(outputValue);
  // wait a millisecondsbefore the next loop
  // for the analog-to-digital converter to settle
  // after the last reading:
  delay(2);
}
```
Let’s open up the serial monitor.

Full of gibberish, right? We’ll explain that in a moment (it has to do with the difference between Serial.print() and Serial.write() )

For now, let’s be happy that it’s sending information.

To work with the p5 side, we have to do a lot more:

* Import the P5JS serialport Library into our sketch
* Make a Serial Object
* Find the Right USB port in the Setup Function and make a serial object.
* Make a Callback Function to Listen to Incoming Messages
* profit!!!! (that’s actually number 4)

The serial port library can’t access your serial ports directly. It needs to communicate with a local server.

We need to copy p5.serialserver.js into our sketch folder.

We need to add the library to our index.html
```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.js"></script>
   	  <script language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5.serialserver@0.0.28/lib/p5.serialport.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <script src="sketch.js"></script>
  </body>
</html>
```

Now for our javascript!
We need to identify which serial port the computer is communicating to the Arduino with. The setup here is more complicated than the Arduino code. You’ve seen the port names in your Arduino IDE already. But COM3 or /dev/cu.usbmodem1421 aren’t the easiest things to recall. This sample code will print out all the serial devices attached to your computer.

```javascript
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem142201'; // fill in your serial port name here
let inData; // for incoming serial data

function setup() {
  createCanvas(400, 300);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors

  serial.open(portName); // open a serial port
  serial.clear();
}

function draw() {
  // black background, white text:
  background(inData, 0, 0);
  fill(255);
  // display the incoming serial data as a string:
  text("incoming value: " + inData, 30, 30);
}

function keyTyped() {
    let outByte = key;
    console.log("Sending " + outByte);
    //serial.write(Number(outByte)); // Send as byte value
    serial.write(outByte); // Send as a string/char/ascii value
}

function serialEvent() {
  // read a byte from the serial port:
  let inByte = serial.read();
  print("inByte: " + inByte);
  inData = inByte;
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
```
open the p5.seriacontrol application, then run your sketch on a local server.

the console will print the name of your microcontroller!

Javascript relies on events _and _callbacks. Eevnts are generated by your operating system when something happens (like a mouse click or serial port opening, or serial data arriving). Your sketch has callback functions that respond to that event. the p5.serialport library can listen for the following events :

```javascript
// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
```

you set a callback function in p5 like this :
```javascript

let serial;

function setup() {
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Let's list the ports available
  let portlist = serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1421");

  // Register some callbacks

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);

  // When we some data from the serial port
  serial.on('data', gotData);

  // When or if we get an error
  serial.on('error', gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
}

// We are connected and ready to go
function serverConnected() {
    print("We are connected!");
}

// Got the list of ports
function gotList(thelist) {
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is open!");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readStringUntil("\r\n");
  console.log(currentString);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

function draw() {
  // Polling method
/*
  if (serial.available() > 0) {
    let data = serial.read();
    ellipse(50,50,data,data);
  }
*/
}
```

We don’t need all of these for data, but they are helpful. serialEvent processes incoming data. If we made a global variable and passed it the information from serial.read(), we’d have a means of passing data from the arduino to our sketch.

Arduino sending ASCII
```C++
void setup() {
 Serial.begin(9600); // initialize serial communications
}
 
void loop() {
 int potentiometer = analogRead(A0);                  // read the input pin
 int mappedPot = map(potentiometer, 0, 1023, 0, 255); // remap the pot value to fit in 1 byte
 Serial.println(mappedPot);                           // print it out the serial port
 delay(1);                                            // slight delay to stabilize the ADC
}
```

Now if we wanted to pass data from the arduino to a sketch, we can do this :
```javascript

var serial;                             // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem141301';  // fill in your serial port name here
var inData;                             // for incoming serial data
var serialDiv;                        // an HTML div to show incoming serial data
function setup() {
  createCanvas(400, 300);
  createHTML();                       // make some HTML to place incoming data into
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("sensor value: " + inData, 30, 30);
  printData("sensor value: " + inData);
}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  inData = Number(serial.read());
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

// create some HTML elements in the sketch:
function createHTML() {
  serialDiv = createElement('p', 'incoming data goes here');
  serialDiv.attribute('aria-label', 'incoming data');
  serialDiv.attribute('aria-role', 'alert');
  serialDiv.attribute('aria-live', 'polite');
  serialDiv.style('color', 'white');
  serialDiv.position(10, 40);
}

function printData(inString) {
  // put the input in the serialDiv div:
  serialDiv.html('log: ' + inString);
  // print it to the console as well
 // console.log(inString);
}
```

Awesome! We should see a graph of our sensor!+


Sending to Arduino from p5js
Arduino code
```C++
const int ledPin = 13; // the pin that the LED is attached to
int incomingByte;      // a variable to read incoming serial data into

void setup() {
  // initialize serial communication:
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
}

void loop() {
  // see if there's incoming serial data:
  if (Serial.available() > 0) {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();
    // if it's a capital H (ASCII 72), turn on the LED:
    if (incomingByte == 'H') {
      digitalWrite(ledPin, HIGH);
    }
    // if it's an L (ASCII 76) turn off the LED:
    if (incomingByte == 'L') {
      digitalWrite(ledPin, LOW);
    }
  }
}

```

p5js
```javascript

var serial;                             // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem141301';  // fill in your serial port name here

function setup() {
  createCanvas(400, 300);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw() {
  // black background, white text:
  background(0);
  fill(255);
  // display the incoming serial data as a string:
  text("sensor value: " + inData, 30, 30);
  printData("sensor value: " + inData);
}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {

// nothinhg here
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}


function printData(inString) {
// nothing here
}

function mousePressed() {
  if (value === 0) {
    serial.write(0);
  } else {
    serial.write(1);
  }
}

```

a slight digression into how 32 == the space bar, and 27 == the escape key.

The call and response method of exchanging data is a reliable and effective way you can communicate between machines. Here’s an Arduino layout and program that waits for a byte before it sends data to a p5.js sketch. there's a switch connected to pin 7, and 2 pots or other analog sensors, connected to A0 and A1.
```C++
void setup() {
  Serial.begin(9600);
  pinMode(7, INPUT);

  while (Serial.available() <= 0) {
    Serial.println("hello");
    delay(300);
  }
}

void loop() {
  if (Serial.available() > 0) {
    int inByte = Serial.read();
    //we did it to slow things down for synchronization
    //notice we didn't even put the number in anything

    int pot1 = analogRead(A0);
    int pot2 = analogRead(A1);
    int button = digitalRead(7);
    Serial.print(pot1);  //notice I did not say println
    Serial.print(",");
    Serial.print(pot2);
    Serial.print(","); //using the comma as a delimiter
    Serial.println(button);
  }
}
```

And the associated js code
```javascript

var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var xPos = 0;
var yPos = 0; // y location of the circle
var circleColor = 255; // color of the circle

function setup() {
 createCanvas(640, 480); // make canvas
 background(0); // black background
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen); // callback for the port opening
 serial.on('data', serialEvent); // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose); // callback for the port closing

 serial.list(); // list the serial ports
 serial.open(portName); // open a serial port
}


function draw(){
 background(255, 255, 0);
 fill(circleColor); // fill depends on the button
 ellipse(xPos, yPos, 50, 50); // draw the circle
 print("circle color: " + circleColor);
}


function serialEvent() {
 // read a string from the serial port
 // until you get carriage return and newline:
 var inString = serial.readStringUntil('\r\n');

 //check to see that there's actually a string there:

 if (inString.length > 0) {

 if (inString !== "hello") {

 inString = inString.trim(); // get rid of whitepace

 var sensors = split(inString, ','); // split the string on the commas

 if (sensors.length > 1) { // if there are more than 1 element
  yPos = map(Number(sensors[0]), 0, 1023, 0, height); // element 0 is the ypos
  xPos = map(Number(sensors[1]), 0, 1023, 0, width); // element 1 is the xPos
  circleColor = 255 - (Number(sensors[2]) * 255); // element 2 is the button
  }
 }
 serial.write('x');
 }
}

function serialError(err) {
 println('Something went wrong with the serial port. ' + err);
}

function portClose() {
 println('The serial port closed.');
}

function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
 println(i + " " + portList[i]);
 }
}

function serverConnected() {
 println('connected to server.');
}

function portOpen() {
 println('the serial port opened.')
}
```
