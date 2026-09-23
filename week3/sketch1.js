let cDiam = 10;

let xSpacing = 10;

let ySpacing = 10;

//Setup happens before the website is shown, only happens once and that's it
function setup(){
    createCanvas(1000,1000);
    //noLoop();
 }

//Create many dots.
function draw() {
  blendMode(BLEND);
  background(255);

  for (let xPos = 0; xPos <= width; xPos += xSpacing) {
    for ( let yPos = 0; yPos <= height; yPos += ySpacing){
    //Create a gradient.
    fill(0 + xPos/50);
    noStroke();
    let cSize = cDiam * (1-xPos/width);
    ellipse(xPos, yPos, cSize);
  }}

  //The color will inverse as the mouse moves.
  blendMode(DIFFERENCE);
  noStroke();
  fill(255);
//Draw the rectangle that will inverse the color. 
let rectWidth = mouseX;
let rectHeight = height;

rectMode(CORNER);
rect(0,0,rectWidth,rectHeight);

}




