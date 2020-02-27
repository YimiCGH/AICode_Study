var vehicles = [];


function setup() {
  createCanvas(600,400);

  for (var i = 0; i < 1; i++) {
    vehicles[i] = new Vehicle(random(200,500),random(200,300));
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
  for (var i = 0; i < vehicles.length; i++) {
    //vehicles[i].seek(createVector( mouseX,mouseY));
    vehicles[i].arrive(createVector( mouseX,mouseY));
    vehicles[i].update();
    vehicles[i].display();


  }

  
}
