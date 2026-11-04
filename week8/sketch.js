let cam; 
let cnv;
let threshold = 173;
let colorPicker1;
let colorPicker2;
let button;

async function setup() {
  //change the aspect ratio
  cnv = createCanvas(800, 600);
  cnv.position(0,50 );
  pixelDensity(0.8);
  // load a video
  //capture a video stream from the webcam, and store it int VIDEO
  cam = await createCapture(VIDEO);
  cam.size(800, 600);
  cam.hide();

//Create a button to save the image
  button = createButton('Save Image');
  button.position(10, 10);
  button.mousePressed(saveImage); 

//Add pickers to choose the color and set initial value
  colorPicker1 = createColorPicker('#8b4513');
  colorPicker1.position(110, 10);

  colorPicker2 = createColorPicker('#1e90ff');
  colorPicker2.position(175, 10);
}

//If you like it, you save it as a jpg file
function saveImage(){
  save(cnv,'Selfie.jpg');
}



function draw() {
  background(255);
 
  // get a copy of the camera image 
  // adnd make it into grayscle with built-in filter
  //https://p5js.org/reference/p5/filter/
  let img = cam.get();
  //img1.filter(GRAY);

  img.loadPixels();

  blendMode(MULTIPLY);

  //let img2 = img1.get();
  //Again with the filter, to get a more definite black and white value
  //img2.filter(THRESHOLD, 0.4);
   //img2.loadPixels();

  //Two layers of halftone
  halftone(img,colorPicker1.color(),0,0,1);
  halftone(img,colorPicker2.color(),5,5,0.85);

  blendMode(BLEND);
  }

  function halftone(img, dotColor, offsetX, offsetY,scaleSize) {
 
  fill(dotColor);

  for (let y = 0; y < img.height; y += 6) {
    for (let x = 0; x < img.width; x += 6) {
      let i = (y * img.width + x) * 4;  
      let r = img.pixels[i + 0];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];

    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      let darkness = (255 - brightness) / 255;
      let radius = 5* darkness * scaleSize;
      
      if (radius > 0.5) {
        ellipse(x + offsetX, y + offsetY, radius, radius);
  }
  }
  }

}

  



//**green screen effect can be implemented here by checking for green pixels and making them transparent