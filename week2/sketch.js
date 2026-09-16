function setup() {
    createCanvas(2000, 2000);
    xPos = width/2;
    yPos = height/2;
    bgColor = 220;
    //Random ellipe size
    ellipseSize = random(600,1200);
    //Radom scale
    sRandom = random(1, 3);
    //Random rotation
    rRandom = random(0, 360);
    //Random translation
    tRandom = random(0, 400);
    rectWidth = random(200, 800);
    rectHeight = rectWidth/2;
    //Random color
    manycolors = [('#0033ff'), ('#ff0000'), ('#fbff00')];
    cRandom = random(manycolors) ;
    //shuffledcolor =shuffle(manycolors, true);
    background(bgColor);    
}

function draw() {
    translate(xPos,yPos);  

    //Draw the rectangle
    push();
    rotate(rRandom);
    rectMode(CENTER);
    translate(0,tRandom);
    noStroke();
    fill('#ff0000');
    rect(0,0,rectWidth*sRandom,rectHeight*sRandom);
    pop();

    //Draw the ellipse
    push();  
    blendMode(MULTIPLY);
    strokeWeight(20);
    fill('#0033ff');
    ellipse(tRandom,tRandom,ellipseSize);
    translate();
    pop();
    
    
    //Draw the triangle
    push();
      scale(sRandom); 
      rotate(rRandom);   
      translate(0,tRandom);
      fill('#fbff00');
      strokeWeight(2); 
      triangle(0, 0, 400, 100, 430, 375);
      blendMode(BURN);     
    pop();

    
}
    function mousePressed() {
    background(bgColor);
    sRandom = random(1, 3);
    rRandom = random(0, 360);
    tRandom = random(0, 400);
    rectWidth = random(100, 300);
    rectHeight = rectWidth/2;
    //cRandom = random(manycolors)
    ellipseSize = random(200,500);
    
}

  
//function windowResized() { 
//resizeCanvas(2000, 2000); }