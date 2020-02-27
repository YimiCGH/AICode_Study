var vehicles = [];
var targetPos = {x:0,y:0};
function setup() {
  createCanvas(800,600);
  targetPos = {x:400,y:300};
  for (var i = 0; i < 8; i++) {
    vehicles[i] = new Vehicle(random(200,500),random(200,300));
  }
}

function draw() {
  background(0);
  if(mouseIsPressed){
    console.log('123');
    targetPos.x = mouseX;
    targetPos.y = mouseY;
    for (var i = 0; i < vehicles.length; i++) {
      vehicles[i].isArrive = false;
    }
  }
  // Draw an ellipse at the mouse position
  fill(200);
  stroke(0);
  strokeWeight(2);
  ellipse(targetPos.x, targetPos.y, 48, 48);

  // Call the appropriate steering behaviors for our agents
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].update();
  }

}

function mouseClicked(){


}
