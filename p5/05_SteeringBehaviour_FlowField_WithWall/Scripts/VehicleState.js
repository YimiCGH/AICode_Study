function VehicleState(_vehicle){
  this.isArrive = false;
  this.vehicle = _vehicle
}

VehicleState.prototype.Move = function(){
  var vehicle = this.vehicle;
  var dis = dist(vehicle.location.x,vehicle.location.y,
    G_TargetPoint.x * resolution,
    G_TargetPoint.y * resolution);
  //console.log(dis);
  if(dis > 1){
    //计算流场向量

    var arriveForce = vehicle.FlowFieldArrive(G_FlowField);
    var separateForce = vehicle.separate(vehicles);

    arriveForce.mult(1);
    separateForce.mult(1);
    vehicle.applyForce(arriveForce);
    vehicle.applyForce(separateForce);
    //应用力
    vehicle.velocity.add(vehicle.acceleration);
    vehicle.velocity.limit(vehicle.maxSpeed);
    vehicle.location.add(vehicle.velocity);
    vehicle.acceleration.mult(0);
  }
}
