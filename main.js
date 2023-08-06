/*
Snake Game Movement
by Vivek Sharma

blackarck@gmail.com

Libs used: 
-Kontra 
 
Thanks for checking out
 

 
=======================================================
INIT KONTRA ENGINE
=======================================================
*/
console.log("Main program starting");
document.addEventListener("DOMContentLoaded", function () {
  //initialize kontra
  let { canvas, context } = kontra.init();
  let { init, Sprite, GameLoop, initKeys, keyPressed } = kontra;

  initKeys();

  /* 
=======================================================
ONE TIME VAR INITIALIZATION
=======================================================
*/
  let snakeBod = 6; // initial length of snake body
  let snakefull = []; // array to hold the snake body
  let dirx = 0;
  let diry = 0;
  let grid = 15;
  //generate the snake body


  for (let i = snakeBod - 1; i >= 0; i--) {
    let sprite = Sprite({
      x: 15 * i + 2 * i, // starting x,y position of the sprite
      y: 15,
      color: generateRandomColor(), // random color to understand what is going on
      width: grid, // width and height of the sprite rectangle
      height: grid,
    });
    snakefull.push(sprite);
  }

  /* 
=======================================================
MAIN GAME OBJECT
=======================================================
*/
  let loop = GameLoop({
    fps: 15,
    // create the main game loop
    update: function () {
      // update the game state
      if (keyPressed("arrowleft")) {
        // move left
        //console.log("Moving left");
        dirx = -grid;
        diry = 0;
      }
      if (keyPressed("arrowright")) {
        // move left
        // console.log("Moving right");
        dirx = grid;
        diry = 0;
      }
      if (keyPressed("arrowup")) {
        // move left
        //console.log("Moving up");
        dirx = 0;
        diry = -grid;
      }
      if (keyPressed("arrowdown")) {
        // move left
        //console.log("Moving down");
        dirx = 0;
        diry = grid;
      }

      // snake movement , move only head and transfer position
      // to previous boxes for a pixel like movement

      if (Math.abs(dirx) > 0 || Math.abs(diry) > 0) {
        //move the tail to front depending on which direction we are
        //moving
        snakefull[snakefull.length - 1].x = snakefull[0].x + dirx;
        snakefull[snakefull.length - 1].y = snakefull[0].y + diry;

        //mark tail as head
        headsprite = snakefull[0];
        snakefull[0] = snakefull[snakefull.length - 1];

        for (let i = snakefull.length - 1; i > 1; i--) {
          //transfer pos to previous box
          snakefull[i] = snakefull[i - 1];
        }
        snakefull[1] = headsprite;
      }

      for (let i = snakeBod - 1; i >= 0; i--) {
        snakefull[i].update();
      }

      // wrap the sprites position when it reaches
      // the edge of the screen
      for (let i = snakeBod - 1; i >= 0; i--) {
        if (snakefull[i].x > canvas.width) {
          snakefull[i].x = 0;
        } //end of if
        if (snakefull[i].x < 0) {
          snakefull[i].x = canvas.width;
        } //end of if
        if (snakefull[i].y > canvas.height) {
          snakefull[i].y = 0;
        } //end of if
        if (snakefull[i].y < 0) {
          snakefull[i].y = canvas.height;
        } //end of if
      } //end of for
    }, //end of update function
    render: function () {
      // render the game state
      for (let i = snakeBod - 1; i >= 0; i--) {
        snakefull[i].render();
      }
    },
  });
  loop.start(); // start the game
});

/* 
=======================================================
Helper functions 
=======================================================
*/

function generateRandomColor() {
  // Generate random values for RGB components (0 to 255)
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);
  // Combine RGB values into a CSS color string
  var color = "rgb(" + red + "," + green + "," + blue + ")";
  return color;
}
