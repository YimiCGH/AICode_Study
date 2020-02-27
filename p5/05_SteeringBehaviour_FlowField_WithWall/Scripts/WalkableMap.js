function WalkableMap(){
  this.walkable = make2dArray(cols,rows);
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
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
       if(this.walkable[i][j] == 0){
         fill(0);
         rect(i * resolution ,j * resolution,resolution,resolution);
       }
    }
  }


}
