function WalkableMap(){
  this.walkable = make2dArray(cols,rows);
  this.wallsDic = {};
  this.walls = []
  this.init();

}
WalkableMap.prototype.init = function()
{
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      this.walkable[i][j] = 1;
    }
  }
}
WalkableMap.prototype.display = function(){
  push();
  noStroke();
  fill(100);
  for (var wall of  this.walls) {
    wall.Display();
  }
  pop();
}
WalkableMap.prototype.AddWall = function(_x,_y){
  if(this.walkable[_x][_y] != 0){
    this.wallsDic[_y * cols + _x] = new Wall((_x+0.5) * resolution,(_y+0.5) * resolution, resolution,resolution);
    this.walkable[_x][_y] = 0;
    this.UpdateWalls();
    return true;
  }
  return false;
}
WalkableMap.prototype.RemoveWall = function(_x,_y){
  if(this.walkable[_x][_y] == 0){
    this.wallsDic[_y * cols + _x] = null;
    this.walkable[_x][_y] = 1;
    this.UpdateWalls();
    return true;
  }
  return false;
}
WalkableMap.prototype.UpdateWalls = function(){
  this.walls.length = 0;
  for (var key in this.wallsDic) {
    if (this.wallsDic.hasOwnProperty(key)) {
      var wall = this.wallsDic[key];
      if(wall != null){
        this.walls.push(wall);
      }
    }
  }
}
