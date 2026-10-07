//function setup(){
  //  createCanvas(width, height, renderer);

//}

//Local time on the computuer
//millis(): track the time after running the code， the sketch start
//frameCount(): localized time to sketch, not global

//

//function draw(){
 //   background(0);s = second();
//m = minute();
//h = hour();
  //  text ('hour:' + h + 'minute:' + m + 'second' + s);
//}

//Arrat
//let names = ['name1','name2'];
//names.length return with the number of names

//names[17] = add value to the array
//names.pop = remove the last of the array
//names.push = add to the last of the array

//pre populate





function setup() {
  createCanvas(400, 400);}


function draw() {
  background(255);
  s = second();
m = minute();
h = hour();
  //text('hi', width/2, height/2);
  //rectmode(CENTER);
  text ('hour: ' + h + ' minute: ' + m + ' second: ' + s, width/2, height/2);
}
