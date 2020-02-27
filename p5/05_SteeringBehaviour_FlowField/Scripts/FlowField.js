function FlowField(_resolution){
  this.resolution = _resolution;
  this.cols = width / _resolution;
  this.rows = height / _resolution;

  this.field = make2dArray(this.cols,this.rows);
  this.init();
}

FlowField.prototype.init = function(){
  noiseSeed(1000);
  this.updateMap();
}

FlowField.prototype.updateMap = function(){
  noiseSeed(int(random(1000)));
  var xOff = 0;
  for (var i = 0; i < this.cols; i++) {
    var yOff = 0;
    for (var j = 0; j < this.rows; j++) {
      var theta = map(noise(xOff,yOff),0,1,0,PI * 2);
      this.field[i][j] = p5.Vector.fromAngle(theta);

      yOff += 0.1;
    }
    xOff += 0.1;
  }
}

FlowField.prototype.display = function(){
  for (var i = 0; i < this.cols; i++) {
    for (var j = 0; j < this.rows; j++) {
       DrawVector(this.field[i][j], i * this.resolution,j * this.resolution,this.resolution - 2);
    }
  }
}

function DrawVector(_vec,_x,_y,_scale){
  push();

  let arrowSize = 4;
  translate(_x,_y);
  stroke(0,100);
  rotate(_vec.heading());

  var len = _vec.mag() * _scale;

  line(0,0,len,0);

  pop();
}

FlowField.prototype.lookup = function(_lookUp){
  var column = int(constrain(_lookUp.x / this.resolution,0,this.cols - 1));
  var row = int(constrain(_lookUp.y / this.resolution,0,this.rows - 1));

  return this.field[column][row];
}

function make2dArray(_cols,_rows){
  var arr = new Array(_cols);
  for (var i = 0; i < _cols; i++) {
    arr[i] = new Array(_rows);
  }
  return arr;
}
