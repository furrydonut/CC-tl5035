
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

let maxCount = 50;

//let colors = ['blue'];
let blueShade = 5;

//setup happens before the website is shown, only happens once and that's it
function setup(){
    createCanvas(1000,1000);
    noLoop();
}

//Create nonovelapping circles 
function draw() {
  background(0,170,250);
//blendMode(MULTIPLY);
//Change the color of the bubble randomly  
for (let i = 0; i < blueShade; i += 1) {
    
    
    fill(0,170,i/250);
    //stroke('blue');
    //strokeWeight(1);
    noStroke
    let d = random (20,100);
    let x = random(width);
    let y = random(height);
    ellipse(x,y, d);


  }



//cocnsole.log('mouseX =')
}




