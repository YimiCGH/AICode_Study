var vehicles = [];
var flowfield;
var debug = true;



function setup() {
  // height = 360;
  // width = 640;
  createCanvas(640,360);
  flowfield = new FlowField(20);
  for (var i = 0; i < 4; i++) {
    vehicles[i] = new Vehicle(random(width),random(height));
  }
}

function draw() {
  background(120);

  if (debug) flowfield.display();

  // Call the appropriate steering behaviors for our agents
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }

  //fill(0);
  //text("Hit space bar to toggle debugging lines.\nClick the mouse to generate a new flow field.",10,height-20);
}
function mouseDragged(){
  var v = new Vehicle(mouseX,mouseY);
  vehicles.push(v);
}

function keyPressed(){
  if(key == ' '){
    debug = !debug;
    console.log(`show = ${debug} ,key = ${key}`);
  }

  if(keyCode == ENTER){
    console.log("update map");
    flowfield.updateMap();
  }
}
