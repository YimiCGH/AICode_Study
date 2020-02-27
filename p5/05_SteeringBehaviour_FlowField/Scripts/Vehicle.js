function Vehicle(_x,_y){
  this.location = createVector(_x,_y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);

  this.r = 3;
  this.maxSpeed = 4;
  this.maxForce = 0.1;
}
Vehicle.prototype.run = function(){
  this.update();
  this.borders();
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

Vehicle.prototype.display = function(){
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

Vehicle.prototype.follow = function(_flowfield){
  var desired = _flowfield.lookup(this.location).copy();

  desired.normalize();
  desired.mult(this.maxSpeed);

  var steer = desired.sub(this.velocity);
  steer.limit(this.maxForce);

  this.applyForce(steer);
}
