let xPos;
let yPos;
//starts with letters,numbers,underscore.
//define the varaible
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    //degreeMode(DEGREESS):roration mode to degrees.
    //rotate():https://p5js.org/reference/p5/rotate/
    xPos=width/2;
    yPos=height/2;
    //consol.log():debug and get information back from program.
    //Change color mode, the default is RGB.
    //HTML color: https://www.computerhope.com/htmcolor.htm

    background(,25,120);
}



function draw() {
    translate(200,200);
    //translate effects what goes down here
    ellipse(0,0,100);
    //varaibles
    fill('#FFF380');
    rectMode(CENTER);
    rect(xPos,yPos,100,100);
    stroke(120,200,103);
    fill(250,250,250,150);
    //strokeWight()
    //Tab applies the changes to the next line of code, so you can see what is affected by the changes.
    //noStroke()
    //translate():Translates the coordinate system.
    //push(): save the current transformation state
    //pop(): escape the current transformation state and restore the previous one.
 
}

function mousePressed() {
     background(120,25,120);
     //paint over the background to clear the screen.
    xPos = random(0,width);
    yPos = random(0,height);
    console.log("mousePressed() xPos: " + xPos + " yPos: " + yPos);
}