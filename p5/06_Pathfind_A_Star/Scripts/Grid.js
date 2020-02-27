function Grid(){
  this.spots = new Array(cols);
  for (var i = 0; i < cols; i++) {
    this.spots[i] = new Array(rows);

    for (var j = 0; j < rows; j++) {
      this.spots[i][j] = new Spot(i,j,int(random(0,4)));
    }
  }
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
