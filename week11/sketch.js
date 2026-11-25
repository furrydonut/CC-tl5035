
//https://openlibrary.org/developers/api
//Call Open Library to find books for Agatha Christie
const SEARCH_URL =
  "https://openlibrary.org/search.json?author=Agatha+Christie&fields=title,first_publish_year,number_of_pages_median,edition_count,subject,cover_i&limit=200";

//Limit the year from 1930 to 1976, only give 27 books in publication year and popularity
const START_YEAR = 1930;
const END_YEAR = 1976;
const MAX_BOOKS = 27;

let shelfItems = [];
let hoveredItem 
let selectedBook 
let selectedCover 
let statusText = "Loading...";

const SHELF_BOTTOM = 365;
const DETAIL_TOP = 400;

function setup() {
  createCanvas(1100, 625);
  textFont("Georgia");
  //Hide the cursor and replace with magnifying glass
  noCursor();
  loadBooks();
}

async function loadBooks() {
  try {
    const res = await loadJSON(SEARCH_URL);
//Check to see if docs ie empty or not
    let docs;
if (res && Array.isArray(res.docs)) {
  docs = res.docs;
} else {
  docs = [];
}
//Only pick 27 books, and put a sign each 10 years
    const books = pickTopPopularBooksByYear(docs, MAX_BOOKS);
    shelfItems = buildShelfWithDecadeBooks(books);
    layoutShelf(shelfItems);
    statusText = `Top ${books.length} popular books (${START_YEAR}–${END_YEAR}), sorted by year`;
  } catch (e) {
    statusText = "Failed to load data";
  }
}


//Put a filter on the items 
function pickTopPopularBooksByYear(docs, limitCount) {
  return docs
    .filter((d) => {
      const y = d?.first_publish_year;
      return d?.title && typeof y === "number" && y >= START_YEAR && y <= END_YEAR;
    })
    //Organize the data 
    .map((d) => ({
      kind: "book",
      title: d.title.trim(),
      year: d.first_publish_year,
      pages: d.number_of_pages_median > 30 ? d.number_of_pages_median : 220,
      pop: d.edition_count > 0 ? d.edition_count : 1,
      subjects: d.subject?.slice(0, 5) || [],
      coverId: d.cover_i || null,
    }))
    //Find the most popluar ones and arrange them in order
    .sort((a, b) => b.pop - a.pop)
    .slice(0, limitCount)
    .sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
}

//Divide the year of the books into decade
function buildShelfWithDecadeBooks(books) {
  const items = [];
  let currentDecade

  for (const b of books) {
    const decade = `${Math.floor(b.year / 10) * 10}s`;
    if (decade !== currentDecade) {
      currentDecade = decade;
      items.push({
        kind: "decadeBook",
        label: decade,
        x: 0,
        y: 0,
        w: 30,
        h: 222,
      });
    }
    items.push(b);
  }

  return items;
}

//Calculate the width and height of the book on the shelves
function layoutShelf(items) {
  let x = 42;

  for (const item of items) {
    const isDecade = item.kind === "decadeBook";
    item.w = isDecade ? 30 : constrain(map(item.pages, 100, 420, 20, 36), 20, 36);
    item.h = isDecade ? 222 : 202;
    item.x = x;
    item.y = SHELF_BOTTOM - item.h;
    x += item.w + 4;
  }
}

//Draw the background and shelf
//If the book is selected / mouse pressed, the book will be lifted a bit
//And the information box is shown below
function draw() {
  background("#EFEAE1");
  hoveredItem = null;

  fill("#231F1C");
  noStroke();
  textSize(20);
  textAlign(LEFT, TOP);
  text("Agatha Christie Shelf", 42, 22);

  fill("#685E54");
  textSize(12);
  text(statusText, 42, 50);

  fill("#8C6239");
  rect(24, SHELF_BOTTOM, width - 48, 12);

  for (const item of shelfItems) {
    const isHover =
      mouseX >= item.x &&
      mouseX <= item.x + item.w &&
      mouseY >= item.y &&
      mouseY <= SHELF_BOTTOM;
    if (isHover && !hoveredItem) hoveredItem = item;

    const isSelected = item.kind === "book" && selectedBook === item;
    const lift = isHover || isSelected ? 10 : 0;

    push();
    translate(item.x, item.y - lift);

    if (item.kind === "decadeBook") {
      drawDecadeBook(item, isHover);
    } else {
      drawNovelSpine(item, isHover, isSelected);
    }

    pop();
  }

  drawDetailBox();
  drawMagnifier(mouseX, mouseY, Boolean(hoveredItem));
}

//Draw the divider with decade 
function drawDecadeBook(item, isHover) {
  fill(isHover ? "#B58938" : "#C99E48");
  stroke("#231F1C");
  strokeWeight(isHover ? 1.5 : 1);
  rect(0, 0, item.w, item.h, 2);

  noStroke();
  fill("#231F1C");
  textAlign(CENTER, CENTER);
  textSize(10);

  push();
  translate(item.w / 2, item.h / 2);
  rotate(-HALF_PI);
  text(item.label, 0, 0);
  pop();
}

//Draw the book spines
function drawNovelSpine(book, isHover, isSelected) {
  fill(isSelected ? "#9E2A2B" : isHover ? "#4B647A" : "#3B4A5A");
  stroke("#231F1C");
  strokeWeight(isHover || isSelected ? 1.5 : 1);
  rect(0, 0, book.w, book.h, 2);

  noStroke();
  fill("#FBF6EE");
  textAlign(CENTER, CENTER);
  textSize(10);

  const shortTitle = book.title.length > 22 ? book.title.slice(0, 20) + "…" : book.title;
  push();
  translate(book.w / 2, book.h / 2);
  rotate(-HALF_PI);
  text(shortTitle, 0, 0);
  pop();
}

//Draw the information box
function drawDetailBox() {
  fill("#F8F4EC");
  stroke("#D8CFC0");
  strokeWeight(1);
  rect(24, DETAIL_TOP, width - 48, height - DETAIL_TOP - 20, 4);

  if (!selectedBook) {
    noStroke();
    fill("#685E54");
    textAlign(LEFT, CENTER);
    textSize(13);
    text("Hover with the magnifier; click a book spine to inspect.", 42, DETAIL_TOP + 92);
    return;
  }

  const imgX = 40;
  const imgY = DETAIL_TOP + 16;
  const imgW = 92;
  const imgH = 142;

  if (selectedCover) {
    image(selectedCover, imgX, imgY, imgW, imgH);
  } else {
    noStroke();
    fill("#3B4A5A");
    rect(imgX, imgY, imgW, imgH, 2);
    fill("#FBF6EE");
    textAlign(LEFT, TOP);
    textSize(11);
    text(selectedBook.title, imgX + 8, imgY + 12, imgW - 16, imgH - 24);
  }

  const textX = imgX + imgW + 20;
  noStroke();
  fill("#231F1C");
  textAlign(LEFT, TOP);
  textSize(18);
  text(selectedBook.title, textX, imgY + 4);

  fill("#554C43");
  textSize(12);
  text(
    `First Published: ${selectedBook.year}  |  Pages: ${selectedBook.pages}`,
    textX,
    imgY + 34
  );

  fill("#746A60");
  const subj = selectedBook.subjects.length ? selectedBook.subjects.join(", ") : "None";
  text(`Subjects: ${subj}`, textX, imgY + 58, width - textX - 40, 60);
}


//Draw the magnifying glass cursor
function drawMagnifier(mx, my, active) {
  if (mx < 0 || my < 0 || mx > width || my > height) return;
  const r = active ? 15 : 13;

  push();
  translate(mx, my);

  stroke("#4A2E1B");
  strokeWeight(5);
  strokeCap(ROUND);
  line(r * 0.72, r * 0.72, r * 1.65, r * 1.65);

  noStroke();
  fill(active ? "rgba(255, 245, 195, 0.35)" : "rgba(255, 255, 255, 0.22)");
  circle(0, 0, r * 2);

  stroke("#231F1C");
  strokeWeight(2.5);
  noFill();
  circle(0, 0, r * 2);

  stroke("rgba(255, 255, 255, 0.7)");
  strokeWeight(1.5);
  line(-r * 0.45, -r * 0.2, -r * 0.1, -r * 0.55);

  pop();
}

//
async function mousePressed() {
  //Go over all the shelfItems, if it's book then continue
  for (const item of shelfItems) {
    if (item.kind !== "book") continue;
    //Check the mouse position with books and shelf
    const hit =
      mouseX >= item.x &&
      mouseX <= item.x + item.w &&
      mouseY >= item.y &&
      mouseY <= SHELF_BOTTOM;
//Re move the old images
    if (hit) {
      selectedBook = item;
      selectedCover = null;
      if (item.coverId) {
        try {
    //Load cover image from in M-size Open Library API
    //https://openlibrary.org/dev/docs/api/covers
          selectedCover = await loadImage(
            `https://covers.openlibrary.org/b/id/${item.coverId}-M.jpg`
          );
        } catch (e) {
          selectedCover = null;
        }
      }
      break;
    }
  }
}