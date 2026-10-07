
let secondsRadius;
let ellipseRadius = 300;
//10 colors in total;i[0] - i[9];
let colorPalette = ['red','orange','yellow','lime','green','cyan','blue','indigo','violet','pink'];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  //colorMode(HSB);
}

function draw() {
  background(255);
  translate(width/2, height/2);

//change the color of the circle according to the second
//for every 60 seconds, aka 1 minute, the color of the circle will change 
//to a different color from the color array. loop in 10 minutes.
let currentColor = colorPalette[minute() % colorPalette.length];

//Draw the clock 
push();
noStroke();
fill(currentColor);
ellipse(0, 0, ellipseRadius);
pop();


let secondsRadius = ellipseRadius / 2;
//Draw the wiper
//https://p5js.org/examples/Calculating-Values-Clock/
//map(initial value, initial min, initial max, new min, new max); 
let secondAngle = map(second(), 0, 60, 0, 360);
  push();
  stroke(currentColor);
  line(0, 0, 0, -secondsRadius)
  pop();

//Draw an arc with transparency
//arc(x, y, w, h, start, stop, [mode], [detail]);
//the fourth value of fill() is the alpha value, which controls the transparency of the color. A value of 0 means fully transparent, while a value of 255 means fully opaque. In this case, fill(255, 0, 0, 100) sets the fill color to red with an alpha value of 100, making it partially transparent. This allows the background and other elements behind the arc to be visible through it.
push();
rotate(-90);
noStroke();
fill(255, 255, 255, 100);
arc(0, 0, ellipseRadius, ellipseRadius, 0, secondAngle);
pop();

//Draw the tic markers
push();
stroke(255);
strokeWeight(3);
for (let x = 0; x < 60; x += 1) {
  point (0, secondsRadius-10);
  rotate(6);
}
pop();

//Write down the time
push();
translate(-width/2, -10);
fill(0);
textSize(20);
textAlign(CENTER, CENTER);
textSize(10);
let s = second();
let m = minute();
let h = hour();
text ('hour: ' + h + ' minute: ' + m + ' second: ' + s, width/2, height/2);
pop();
}