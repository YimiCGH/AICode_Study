function Vehicle(_x,_y){
  this.location = createVector(_x,_y);
  this.velocity = createVector(0,-2);
  this.acceleration = createVector(0,0);

  this.r = 6;
  this.maxSpeed = 4;
  this.maxForce = 0.1;
}

Vehicle.prototype.update = function (){
  this.velocity.add(this.acceleration);
  this.velocity.limit(this.maxSpeed);
  this.location.add(this.velocity);
  this.acceleration.mult(0);
}

Vehicle.prototype.applyForce = function(_force){
  this.acceleration.add(_force);
}



Vehicle.prototype.display = function(){
  var theta = this.velocity.heading() + PI / 2;
  fill(127);
  stroke(0);
  strokeWeight(1);

  push();
  translate(this.location.x,this.location.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  pop();
}

Vehicle.prototype.seek = function(_targetPos){
  var desired = _targetPos.sub(this.location);

  desired.normalize();
  desired.mult(this.maxSpeed);

  var steer = desired.sub(this.velocity);
  steer.limit(this.maxForce);

  this.applyForce(steer);
}

Vehicle.prototype.arrive = function(_targetPos){
  var desired = _targetPos.sub(this.location);

  var distance = desired.mag();

  if(distance < 100){
    var m = map(distance,0,100,0,this.maxSpeed);
    desired.setMag(m);
  }else{
    desired.setMag(this.maxSpeed);
  }

  var steer = desired.sub(this.velocity);
  steer.limit(this.maxForce);

  this.applyForce(steer);
}
