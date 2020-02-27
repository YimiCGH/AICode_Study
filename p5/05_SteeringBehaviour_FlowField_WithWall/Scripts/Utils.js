function make2dArray(_cols,_rows){
  var arr = new Array(_cols);
  for (var i = 0; i < _cols; i++) {
    arr[i] = new Array(_rows);
  }
  return arr;
}

function ArrayHas(_array,_target){
  for (var i = 0; i < _array.length; i++) {
    if(_array[i] == _target)
      return true;
  }
  return false;
}
