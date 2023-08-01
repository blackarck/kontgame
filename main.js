console.log("Main program starting");
document.addEventListener("DOMContentLoaded", function () {
  //initialize kontra
  let { canvas, context } = kontra.init();
  let { init, Sprite, GameLoop, initKeys, keyPressed } = kontra;

  initKeys();

  let snakeBod = 3; // initial length of snake body
  let snakefull = []; // array to hold the snake body
  let dirx=0;
  let diry=0;
  //generate the snake body

  for (let i = snakeBod - 1; i >= 0; i--) {
    let sprite = Sprite({
      x: 20*i + 2*i, // starting x,y position of the sprite
      y: 20,
      color: generateRandomColor(), // fill color of the sprite rectangle
      width: 20, // width and height of the sprite rectangle
      height: 20,
      dx:  2, // move the sprite 2px to the right every frame
      
    });
    snakefull.push(sprite);
  }
  console.log("Snakefull length "+snakefull.length);
  let loop = GameLoop({
    // create the main game loop
    update: function () {
      // update the game state
      if (keyPressed("arrowleft")) {
        // move left
        //console.log("Moving left");
        dirx=-2;
        diry=0;
      }
      if (keyPressed("arrowright")) {
        // move left
       // console.log("Moving right");
        dirx=2;
        diry=0;
      }
      if (keyPressed("arrowup")) {
        // move left
        //console.log("Moving up");
        dirx=0;
        diry=-2;
      }
      if (keyPressed("arrowdown")) {
        // move left
        //console.log("Moving down");
        dirx=0;
        diry=2;
      }
      if( Math.abs(dirx) > 0 || Math.abs(diry) > 0){
        snakefull[snakefull.length-1].dx = dirx;
        snakefull[snakefull.length-1].dy = diry;
      }

      //swap tail
        let tempsprite = snakefull[snakefull.length-1];
        for (let i = snakeBod - 1; i-1 >= 0; i--) {
          snakefull[i].x = snakefull[i-1].x;
          snakefull[i].y = snakefull[i-1].y;
         
        }
        snakefull[0].x=tempsprite.x;
        snakefull[0].y=tempsprite.y;
      // console.log("Dirx-"+dirx+", diry-"+diry);
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
        if (snakefull[i].y <0) {
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


 
function generateRandomColor() {
  // Generate random values for RGB components (0 to 255)
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  // Combine RGB values into a CSS color string
  var color = "rgb(" + red + "," + green + "," + blue + ")";

  return color;
}
