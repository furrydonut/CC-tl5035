let ellipX = 500;
let ellipY = 250;
let ellipWidth = 400;
let ellipHeight = 100;
let ySpacing = 10;
let yCount = 50;
let ellipSize = 0.5;

function setup() {
  createCanvas(1000, 1000);
}

function draw() {
background('lightblue');

//Get the left and right edge of the can.
let leftEdge = ellipX - ellipWidth/2;
let rightEdge = ellipX + ellipWidth/2;


for(let i = 0 ; i <= yCount; i += 1){

if(mouseX >= leftEdge && mouseX <= rightEdge){
  //Turn the top half red, the bottom half gray with stoke.
  if(i <= 50 && i > 25){
  stroke(1);
  fill(240);
} else{
  noStroke();
  fill (255,0,0);
  }
 } 
//The can is black unless the mouse is hovered on the can.
  else {
  fill(0);    
}
//Draw that can.
let yPos = ellipY + i* ySpacing;
ellipse(ellipX, yPos, ellipWidth, ellipHeight);
}

fill('yellow');
circle(mouseX,mouseY,80);
}




