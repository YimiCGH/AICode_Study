function Vehicle(_x,_y){
  this.location = createVector(_x,_y);
  this.velocity = createVector(0,-2);
  this.acceleration = createVector(0,0);

  this.r = 6;
  this.maxSpeed = 2;
  this.maxForce = 0.1;
  this.viewOfSight = [];
  this.viewOfSight[0] = 20;
  this.viewOfSight[1] = 20;
  this.viewOfSight[2] = 20;
}

Vehicle.prototype.update = function (){

  var f1 = this.arrive(createVector( mouseX,mouseY));
  var f2 = this.separate(G_Vehicles);
  var forces = this.avoidWall(walls);

  this.applyForce(f1);
  this.applyForce(f2.mult(6));

  if(forces != null){
    this.applyForce(forces.n.mult(10));
    this.applyForce(forces.s.mult(7));
  }



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
Vehicle.prototype.avoidWall = function(_walls){
  var feelers = [];
  var angle = this.velocity.heading();
  feelers[0] = p5.Vector.fromAngle(angle) ;//createVector(this.velocity.x,this.velocity.y).normalize();
  feelers[1] = p5.Vector.fromAngle(angle+PI/6);//createVector(this.velocity.x,this.velocity.y).normalize().rotate(-90);
  feelers[2] = p5.Vector.fromAngle(angle-PI/6);//createVector(this.velocity.x,this.velocity.y).normalize().rotate(90);

  for (var i = 0; i < feelers.length; i++) {
    var feeler = feelers[i];
    feeler = feeler.mult(this.viewOfSight[i]);
    feeler.add(this.location.x,this.location.y);
    line(this.location.x,this.location.y,feeler.x ,feeler.y );

    for (var wall of _walls) {
      var forces = wall.GetNormalAndSideDir(this.location,feeler,this.viewOfSight[i]);

      if(forces){
        forces.n.limit(this.maxForce);
        forces.s.limit(this.maxForce);

        return forces;
      }
    }
  }
  return null;
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
