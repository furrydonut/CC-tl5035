
//Condition: True of Falsee
//If statement
// &&: and 
// ||: or
// ==: is a question/condition

// for loop
// while loop
// i:index

//1.Declare the variable
//let y;
//**const = constant value, will never change

//Podka Spots 

let cDiam = 50;

let xSpacing = 100;
let xOffset = 50;

let ySpacing = 100;
let yOffset = 50;



//The rectangle will inverse the podka dots as mouse move
//setup happens before the website is shown, only happens once and that's it
function setup(){
    createCanvas(1000,1000);
    noLoop();
}

//Create podka dots
function draw() {
  background(255);
//blendMode(MULTIPLY);
  for (let xPos = xOffset; xPos <= width; xPos += xSpacing) {
    for ( let yPos = yOffset; yPos <= height; yPos += ySpacing){
    fill(0 + xPos/5);
    noStroke();
    ellipse(xPos, yPos, cDiam+xPos/20);
  }}

  //the color inverse when the mouse moves
let rectWidth = 500//mouseX;
let recHeight = 1000;

rectMode(CENTER);
fill(120,120,0);
rect(500,500,500 ,500);

}




