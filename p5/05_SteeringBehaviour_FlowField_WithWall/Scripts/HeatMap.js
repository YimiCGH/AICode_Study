function HeatMap(){
  this.dis = make2dArray(cols,rows);
  this.openList = [];
  this.closeList = [];
  this.init();
}
HeatMap.prototype.init = function()
{
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      this.dis[i][j] = 0;
    }
  }
}

HeatMap.prototype.upadte = function(){
  this.openList.length = 0;
  this.closeList.length = 0;
  var index = G_TargetPoint.x + G_TargetPoint.y * cols;
  this.dis[G_TargetPoint.x][G_TargetPoint.y] = 0;
  this.openList.push(index);

  while (this.openList.length > 0) {
    var p = this.openList[0];
    this.closeList.push(p);
    this.openList = this.openList.slice(1);
    var y = int(p / cols);
    var x = p - y * cols;
    this.GetNeighbor(x,y,this.dis[x][y]);
  }
}

HeatMap.prototype.GetNeighbor = function(_x,_y,_value){
  var neighbors = [];
  neighbors[0]  = createVector(_x    ,_y - 1);//up
  neighbors[1]  = createVector(_x + 1,_y);//right
  neighbors[2]  = createVector(_x    ,_y + 1);//down
  neighbors[3]  = createVector(_x - 1,_y);//left

  for (var i = 0; i < neighbors.length; i++) {
    var neighbor = neighbors[i];
    if(
      neighbor.x >= 0 && neighbor.x < cols &&
      neighbor.y >= 0 && neighbor.y < rows)
    {
      if(G_WalkableMap.walkable[neighbor.x][neighbor.y] == 1){
        var index = neighbor.x + neighbor.y * cols;
        if(!ArrayHas(this.openList,index) && !ArrayHas(this.closeList,index)){
          this.openList.push(index);
          this.dis[neighbor.x][neighbor.y] = _value + 1;
        }
      }
    }
  }
}

HeatMap.prototype.display = function(){
  strokeWeight(1);
  textAlign(CENTER,CENTER);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      fill(map(this.dis[i][j],0,60,0,255),0,0);
      rect(i * resolution ,j * resolution,resolution,resolution);
      fill(255,0,0);
      text(str(this.dis[i][j]),i * resolution ,j * resolution,resolution,resolution) ;//
    }
  }
}
