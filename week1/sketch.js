// change the quotes in this array. Be mindful of the quotation marks!
// this is the only part of the file you need to edit!

const quotes = [
  { text: "a process, based on exploration, iteration, reflection and discovery.", source: "Tim Rodenbröker" },
  { text: "a new interdisciplinary art form that bridges the gap between technologists and artists.", source: "Ahmad Moussa" },
  { text: "the practice of making art with code.", source: "Andrew Bryant" },
  { text: "used to describe a wide range of artistic practices that use computer code as a medium.", source: "Raphaël de Courville" },
  { text: "about experimentation, not functionality.", source: "Maura Kelly" },
  { text: "the practice of using programming and coding techniques to create visual, auditory or interactive artworks.", source: "Lily from Tabicoding.com" },
  { text: "a specialty that utilizes code and programming to create more expressive, designed, and custom web designs", source: "Michale Barsky" },
  { text: "how you can mix surprises with control.", source: "Rebecca - The Hobby Hopper" }
];
// no need to edit anything below this line! 
// if you have made an error, you can check your history to see what might have gone wrong

// a variable that holds the current quote
let current = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Seed with millis() so each page load gives a different quote.
  randomSeed(millis());
  textSize(24);
  fill(250, 250, 250);
  // calls the function to pick a quote
  pickQuote();
}

function pickQuote() {
  // take a random number and use that to identify what quote to use
  current = quotes[floor(random(quotes.length))];
}

function draw() {
  background(112, 43, 157); // set the background color
  drawQuote();  // draw the quote on screen
}

function drawQuote() {   // draw text
  textAlign(CENTER, CENTER);
  text("Creative Coding is.....", width / 2, height / 2 - 48);
  textStyle(BOLD);
  text("'" + current.text + "'", width / 2, height / 2);
  textAlign(RIGHT, CENTER);
  text("-" + current.source, width - 100, height - 100);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function newQuote() {
  pickQuote();
  redraw();
}

function mousePressed() {
  newQuote();
}
