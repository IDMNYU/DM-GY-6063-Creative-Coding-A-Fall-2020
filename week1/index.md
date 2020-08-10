
Computers are great adding machines. They’re also great at comparing things that usually don’t work well together. Last week, we looked at [Jim Campbell's animation](http://jimcampbell.tv/portfolio/miscellaneous_references/) about various types of inputs and outputs. Thanks to the magic of miocrocontrollers, we can get away from the mouse, monitor, keyboard (and the now ubiquitous touchscreen) to think differently about these machines we use all the time.

At the end of the day, all we’re doing with a circuit is wrangling electrons. These little buggers want to move from a place of higher potential energy (often referred to as power) to a place of lower potential energy (often called ground). Some analogies for how electricty works in a circuit involve [water](https://learn.sparkfun.com/tutorials/voltage-current-resistance-and-ohms-law/voltage), rocks, or buses. Because we only learned that electrons are negatively charged after we gave the names positive and negative to these things, [there's a diference in how physicists and engineers (and most folks) describe this phenomena](https://www.allaboutcircuits.com/textbook/direct-current/chpt-1/conventional-versus-electron-flow/).

When we describe electrical characteristics, we talk about voltage (measured in Volts), current (measured in Amps or Amperes), and resistance (measured in Ohms). Voltage is like the force of the electricity, the current is the amount of electricity, and resistance pushes back against the flow. 

[Ohms Law](https://learn.adafruit.com/circuit-playground-o-is-for-ohm/learn-more) (V=I*R) is useful in theory, but not so much for day to day use. It's useful for making sure you don't light your LEDs on fire accidentally.

We always want our circuits (closed loops with a connection between power and ground) to have some sort of work for the electrons to do. This can be busywork (like a resistor), or actual work (like an LED), or behind the scenes work (operating logic gates). Without something to do, electrons get bored and start fires (aka short circuits). All voltage gets used up in a circuit, which is why you can’t bring your DVD player to France. 

You should also keep in mind that that electricity is like a college student in that it follows the path of least resistance.

The last thing you need to know about circuit building is that all things must connect to ground.

We [use schematics to identify various components](https://vimeo.com/90534363)
![components and schemeatics](/week1/components.png)

[Breadboards](https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all) are our canvas. They’re the best. They allow us to change circuits quickly and easily. Underneath the plastic insulation, there are metallic strips that form connections which carry electricity. See [what’s inside a breadboard](https://www.youtube.com/watch?v=qDe28Su5lOA) for more.

Soldering is going to become your best bet at keeping things in place. [Adafruit has an excellent guide to soldering.](https://learn.adafruit.com/adafruit-guide-excellent-soldering)

We will be working with DC in this class. It's what comes out of 9V batteries, USB cables, and the charger for your laptop. [There’s also AC](https://learn.sparkfun.com/tutorials/alternating-current-ac-vs-direct-current-dc/all), it's the stuff that comes out of wall sockets, runs along power lines, and has been used to electrocute an elephant. But don’t go there.

Turn the Arduino into an expensive power supply to light up your LED.
![simple circuit](http://cc.droolcup.com/wp-content/uploads/2015/07/Simple-Switch.png)

This circuit has 2 LEDs in series (for you CS folks, this is like &&)
![leds in series](/week1/seriesLED_bb.png)

This curcuit has 2 LEDs in parallel (aka ||)
![leds and switches in parallel](http://cc.droolcup.com/wp-content/uploads/2015/07/bb.png)

Multimeters are great tools for figuring out what is going on inside a circuit. [Adafruit has a very nice tutorial on how to use one.](https://learn.adafruit.com/multimeters/overview)

Now that you have used a switch out of the box, make your own. [Here is a great example of how you should be thinking about the exercise for the week.](https://itp.nyu.edu/~tlc345/blog/mustache-switch/)
