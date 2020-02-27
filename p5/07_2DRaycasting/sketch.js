let walls = [];

let particle;
function setup() {
  // put setup code here
  createCanvas(400,400);
  for (var i = 0; i < 5; i++) {
    let x1 = random(width);
    let y1 = random(width);
    let x2 = random(width);
    let y2 = random(width);

    walls[i] = new Boundary(x1,y1,x2,y2);
  }

  walls.push(new Boundary(0,0,width,0));
  walls.push(new Boundary(width,0,width,height));
  walls.push(new Boundary(width,height,0,height));
  walls.push(new Boundary(0,height,0,0));


  particle = new Particle(width / 2,height / 2);
}

function draw() {
  background(0);
  // put drawing code here



  particle.update(mouseX,mouseY);
  particle.show();

  for (var wall of walls) {
    wall.show();
  }
  particle.look(walls);
}
