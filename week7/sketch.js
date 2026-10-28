let pMapper;
let face1;
let face2;
let face3;

let scanLines = [];
let expandingSquares = [];
let dotGrid = [];

let cols = 10;
let rows = 10;
let spacing = 35;
let currentRow = 0;
let currentCol = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    pMapper = createProjectionMapper(this);
    
    face1 = pMapper.createQuadMap(400, 400);
    face2 = pMapper.createQuadMap(400, 400); 
    face3 = pMapper.createQuadMap(400, 400);


    for (let i = 0; i < 6; i++) {
        scanLines.push(new ScanLine(i / 6));
    }

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let px = x * spacing + 40;
            let py = y * spacing + 40;
            dotGrid.push(new Dot(px, py));
        }
    }
}

function draw() {
    background(0);
    face1.displaySketch(squareSketch); 
    face2.displaySketch(scanSketch); 
    face3.displaySketch(dotSketch);  
}

//An exoanding soquare that will grow until it reach it max size
class ExpandingSquare {
  constructor() {
    this.size = 0;
    this.maxSize = 400;
    this.speed = 3;
    this.col = color(random(100, 255), random(50, 220), random(150, 255));
  }

  update() {
    this.size += this.speed;
  }

  isFinished() {
    return this.size >= this.maxSize;
  }

  render(pg) {
    pg.push();
    pg.translate(200, 200); 
    pg.rectMode(CENTER);
    pg.noFill();
    pg.stroke(red(this.col), green(this.col), blue(this.col));
    pg.strokeWeight(3);
    // Draw the sqaure with rounded corner
    pg.rect(0, 0, this.size, this.size, 6);
    
    pg.pop();
  }
}
function squareSketch(pg) {
    pg.background(15);
//For every 15 frames, draw a new square
    if (frameCount % 15 === 0) {
        expandingSquares.push(new ExpandingSquare());
    }

    for (let i = expandingSquares.length - 1; i >= 0; i-= 1) {
        expandingSquares[i].update();
        expandingSquares[i].render(pg);
        
//Kill the square if it reached its max size
//*Splice out the element to remove it from the array
        if (expandingSquares[i].isFinished()) {
            expandingSquares.splice(i, 1);
        }
    }
}

class ScanLine {
  constructor(l) {
    this.life = l;
    this.speed = 0.008;
  }

  update() {
    this.life += this.speed;
    //When it reaches the end, reset it
    if (this.life > 1.0) {
      this.life = 0.0;
    }
  }

  render(pg) {
    //Calculate the y position based on the this.life
    // lerp(): https://p5js.org/reference/p5/lerp/
    let y = pg.lerp(0, 400, this.life);
    //Fade the line in and out
    let alpha = sin(this.life * PI) * 200;

    pg.push();
    pg.stroke(100, 220, 255, alpha);
    pg.strokeWeight(2);
    pg.line(0, y, 400, y);
//Draw another line with glowing efefct 
    pg.stroke(100, 220, 255, alpha * 0.3);
    pg.strokeWeight(8);
    pg.line(0, y, 400, y);
    pg.pop();
  }
}

function scanSketch(pg) {
    pg.background(20);

    for (let i = 0; i < scanLines.length; i+=1 ) {
    scanLines[i].update(); 
    scanLines[i].render(pg);
    }
}


class Dot{
  constructor(x, y) {
    this.x = x;
    this.y = y;
//Dots are initially not filled
    this.filled = false;
  }

  render(pg) {
    pg.noStroke();
      //If the dot is filled, draw a larger dot
    if (this.filled) {
      pg.fill(100, 200, 255);
      pg.ellipse(this.x, this.y, 20);
    } 
      //Else draw a smaller dot
      else {
      pg.fill(60);
      pg.ellipse(this.x, this.y, 8);
    }
  }
}

function dotSketch(pg) {
    pg.background(30);

    //Every 5 frames, light up a dot in order
    if (frameCount % 5 === 0) {
        let index = currentRow * cols + currentCol;
        dotGrid[index].filled = true;

     // Clear the previous row when starting a new row
        if (currentCol === 0 && currentRow > 0) {
            for (let x = 0; x < cols; x++) {
                let indexToClean = (currentRow - 1) * cols + x;
                dotGrid[indexToClean].filled = false;
            }
        }
        currentCol += 1;   
        //Move to the next row  
        if (currentCol >= cols) {
            currentCol = 0;
            currentRow += 1;
        }
        // Return to the first row
        if (currentRow >= rows) {
            currentRow = 0;
        }
    } 

    for (let i = 0; i < dotGrid.length; i += 1) {
        dotGrid[i].render(pg);
    }
}



function keyPressed() {
    switch (key) {
        case "c":
            pMapper.toggleCalibration();
            break;
        case "f":
            let fs = fullscreen();
            fullscreen(!fs);
            break;
        case "l":
            pMapper.load("maps/map.json");
            break;
        case "s":
            pMapper.save("map.json");
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}   