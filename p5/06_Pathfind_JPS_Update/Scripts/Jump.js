function jump(_neighbor,_current,_grid){
  if(_neighbor == null || _neighbor.cost == 0){
    return null;
  }

  if(_neighbor == end){
    return _neighbor;
  }

  var dx = _neighbor.x - _current.x;
  var dy = _neighbor.y - _current.y;

  var forceNeighbor1 = null;
  var obstacle1 = null;
  var forceNeighbor2 = null;
  var obstacle2 = null;

  if((dx & dy) != 0){
    //斜角
    forceNeighbor1 = _grid.getNeighbor(_neighbor,-dx,dy);
    obstacle1 = _grid.getNeighbor(_neighbor,-dx,0);
    forceNeighbor2 = _grid.getNeighbor(_neighbor,dx,-dy);
    obstacle2 = _grid.getNeighbor(_neighbor,0,-dy);

    if(HasForceNeighbor(forceNeighbor1,obstacle1,forceNeighbor2,obstacle2)){
      return _neighbor;
    }
    if(jump(_grid.getNeighbor(_neighbor,dx,0) ,_neighbor,_grid) != null ||
       jump(_grid.getNeighbor(_neighbor,0,dy) ,_neighbor,_grid) != null){
      return _neighbor;
    }
  }else{
    if(dx != 0){
      forceNeighbor1 = _grid.getNeighbor(_neighbor,dx,1);
      obstacle1 = _grid.getNeighbor(_neighbor,0,1);
      forceNeighbor2 = _grid.getNeighbor(_neighbor,dx,-1);
      obstacle2 = _grid.getNeighbor(_neighbor,0,-1);

    }else if(dy != 0){
      forceNeighbor1 = _grid.getNeighbor(_neighbor,-1,dy);
      obstacle1 = _grid.getNeighbor(_neighbor,-1,0);
      forceNeighbor2 = _grid.getNeighbor(_neighbor,1,dy);
      obstacle2 = _grid.getNeighbor(_neighbor,1,0);
    }
    if(HasForceNeighbor(forceNeighbor1,obstacle1,forceNeighbor2,obstacle2)){
      return _neighbor;
    }
  }

  var H_cell = _grid.getNeighbor(_neighbor,dx,0);
  var V_cell = _grid.getNeighbor(_neighbor,0,dy);

  if((H_cell != null && H_cell.cost != 0) || (V_cell != null && V_cell.cost != 0)){
    var D_Cell =  _grid.getNeighbor(_neighbor,dx,dy);
    return jump(D_Cell,_neighbor,_grid);
  }else{
    return null;
  }
}

function HasForceNeighbor(forceNeighbor1 ,obstacle1,forceNeighbor2,obstacle2){
  if((obstacle1 != null && obstacle1.cost == 0 && forceNeighbor1 != null && forceNeighbor1.cost != 0) ||
  (obstacle2 != null && obstacle2.cost == 0 && forceNeighbor2 != null && forceNeighbor2.cost != 0)){
    return true;
  }
}
