let faceMesh;
let handPose;
let video;

let faces = [];
let hands = [];

// 模型配置选项
let options = { 
  maxFaces: 1, 
  maxHands: 2, 
  refineLandmarks: false, 
  flipHorizontal: false 
};

function preload() {
  // 可以加载你的面具图片或其他资源
}

async function setup() {
  createCanvas(800, 600);
  
  // 1. 创建共享的摄像头视频
  video = createCapture(VIDEO);
  video.size(800, 600);
  video.hide();
  
  // 2. 同时异步加载两个模型
  faceMesh = await ml5.faceMesh(options);
  handPose = await ml5.handPose(options);
  
  // 3. 分别开启两者的实时检测
  faceMesh.detectStart(video, gotFaces);
  handPose.detectStart(video, gotHands);
}

// 人脸检测回调
function gotFaces(results) {
  faces = results;
}

// 手部检测回调
function gotHands(results) {
  hands = results;
}

function draw() {
  // 渲染视频背景
  image(video, 0, 0, width, height);

  // 1. 绘制人脸相关逻辑（比如贴面具）
  if (faces.length > 0) {
    let face = faces[0];
    let nose = face.keypoints[1];
    
    // 简单的圆形标记鼻子位置
    fill(255, 0, 0);
    noStroke();
    ellipse(nose.x, nose.y, 15, 15);
  }

  // 2. 绘制手部相关逻辑（比如追踪手指尖）
  if (hands.length > 0) {
    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      // 获取食指指尖坐标 (索引 8)
      let indexFinger = hand.keypoints[8];
      
      fill(0, 255, 0);
      noStroke();
      ellipse(indexFinger.x, indexFinger.y, 20, 20);
    }
  }

  // UI 状态提示
  fill(255, 255, 0);
  textSize(18);
  text("Faces detected: " + faces.length, 30, 40);
  text("Hands detected: " + hands.length, 30, 70);
}