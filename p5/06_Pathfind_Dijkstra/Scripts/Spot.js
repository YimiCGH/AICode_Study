function Spot(_x,_y,_cost){
  this.x = _x;
  this.y = _y;

  this.cost = _cost;
  this.cameFrom = null;

  this.f = 0;
  this.g = 0;
  this.h = 0;
}

Spot.prototype.draw = function(_r,_g,_b,_a){
  fill(_r,_g,_b,_a);
  rect(this.x * resolution,this.y * resolution,resolution,resolution)
}
