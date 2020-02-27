function Grid(){
  this.spots = new Array(cols);
  for (var i = 0; i < cols; i++) {
    this.spots[i] = new Array(rows);

    for (var j = 0; j < rows; j++) {
      this.spots[i][j] = new Spot(i,j,int(random(0,4)));
    }
  }
  this.drections = [];
  this.drections[0] = {x :0,y:-1};
  this.drections[1] = {x :1,y:-1};
  this.drections[2] = {x :1,y:0};
  this.drections[3] = {x :1,y:1};
  this.drections[4] = {x :0,y:1};
  this.drections[5] = {x :-1,y:1};
  this.drections[6] = {x :-1,y:0};
  this.drections[7] = {x :-1,y:-1};
}


Grid.prototype.display = function(){
  stroke(0);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if(this.spots[i][j].cost == 0){
        this.spots[i][j].draw(0,0,0,255);
      }else {
        this.spots[i][j].draw(255,255,255,255);
      }
    }
  }
}
Grid.prototype.getNeighbor = function(_currentCell,_dx,_dy){
  var x = _currentCell.x + _dx;
  var y = _currentCell.y + _dy;

  if(x >= 0 && x <= cols -1 && y >= 0 && y <= rows - 1){
    return this.spots[x][y];
  }else{
    return null;
  }
}
Grid.prototype.getNeighbor_byDirID = function(_currentCell,_dir){
  var dir = this.drections[_dir];
  var x = _currentCell.x + dir.x;
  var y = _currentCell.y + dir.y;

  if(x >= 0 && x <= cols -1 && y >= 0 && y <= rows - 1){
    return this.spots[x][y];
  }else{
    return null;
  }
}
