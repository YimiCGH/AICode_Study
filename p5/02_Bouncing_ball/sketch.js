var screen = {
  width : 600,
  height : 400
};
let bubble ;

function setup() {
  // put setup code here
  createCanvas(screen.width,screen.height);

  bubble = new Bubble(50,50,24,3,2);
}

function draw() {
  background(0);
  bubble.move();
  bubble.bounce(screen.width,screen.height);
  bubble.show();
}
