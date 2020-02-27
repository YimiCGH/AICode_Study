function Vehicle(_x,_y){
  this.location = createVector(_x,_y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);

  this.r = 3;
  this.maxSpeed = 2;
  this.maxForce = 0.1;

  this.state = new VehicleState(this);
}
Vehicle.prototype.run = function(){
  // this.follow(G_FlowField);
  // this.update();
  // this.borders();
  //
  this.state.Move();
  this.display();
}
Vehicle.prototype.update = function (){
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.location.add(this.velocity);
  this.acceleration.mult(0);
}
// Wraparound
Vehicle.prototype.borders = function() {
  if (this.location.x < -this.r) this.location.x = width+this.r;
  if (this.location.y < -this.r) this.location.y = height+this.r;
  if (this.location.x > width+this.r) this.location.x = -this.r;
  if (this.location.y > height+this.r) this.location.y = -this.r;
}

Vehicle.prototype.applyForce = function(_force){
  this.acceleration.add(_force);
}

Vehicle.prototype.follow = function(_flowfield){
  var desired = _flowfield.lookup(this.location).copy();

  desired.normalize();
  desired.mult(this.maxSpeed);

  var steer = desired.sub(this.velocity);
  steer.limit(this.maxForce);

  return steer;
}
Vehicle.prototype.FlowFieldArrive = function(_flowfield){

  var desired = _flowfield.lookup(this.location).copy();
  desired.normalize();
  var targetPos = G_TargetPoint.copy().add(0.5,0.5).mult(resolution);
  var distance = targetPos.sub(this.location).mag();

  if(distance < 100){
    var m = map(distance,0,100,0,this.maxSpeed);
    desired.setMag(m);
  }else{

    desired.setMag(this.maxSpeed);
  }

  var steer = desired.sub(this.velocity);
  steer.limit(this.maxForce);
  return steer;
}
Vehicle.prototype.separate = function(_vehicles){

  var desiredseparation = this.r * 5;
  circle(this.location.x,this.location.y,desiredseparation);
  var sum = new createVector(0,0);
  var num = 0;
  for (var i = 0; i < _vehicles.length;i++ ) {
    var other = _vehicles[i];
    var d = dist(this.location.x,this.location.y,other.location.x,other.location.y);
    if (d > 0 && d < desiredseparation) {
      var force = p5.Vector.sub(this.location,other.location);
      force.normalize();
      force.div(d);
      sum.sub(force);
      num++;
    }
  }

  if(num > 0){
    sum.div(num);
    sum.normalize();
    sum.mult(this.maxSpeed);

    sum.sub(this.velocity);
    sum.limit(this.maxForce);
  }
  return sum;
}

Vehicle.prototype.display = function(){
  this.borders();

  var theta = this.velocity.heading() + radians(90);
  fill(127);
  stroke(0);
  strokeWeight(1);

  push();
  translate(this.location.x,this.location.y);
  rotate(theta);
  beginShape(TRIANGLES);
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  pop();
}
