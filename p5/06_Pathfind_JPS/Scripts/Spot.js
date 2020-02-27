function Spot(_x,_y,_cost){
  this.x = _x;
  this.y = _y;

  this.cost = _cost;
  this.cameFrom = null;

  this.f = 0;//f = g + h
  this.g = 0;// 当起点到当前点距离
  this.h = 0;//当前点到目标点的曼哈顿距离（欧几里得距离，切比雪夫距离）
}

Spot.prototype.draw = function(_r,_g,_b,_a){
  fill(_r,_g,_b,_a);
  rect(this.x * resolution,this.y * resolution,resolution,resolution)
}
