let rayCount = 12;
let rayRadius = 1500;

function setup(){
    createCanvas(1000,1000);
    //noLoop();
    }

function draw() {
  background('lightpink');
//Move the canvas to the center and rotate.
push()
translate(500,500);
rotate(mouseX/500); 

//Draw the rays.
for (let i = 0; i < rayCount; i+= 1){

  stroke(0);
  strokeWeight(10);
  fill('yellow');
  //TWO_PI = an entire crcle /    
  let angle = TWO_PI/rayCount;  
  arc(0, 0, rayRadius, rayRadius, i * angle, i * angle + angle / 2,PIE);
}
 pop();

push();
strokeWeight(15);
fill(255,0,0);
ellipse(500,500,300);
pop();

  }






