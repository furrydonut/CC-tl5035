My first attempt is to create a sticker of a hero mask from my favorite kpop boy band. I assumed I could upload an PNG image of the mask onto the UV map of a face, aligning with the right points,and then it will move as the face moves. Then I looked into the 3D face mesh, and if I want the mask to match the face seamlessly across all angles, then I need to use UV mapping. Otherwise, 2d image on face mesh will do.

But the image was never loaded. 



My second idea is to create a sketch where a happy and a sad face could each trigger something. And emoji is probably the most strightforward way to show happiness and sadness. But I find it really hard for the face mesh to detect sad face because you can only bend your mouth to an extent:( So instead I use hand gesture, making two fists around the eye area to trigger sad emojis. 


https://www.youtube.com/watch?v=R5UZsIwPbJA&t=31s

# 01_loading_images

## Getting Started

Open `index.html` in your web browser and start editing `sketch.js`.

## Running Locally

For projects with media files, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click index.html -> "Open with Live Server"
```

## Resources

- [p5.js 2.0](https://beta.p5js.org/)
- [p5.js Reference](https://p5js.org/reference/)
