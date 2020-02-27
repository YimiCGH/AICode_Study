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
      //if(G_WalkableMap.walkable[i][j] == 1){
        DrawVector(this.field[i][j], i * resolution,j * resolution,resolution - 8);
      //}
    }
  }
}
FlowField.prototype.displayGrid = function(){
  for (var i = 0; i < cols; i++) {
    line(i * resolution,0,i * resolution,rows * resolution);
  }
  for (var i = 0; i < rows; i++) {
    line(0,i * resolution ,cols * resolution,i * resolution);
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
FlowField.prototype.lookup_smooth = function(_lookUp){

  var x = int(constrain(_lookUp.x / resolution,0,cols - 1));
  var y = int(constrain(_lookUp.y / resolution,0,rows - 1));

  //抵达目标点所在格子，其向量为从该位置指向中心
  if(x == G_TargetPoint.x && y == G_TargetPoint.y){
    return createVector((x + 0.5) * resolution - _lookUp.x,
      (y + 0.5)* resolution - _lookUp.y).normalize();
  }
  //双向线性插值
  /*
  | 00 | 10 |
  | 01 | 11 |
  */
  let V = p5.Vector;

  var hasRigth = (x + 1 < cols);
  var hasBottom = (y + 1 < rows) ;
  var f00 = this.field[x][y];
  var f10 = hasRigth ? this.field[x + 1][y] : f00.copy();
  var f01 = hasBottom ? this.field[x][y + 1] : f00.copy();
  var f11 = (hasRigth && hasBottom) ? this.field[x+1][y + 1] : f00.copy();

  var xWeight = (_lookUp.x - (x) * resolution) / (resolution *2);
  //var top = V.mult(f00,1 - x).add( V.mult(f10,xWeight));
  //var bottom = V.mult(f01,1 - x).add( V.mult(f11,xWeight));

  var top = V.lerp(f00,f10,xWeight);
  var bottom = V.lerp(f01,f11,xWeight);


  var yWeight = (_lookUp.y - (y) * resolution) / (resolution * 2);
  //var direction = V.add(top.mult(1-yWeight), bottom.mult(yWeight)).normalize();
  var direction = V.lerp(top, bottom,yWeight).normalize();


  //console.log(` xWeight=${xWeight} , yWeight=${yWeight}`);
  if(isNaN(direction.magSq())){
    return createVector(0,0);
  }

  // push();
  // noFill();
  // stroke(255,0,0);
  // strokeWeight(4);
  // rect(x* resolution,y * resolution,resolution,resolution);
  // rect((x+1)* resolution,y * resolution,resolution,resolution);
  // rect(x* resolution,(y+1) * resolution,resolution,resolution);
  // rect((x+1)* resolution,(y+1) * resolution,resolution,resolution);
  // stroke(0,0,255);
  // line(_lookUp.x,_lookUp.y,_lookUp.x + direction.x * 20,_lookUp.y + direction.y * 20)
  // pop();

  return direction;
  //return this.field[x][y];
}

FlowField.prototype.build = function(_x,_y){
  if(G_WalkableMap.walkable[_x][_y] == 0){
    return createVector(0,0);
  }
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
  var min_index = null;
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

  if(min_index == null ||( _x == G_TargetPoint.x && _y == G_TargetPoint.y)){
    return createVector(0,0);
  }
  return createVector(min_index.x - _x,min_index.y - _y).normalize();

}
