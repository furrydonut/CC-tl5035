let video; 
let hands = []; 

let isAudioStarted = false;

//Beads with piano note
let beads = [];
let numBeads = 8;
let notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

async function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO, { flipped: true });
  video.size(800, 600);
  video.hide();

  // Load two hands and mirror them
  // 
  
    handPose = await ml5.handPose({ maxHands: 2, flipped: true });
    handPose.detectStart(video, gotHands);
 

//Initizalize beads position
  let startX = 150;
  let endX = width - 150;
  let beadConfigs = [
    { type: 'oval', w: 32, h: 42, color: [0, 80, 80], pattern: 'stripes' },
    { type: 'round', w: 42, h: 42, color: [140, 170, 190], pattern: 'dust' },
    { type: 'irregular', w: 35, h: 42, color: [200, 110, 20], pattern: 'amber' },
    { type: 'cylinder', w: 55, h: 26, color: [50, 40, 40], pattern: 'spotted' },
    { type: 'eye', w: 65, h: 32, color: [120, 40, 15], pattern: 'eyeballs' },
    { type: 'drop', w: 35, h: 42, color: [180, 160, 30], pattern: 'clear' },
    { type: 'square', w: 45, h: 42, color: [90, 140, 45], pattern: 'frost' },
    { type: 'round', w: 38, h: 38, color: [170, 190, 160], pattern: 'glaze' }
  ];

  for (let i = 0; i < numBeads; i++) {
    let x = lerp(startX, endX, i / (numBeads - 1));
    let y = height / 2;
    let cfg = beadConfigs[i];
    beads.push({
      x: x, baseX: x, y: y, baseY: y,
      sizeW: cfg.w, sizeH: cfg.h,
      type: cfg.type, color: cfg.color, pattern: cfg.pattern,
      note: notes[i]
    });
  }
}

function startAudio() {
  if (!isAudioStarted) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    isAudioStarted = true;
    console.log("Audio Context Started.");
  }
}

function mousePressed() {
  startAudio();
}

function draw() {
  background(40);
  

  tint(255, 160);
  image(video, 0, 0, width, height);
  noTint();

 //Press to start 
  if (!isAudioStarted) {
    fill(0, 0, 0, 220);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text("Press anywhere to start", width / 2, height / 2);
    return;
  }

  //Get the position of finger tips
  let indexFingers = [];
  if (hands && hands.length > 0) {
    for (let h of hands) {
      if (h.keypoints && h.keypoints[8]) {
        indexFingers.push({
          x: h.keypoints[8].x,
          y: h.keypoints[8].y
        });
      }
    }
  }

  //Check the distance between the beads and finger tips,
  for (let b of beads) {
    for (let finger of indexFingers) {
      let d = dist(finger.x, finger.y, b.x, b.y);
      if (d < 70) {
        b.x += (b.x - finger.x) * 0.12;
        b.y += (b.y - finger.y) * 0.12;
        if (isAudioStarted && frameCount % 12 === 0) {
          playTone(b.note);
        }
      }
    }
  //Smooth out the movement
    b.x = lerp(b.x, b.baseX, 0.04);
    b.y = lerp(b.y, b.baseY, 0.04);
  }



  drawColoredString();

  
  for (let b of beads) {
    push();
    translate(b.x, b.y);
    drawSingleBead(b);
    pop();
  }

  //Show fingertips
  for (let finger of indexFingers) {
    noStroke();
    fill(0, 255, 200);
    circle(finger.x, finger.y, 24);
    fill(255, 255, 255, 180);
    circle(finger.x, finger.y, 10);
  }

  }

  //Draw the string and beads
function drawColoredString() {
  strokeWeight(3.5);
  for (let j = 0; j < 5; j++) {
    let clr = (j % 2 === 0) ? color(200, 40, 20) : color(220, 180, 20);
    stroke(clr);
    noFill();
    beginShape();
    for (let b of beads) {
      vertex(b.x, b.y + (j - 2) * 0.3);
    }
    endShape();
  }
}

function drawSingleBead(b) {
  noStroke();
  fill(b.color[0], b.color[1], b.color[2]);
  if (b.type === 'oval' || b.type === 'round') {
    ellipse(0, 0, b.sizeW, b.sizeH);
  } else if (b.type === 'cylinder' || b.type === 'eye' || b.type === 'square') {
    rectMode(CENTER);
    rect(0, 0, b.sizeW, b.sizeH, 12);
  } else {
    ellipse(0, 0, b.sizeW, b.sizeH);
  }
  noFill();
  stroke(255, 255, 255, 40);
  strokeWeight(2);
  ellipse(0, 0, b.sizeW + 2, b.sizeH + 2);
}

function gotHands(results) {
  hands = results;
}

//Use Web Audio APL, instead of p5.sound library
function playTone(freq) {
  if (!audioCtx) return;
  let osc = audioCtx.createOscillator();
  let gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.6);
}