
let scaleSize = 10;

let xScale = 5;
let yScale = 5;

let rotAngle = 0.05;

let count = 50;

let seed = 0;
let doExport = false;


function setup() {
  createCanvas(576, 384);
  //noLoop();
}

function keyPressed() {
  if (key == "r") {
    seed = floor(random(10000));
    scaleSize = random(10,50);
    rotAngle = random(0.01, 0.1); 
    count = floor(random(20,50));
  }
  if (key == "s") {
    doExport = true;
  }
}

//Draw a square
function drawRect(w, h, rot) {
  rectMode(CENTER);
  push(); 
  translate(width / 2, height / 2);
  rotate(rot);
  noFill();
  strokeWeight(1.5);
  rect(0, 0, w, h); 
  pop(); 
}

function draw() {

  noiseSeed(seed);
  randomSeed(seed);

  background('lightgray');

  // Start recording SVG BEFORE anything draws
  if (doExport) {
    beginRecordSvg("myPlot_" + "seed_" + seed + ".svg");
  }

//For each square, slightly scale and rotate
  for (let i = 1; i <= count; i++) {
    let w = xScale+i*scaleSize;
    let h = yScale+i*scaleSize;
    let rot = i*rotAngle;
    drawRect(w, h, rot); 
  }

  if (doExport) {
    endRecordSvg();
    doExport = false;
  }
}



