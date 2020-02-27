function VehicleState(_vehicle){
  this.isArrive = false;
  this.vehicle = _vehicle
}

VehicleState.prototype.Move = function(){
  var vehicle = this.vehicle;
  var dis = dist(vehicle.location.x,vehicle.location.y,
    (G_TargetPoint.x + 0.5) * resolution,
    (G_TargetPoint.y + 0.5) * resolution);
  //console.log(dis);
  if(dis > resolution - 5){
    //计算流场向量

    var f_arrive = vehicle.FlowFieldArrive(G_FlowField);
    vehicle.applyForce(f_arrive.mult(2));

    var f_separate = vehicle.separate(G_Vehicles);
    vehicle.applyForce(f_separate.mult(4));

    var forces = vehicle.avoidWall(G_WalkableMap.walls);
    if(forces != null){
      vehicle.applyForce(forces.n.mult(6));
      vehicle.applyForce(forces.s.mult(2));
    }
    //应用力
    vehicle.velocity.add(vehicle.acceleration);
    vehicle.velocity.limit(vehicle.maxSpeed);
    vehicle.location.add(vehicle.velocity);
    vehicle.acceleration.mult(0);

    vehicle.slowDown(G_Vehicles);
  }else{
    //console.log("arrive");
    vehicle.velocity.mult(0);
  }
}
