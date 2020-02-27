function Vehicle(_x,_y){
  this.location = createVector(_x,_y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
  this.forward = createVector(0,1);

  this.r = 3;
  this.maxSpeed = 2;
  this.maxForce = 0.1;

  this.siutableDistance = 12;

  this.viewOfSight = [];
  this.viewOfSight[0] = 10;
  this.viewOfSight[1] = 10;
  this.viewOfSight[2] = 10;

  this.state = new VehicleState(this);
}
Vehicle.prototype.run = function(){
  this.state.Move();
  this.display();
}
Vehicle.prototype.display = function(){
  this.borders();

  //console.log(this.velocity.magSq());
  if(this.velocity.magSq() > 0.0001){
    //this.forward = this.velocity.copy();
    this.forward = p5.Vector.lerp(this.forward,this.velocity,0.1);//this.maxForce
  }
  //var theta = this.velocity.heading() + radians(90);
  var theta = this.forward.heading() + radians(90);
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

  //var desired = _flowfield.lookup(this.location).copy();
  var desired = _flowfield.lookup_smooth(this.location).copy();

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
Vehicle.prototype.avoidWall = function(_walls){
  var feelers = [];
  var angle = this.velocity.heading();
  feelers[0] = p5.Vector.fromAngle(angle);//createVector(this.velocity.x,this.velocity.y).normalize();
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
  //var desiredseparation = this.r*4;
  var sum = createVector(0,0);
  var count = 0;

  for (var i = 0; i < _vehicles.length; i++) {
    var other = _vehicles[i];
    var d = dist(this.location.x,this.location.y,other.location.x,other.location.y);
    if(d > 0 && d < this.siutableDistance){
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

Vehicle.prototype.slowDown = function(_vehicles){

    var angle = this.velocity.heading();
    var forward = p5.Vector.fromAngle(angle).mult(this.viewOfSight[0]+10).add(this.location.x,this.location.y);
    // push();
    // noFill();
    // circle(forward.x,forward.y,20);
    // pop();
    for (var unit of _vehicles) {
      if(abs(unit.location.x - forward.x) < 20 && abs(unit.location.y - forward.y) < 20){
        if(unit.velocity.magSq() < this.velocity.magSq()){
          this.velocity.mult(0.6);
          return;
        }
      }
    }
}
