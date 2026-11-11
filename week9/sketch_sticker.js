
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipHorizontal: false };
let skull;

//function preload() {
 // skull = loadImage('images/mask.png');
//}

async function setup() {
  createCanvas(800, 600);

  
  
  // Load the faceMesh model asynchronously
  faceMesh = await ml5.faceMesh(options);
  
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(800,600);
  video.hide();
  
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);

}

function gotFaces(results) {
  faces = results;
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);
fill(255, 255, 0);
  textSize(24);
  text("Face detected: " + faces.length, 30, 50);

  if(faces.length == 1) {
 
 // Get the three points of T shape 
let leftEye = faces[0].keypoints[33];   
    let rightEye = faces[0].keypoints[263]; 
    let noseTip = faces[0].keypoints[1];

  // If the three points is detected, then count the center point 
  if (leftEye && rightEye && noseTip) {
      let cx = (leftEye.x + rightEye.x) / 2;
      let cy = (leftEye.y + rightEye.y) / 2;


//get the distance between two eyes to change the size of the mask
let d = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
      let maskSize = d * 3.5;
 
      //atan2(): calculate the angle formedby a point, the origin, and the positive x-axis.
let angle = atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);      

//push();
      //translate(cx, cy);     
      //rotate(angle);          
     // imageMode(CENTER);
   // if (skull && skull.width > 0) {
      //  image(skull, 0, 0, maskSize, maskSize * (skull.height / skull.width));
      //}
      
//pop();
}
}
}


function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
  // console.log(faces);
}