function Vehicle(_x,_y){
  this.location = createVector(_x,_y);
  this.velocity = createVector(0,-2);
  this.acceleration = createVector(0,0);

  this.r = 6;
  this.maxSpeed = 4;
  this.maxForce = 0.1;

  this.isArrive = false;
  this.trackTarget = -1;
}

Vehicle.prototype.update = function (){
  var dis = dist(this.location.x,this.location.y,targetPos.x,targetPos.y);

  if(!this.isArrive){

    var arrive_force = this.arrive(createVector( targetPos.x,targetPos.y));
    var separate_force = this.separate(vehicles);
    this.applyForce(arrive_force);
    this.applyForce(separate_force.mult(1.5));

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);

    this.acceleration.mult(0);
    if(dis < 1){
      this.isArrive = true;
    }else{
      this.isArrive = this.Stop(vehicles);
    }

  }


  this.display();
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

  return steer;
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

  return steer;
}
Vehicle.prototype.separate  = function(_vehicles){
  var desiredseparation = this.r*4;
  var sum = createVector(0,0);
  var count = 0;

  for (var i = 0; i < _vehicles.length; i++) {
    var other = _vehicles[i];
    var d = dist(this.location.x,this.location.y,other.location.x,other.location.y);
    if(d > 0 && d < desiredseparation){
      var force = p5.Vector.sub(this.location,other.location);
      force.normalize();
      force.div(d);
      sum.add(force);
      count++;
    }
  }

  if(count > 0){
    sum.div(float(count));
  }

  if(sum.magSq() > 0){
    sum.normalize();
    sum.mult(this.maxSpeed);
    sum.sub(this.velocity);
    sum.limit(this.maxForce);
  }

  return sum;
}

Vehicle.prototype.Stop  = function(_vehicles){
  var desiredseparation = this.r*4;
  circle(this.location.x,this.location.y,desiredseparation);

  for (var i = 0; i < _vehicles.length; i++) {
    var other = _vehicles[i];
    var d = dist(this.location.x,this.location.y,other.location.x,other.location.y);
    if(d > 0 && d < desiredseparation){
      this.trackTarget = i;
      return true;
    }
  }
  return false;
}
