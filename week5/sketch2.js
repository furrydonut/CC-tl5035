
let secondsRadius;
let ellipseRadius = 300;
//6 colors in total;i[0] - i[5];
let colorPalette = ['limegreen', 'yellowgreen', 'gold', 'orange', 'orangered', 'red'];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  //colorMode(HSB);
}

function draw() {
  background(255);
  translate(width/2, height/2);

//change the color of the circle every 5 minutes, loop in 30 minutes.
let min = minute() % 30;
  let statusText = "blah";
  let paletteIndex = 0;
  
  if (min < 25) {
    statusText = "Work: " + (25 - min) + "m left";
    paletteIndex = 1 + floor(min / 5);
  } else {
    statusText = "Rest: " + (30 - min) + "m left";
    paletteIndex = 0;
  }

  let baseColor = color(colorPalette[paletteIndex]);

//Draw the clock 
 push();
  noStroke();
  fill(red(baseColor), green(baseColor), blue(baseColor), 40); 
  ellipse(0, 0, ellipseRadius);
  pop();


let secondsRadius = ellipseRadius / 2;
//Draw the wiper
//https://p5js.org/examples/Calculating-Values-Clock/
//map(initial value, initial min, initial max, new min, new max); 
let secondAngle = map(second(), 0, 60, 0, 360);
  push();
  stroke(baseColor);
  line(0, 0, 0, -secondsRadius)
  pop();

//Draw an arc with transparency
//arc(x, y, w, h, start, stop, [mode], [detail]);
//the fourth value of fill() is the alpha value, which controls the transparency of the color. A value of 0 means fully transparent, while a value of 255 means fully opaque. In this case, fill(255, 0, 0, 100) sets the fill color to red with an alpha value of 100, making it partially transparent. This allows the background and other elements behind the arc to be visible through it.
push();
rotate(-90);
noStroke();
fill(baseColor);
arc(0, 0, ellipseRadius, ellipseRadius, 0, secondAngle);
pop();

//Draw the tic markers
push();
stroke(150);
strokeWeight(3);
for (let x = 0; x < 60; x += 1) {
  point (0, secondsRadius-10);
  rotate(6);
}
pop();

//Draw the stem
push();
  fill(34, 139, 34); 
  noStroke();
  for (let a = 0; a < 360; a += 72) {
    push();
    rotate(a);
    ellipse(0, 18, 12, 35); 
    pop();
  }
  fill(20, 100, 20);
  ellipse(0, 0, 18, 18);
  pop();

//Write down the current time and countdown
push();
translate(-width/2, -height/2);
fill(0);
textSize(20);
textAlign(CENTER, TOP);
textSize(18);
text(statusText, width / 2, 20);
pop();

push();
translate(-width/2, -10);
fill(0);
textAlign(CENTER, CENTER);
textSize(10);
let s = second();
let m = minute();
let h = hour();
text (h + ' : ' + m + ' : ' + s, width/2, height/2);
pop();
}