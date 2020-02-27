var G_Vehicles = [];
var walls = [];
function setup() {
  createCanvas(600,400);

  for (var i = 0; i < 1; i++) {
    G_Vehicles[i] = new Vehicle(random(200,500),random(200,300));
  }

  for (var i = 0; i < 1; i++) {
    var w = random(30,200);
    var h = random(30,200);
    var x = random(0 + w,width - w);
    var y = random(0 + h,height - h);

    walls[i] = new Wall(x,y ,w,h);
  }
}

function draw() {
  background(200);

  // Draw an ellipse at the mouse position
  fill(200);
  stroke(0);
  strokeWeight(2);
  ellipse(mouseX, mouseY, 48, 48);

  // Call the appropriate steering behaviors for our agents
  for (var i = 0; i < G_Vehicles.length; i++) {
    G_Vehicles[i].update();
    G_Vehicles[i].display();
  }
  for (var i = 0; i < walls.length; i++) {
    walls[i].Display();
  }
}
