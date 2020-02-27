function AddForceNeighbor(_cell,_grid,list,_dirx,_diry){
  var forceNeighbor = _grid.getNeighbor(_cell,_dirx,_diry);
  if(forceNeighbor != null && forceNeighbor.cost != 0){
      list.push(forceNeighbor);
  }
}


function HorizontalTest(_grid,_currentCell,_dir){
  var res = [];
  var nextCell = _grid.getNeighbor(_currentCell,_dir,0);
  if(nextCell == null){
    return res;
  }else{
    if(nextCell.cost != 0){
      res.push(nextCell);
    }
  }
  var upCell = _grid.getNeighbor(_currentCell,0,-1);
  var downCell = _grid.getNeighbor(_currentCell,0,1);

  //发现强制邻居节点
  if(upCell != null){
    if(_dir == 1){
      AddForceNeighbor_D(_currentCell,_grid,res,0,2,1);
    }else{
      AddForceNeighbor_D(_currentCell,_grid,res,0,6,7);
    }
  }
  if(downCell != null ){
    if(_dir == 1){
      AddForceNeighbor_D(_currentCell,_grid,res,4,2,3);
    }else{
      AddForceNeighbor_D(_currentCell,_grid,res,4,6,5);
    }
  }
  return res;
}
function VerticalTest(_grid,_currentCell,_dir){
  var res = [];
  var nextCell = _grid.getNeighbor(_currentCell,0,_dir);
  if(nextCell == null){
    return res;
  }else{
    if(nextCell.cost != 0){
      res.push(nextCell);
    }
  }
  var leftCell = _grid.getNeighbor(_currentCell,-1,0);
  var rightCell = _grid.getNeighbor(_currentCell,1,0);

  //发现强制邻居节点
  if(leftCell != null){
    if(_dir == 1){
      AddForceNeighbor_D(_currentCell,_grid,res,6,4,5);
    }else{
      AddForceNeighbor_D(_currentCell,_grid,res,6,0,7);
    }
  }
  if(rightCell != null){
    if(_dir == 1){
      AddForceNeighbor_D(_currentCell,_grid,res,2,4,3);
    }else{
      AddForceNeighbor_D(_currentCell,_grid,res,2,0,1);
    }
  }
  return res;
}
function DiagonalTest(_grid,_currentCell,_dirx,_diry){
  var res = [];
  var nextCell = _grid.getNeighbor(_currentCell,_dirx,_diry);


  var nextVCell = _grid.getNeighbor(_currentCell,0,_diry);//垂直方向
  var nextHCell = _grid.getNeighbor(_currentCell,_dirx,0);//水平方向

  if(nextVCell != null && nextVCell.cost != 0){
    res.push(nextVCell);
  }
  if(nextHCell != null && nextHCell.cost != 0){
    res.push(nextHCell);
  }
  if(nextVCell != null && nextVCell.cost == 0 && nextHCell != null &&  nextHCell.cost == 0){
    //不允许穿过两个不可通行的节点之间
    return res;
  }else{
    if(nextCell != null && nextCell.cost != 0){
      res.push(nextCell);
    }
  }

  //发现强制邻居节点
  if(_dirx == 1 && _diry == -1){
    //右上
    AddForceNeighbor_D(_currentCell,_grid,res,6,0,7);
    AddForceNeighbor_D(_currentCell,_grid,res,4,2,3);
  }else if(_dirx == 1 && _diry == 1){
    //右下
    AddForceNeighbor_D(_currentCell,_grid,res,0,2,1);
    AddForceNeighbor_D(_currentCell,_grid,res,6,4,5);
  }else if(_dirx == -1 && _diry == 1){
    //左下
    AddForceNeighbor_D(_currentCell,_grid,res,0,6,7);
    AddForceNeighbor_D(_currentCell,_grid,res,2,4,3);
  }else{
    AddForceNeighbor_D(_currentCell,_grid,res,2,0,1);
    AddForceNeighbor_D(_currentCell,_grid,res,4,6,5);
  }

  return res;
}
//考虑斜角，不需从两个墙之间穿过
function AddForceNeighbor_D(_cell,_grid,list,_close,_open,_add){
  var closeCell = _grid.getNeighbor_byDirID(_cell,_close);
  var openCell = _grid.getNeighbor_byDirID(_cell,_open);
  if(openCell == null)
    return;
  if(closeCell.cost == 0 &&
    openCell.cost != 0){
    var dir = _grid.drections[_add];
    AddForceNeighbor(_cell,_grid,list,dir.x,dir.y);
  }
}
