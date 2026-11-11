let faceMesh;
let handPose;
let video;
let threshold = 100;
let mthreshold = 80;

let faces = [];
let hands = [];

let options = { 
  maxFaces: 1, 
  maxHands: 2, 
};

let tears = [];
let happyFaces = [];

async function setup() {
  createCanvas(800, 600);
  
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();
  
  faceMesh = await ml5.faceMesh(options);
  handPose = await ml5.handPose(options);
  
  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);
}

function gotFaces(results) {
  faces = results;
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0, width, height);

  if (faces.length > 0) {
    // simplified version of faces[0]
    let face = faces[0];

    // keypoints for the ends of eyes
    let leftEye = face.keypoints[33]; 
    let rightEye = face.keypoints[263]; 

    // keypoints for the lips and nose
    let leftMouth = face.keypoints[61];
    let rightMouth = face.keypoints[291];
    //let nose = face.keypoints[1];

    if (leftEye && rightEye) {
      let isLeftClose = false;
      let isRightClose = false;
      let isHappy = false;

      if (hands.length > 0) {
        let knuckles = [5, 9, 13, 17];

        for (let h = 0; h < hands.length; h++) {
          let hand = hands[h];

          for (let idx of knuckles) {
            let kPoint = hand.keypoints[idx];
            if (kPoint) {
              // check the distance between left eye and knuckle, right eye and knuckle, 
              // if the distance is smaller than the threshold, then tears drop
              let dLeft = dist(leftEye.x, leftEye.y, kPoint.x, kPoint.y);
              let dRight = dist(rightEye.x, rightEye.y, kPoint.x, kPoint.y);

              if (dLeft < threshold) isLeftClose = true;
              if (dRight < threshold) isRightClose = true;
            }
          }
        }
      }

      // when smiling, the distance between left and right mouth end increases,
      //if the distance is larger than the threshold, then pop happy faces
      let mouthWidth = dist(leftMouth.x, leftMouth.y, rightMouth.x, rightMouth.y);
      if (mouthWidth > mthreshold) {
        isHappy = true;
      }

  
      // the velocity of tears and happy faces

      // tears drop from the end of eyes
      if (isLeftClose) {
        tears.push({
          x: leftEye.x + random(-5, 5),
          y: leftEye.y,
          vy: random(2, 5)
        });
      }
      
      if (isRightClose) {
        tears.push({
          x: rightEye.x + random(-5, 5),
          y: rightEye.y,
          vy: random(2, 5)
        });
      }

//pop from the bottom
      if (isHappy) {
        happyFaces.push({
          x: random(width),
          y: height + 20, 
          size: random(20, 50),
          vy: random(-2, -5)
        });
      }

      // tears drop
      textSize(24);
      textAlign(CENTER, CENTER);
      for (let i = tears.length - 1; i >= 0; i--) {
        let t = tears[i];
        text("💧", t.x, t.y);
        
        t.y += t.vy;        
        
        // disapear once they're out of the canvas 
        if (t.y > height) {
          tears.splice(i, 1);
        }
      }
      // happy faces pop 
      for (let i = happyFaces.length - 1; i >= 0; i--) {
        let he = happyFaces[i];
        textSize(he.size);
        text("😃", he.x, he.y);
        
        he.y += he.vy; 
        // disapear once they're out of the canvas 
        if (he.y < -50) {
          happyFaces.splice(i, 1);
        }
      }

      // track the position of eyes
      // fill(255, 0, 0);
      // noStroke();
      // ellipse(leftEye.x, leftEye.y, 10, 10);
      // ellipse(rightEye.x, rightEye.y, 10, 10);
    }
  }

  // track the positions     
  // if (hands.length > 0) {
  //   let knuckles = [5, 9, 13, 17];
  //   for (let h = 0; h < hands.length; h++) {
  //     let hand = hands[h];
  //     for (let idx of knuckles) {
  //       let kp = hand.keypoints[idx];
  //       if (kp) {
  //         fill(0, 255, 0);
  //         noStroke();
  //         ellipse(kp.x, kp.y, 12, 12);
  //       }
  //     }
  //   }
  // }
}