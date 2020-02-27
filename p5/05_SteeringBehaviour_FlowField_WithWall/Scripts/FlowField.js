function FlowField(){
  this.field = make2dArray(cols,rows);
  this.update();
}

FlowField.prototype.update = function()
{
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      this.field[i][j] = this.build(i,j);
    }
  }
}

FlowField.prototype.display = function(){
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if(G_WalkableMap.walkable[i][j] == 1){
        DrawVector(this.field[i][j], i * resolution,j * resolution,resolution - 8);
      }
    }
  }
}
FlowField.prototype.displayGrid = function(){
  for (var i = 0; i < cols; i++) {
    line(i * resolution,0,i * resolution,rows * resolution);
    for (var j = 0; j < rows; j++) {
      line(0,j * resolution ,cols * resolution,j * resolution);
    }
  }
}

function DrawVector(_vec,_x,_y,_scale){
  var len = _vec.mag() * _scale;
  if(len > 0){
    push();

    let arrowSize = 4;
    let offset = 0.5 * resolution;
    translate(_x + offset,_y + offset);
    stroke(0,100);
    rotate(_vec.heading());

    line(0 - offset,0,len - offset,0);
    strokeWeight(5)
    point(len - offset,0,);
    pop();
  }

}

FlowField.prototype.lookup = function(_lookUp){
  var column = int(constrain(_lookUp.x / resolution,0,cols - 1));
  var row = int(constrain(_lookUp.y / resolution,0,rows - 1));
  //抵达目标点所在格子，其向量为从该位置指向中心
  if(column == G_TargetPoint.x && row == G_TargetPoint.y){
    return createVector((column + 0.5) * resolution - _lookUp.x,
      (row + 0.5)* resolution - _lookUp.y).normalize();
  }

  return this.field[column][row];
}

FlowField.prototype.build = function(_x,_y){
  var neighbors = [];
  neighbors[0]  = createVector(_x    ,_y - 1);//top
  neighbors[1]  = createVector(_x + 1,_y - 1);//top right

  neighbors[2]  = createVector(_x + 1,_y);//right
  neighbors[3]  = createVector(_x + 1,_y + 1);//bottom right

  neighbors[4]  = createVector(_x    ,_y + 1);//bottom
  neighbors[5]  = createVector(_x - 1,_y + 1);//bottom left

  neighbors[6]  = createVector(_x - 1,_y);//left
  neighbors[7]  = createVector(_x - 1,_y - 1);//top left


  var min_distance = 999999;
  var min_index ;
  for (var i = 0; i < neighbors.length; i++) {
    var neighbor = neighbors[i];
    if(neighbor.x >= 0 && neighbor.x < cols && neighbor.y >= 0 && neighbor.y < rows){
      if(G_WalkableMap.walkable[neighbor.x][neighbor.y] == 1 && G_HeatMap.dis[neighbor.x][neighbor.y] < min_distance){
        if(i % 2 == 0 ){
          min_distance = G_HeatMap.dis[neighbor.x][neighbor.y];
          min_index = neighbor;
        }else{
          var last = neighbors[i - 1];
          var next = neighbors[(i + 1) % 8];
          if(G_WalkableMap.walkable[last.x][last.y] == 1 && G_WalkableMap.walkable[next.x][next.y] == 1){
            min_distance = G_HeatMap.dis[neighbor.x][neighbor.y];
            min_index = neighbor;
          }
        }

      }
    }
  }

  if(_x == G_TargetPoint.x && _y == G_TargetPoint.y){
    return createVector(0,0);
  }
  return createVector(min_index.x - _x,min_index.y - _y);

}
