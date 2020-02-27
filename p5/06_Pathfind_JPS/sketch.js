var cols ;
var rows ;
var resolution ;
var grid ;


var openSet = [];
var closedSet = [];
var neighbors = [];

var selectFinder;
var start;
var end;
var done;
var path = [];

var pathfinderType ;

function setup() {
  cols = 20;
  rows = 14;
  resolution = 30;
  createCanvas(cols * resolution,rows * resolution);
  InitMaze();

  createDiv("寻路算法");
  selectFinder = createSelect();
  pathfinderType = 'A*';
  //selectFinder.position((cols + 1) * resolution, 10);
  selectFinder.option('A*');
  selectFinder.option('JPS');
  selectFinder.changed(ChangePathFinder);
  var searchPath = createButton("Search");
  searchPath.mousePressed(FindPath);
  var next_button = createButton(">>");
  next_button.mousePressed(NextStep);

  createDiv("设置");
  var createMaze = createButton("Build Maze");
  createMaze.mousePressed(InitMaze);
  // put setup code here
  var clear_button = createButton("Clear");
  clear_button.mousePressed(ClearSearch);


}
function ChangePathFinder() {
  let item = selectFinder.value();
  pathfinderType = item;
}

function draw() {
  grid.display();

  start.draw(0,255,0,255);
  end.draw(255,0,0,255);

  DrawOpenSet();
  DrawClosedSet();
  //Search();

  if(done){
    DrawPath();
  }
}

function FindPath(){
  console.log(`${pathfinderType}`);
  while(!done){
    Search();
  }
}

function Search(){
  if(done){
    return;
  }

  //执行搜索中
  var lowest_id = 0;
  var lowest_f = openSet[lowest_id].f;
  for (var i = 1; i < openSet.length; i++) {
    if(openSet[i].f < lowest_f){
      lowest_id = i;
      lowest_f = openSet[i].f;
    }
  }
  var current = openSet[lowest_id];

  if(pathfinderType == 'A*'){
    GetNeighbors(current);
  }else{
    if(current.cameFrom != null){
      //取得移动方向
      var dir_x = constrain(current.x - current.cameFrom.x ,-1,1);
      var dir_y = constrain(current.y - current.cameFrom.y ,-1,1);
      GetNeighbors_WithCut(current,dir_x,dir_y);
    }else{
      GetNeighbors(current);
    }
  }

  for (var i =  0; i < neighbors.length ; i++) {
    var neighbor = neighbors[i];
    if(neighbor == end){
      done = true;
      neighbor.cameFrom = current;
      console.log("Done!");
      return;
    }

    if(!closedSet.includes(neighbor)){
      var dx = neighbor.x - current.x;
      var dy = neighbor.y - current.y;
      var g_score = current.g;
      if(dx != 0 && dy != 0){
        g_score+= 1.4;
      }else{
        g_score+= 1;
      }
      //var g_score = current.g + floor( dist(neighbor.x,neighbor.y,current.x,current.y) * 10) / 10;
      if(openSet.includes(neighbor)){
        if(g_score < neighbor.g){
          neighbor.g = g_score;//是一个更加近的节点
          neighbor.cameFrom = current;
        }
      }else{
        neighbor.g = g_score;
        neighbor.cameFrom = current;
        openSet.push(neighbor);
      }

      neighbor.h = Heuristic(neighbor,end) ;
      neighbor.f = neighbor.g + neighbor.h;
    }
  }
  RemoveFormArray(openSet,current);
  closedSet.push(current);
}

function Heuristic(_spot,_end){
  return abs(_spot.x - _end.x) + abs(_spot.y - _end.y) ;
}


function GetNeighbors(_spot){
  neighbors.length = 0;
  for (var i = 0; i < 8; i++) {
    var dir = grid.drections[i];
    var neighbor = grid.getNeighbor(_spot,dir.x,dir.y);
    if(neighbor != null && neighbor.cost != 0){
      if((i % 2) != 0){//对角
        var last_dir =  grid.drections[(i - 1) % 8];
        var next_dir =  grid.drections[(i + 1) % 8];

        var last = grid.getNeighbor(_spot,last_dir.x,last_dir.y);
        var next = grid.getNeighbor(_spot,next_dir.x,next_dir.y);
        if(last != null && last.cost == 0 && next != null && next.cost == 0){
          console.log("对角");
        }else{
          neighbors.push(neighbor);
        }

      }else{
        neighbors.push(neighbor);
      }
    }
  }
}

function GetNeighbors_WithCut(_spot,_dirx,_diry){
  neighbors.length = 0;
  if(_dirx != 0 && _diry != 0){
    //斜角
    neighbors = DiagonalTest(grid,_spot,_dirx,_diry);
  }else{
    //非斜角
    if(_dirx != 0){
      neighbors = HorizontalTest(grid,_spot,_dirx);
    }else{
      neighbors = VerticalTest(grid,_spot,_diry);
    }
  }

  console.log(`cut neighbor num = ${neighbors.length}, dirx = ${_dirx} ,diry = ${_diry}`);
}

function DrawPath(){

  var spot = end.cameFrom;
  while(spot != start){
    spot.draw(100,100,255,255);
    spot = spot.cameFrom;
  }

  //drawline
  noFill();
  stroke(255);
  beginShape();
  spot = end;
  while(spot != null){
    vertex((spot.x + 0.5) * resolution ,(spot.y + 0.5) * resolution);

    spot = spot.cameFrom;
  }
  endShape();

  stroke(0);
}
function DrawOpenSet(){
  if(openSet.length > 0){
    for (var i = 0; i < openSet.length; i++) {
      var spot = openSet[i];
      spot.draw(0,150,255,100);

      if(spot.cameFrom != null){
        fill(255);
        line((spot.x + 0.5)*resolution,
        (spot.y+0.5)*resolution,
        (spot.cameFrom.x+0.5)*resolution,
        (spot.cameFrom.y+0.5)*resolution);
      }
      //text(`${spot.g}+${spot.h}`,(spot.x )*resolution,  (spot.y+0.5)*resolution);
      //text(`${spot.f}`,(spot.x )*resolution,  (spot.y+0.5)*resolution);

    }
  }
}
function DrawClosedSet(){
  if(closedSet.length > 0){
    for (var i = 0; i < closedSet.length; i++) {
      var spot = closedSet[i];
      spot.draw(250,0,100,100);
      if(spot.cameFrom != null){
        fill(255);
        line((spot.x + 0.5)*resolution,
        (spot.y+0.5)*resolution,
        (spot.cameFrom.x+0.5)*resolution,
        (spot.cameFrom.y+0.5)*resolution);
      }
    }
  }
}

function ClearSearch(){
  openSet.length = 0;
  closedSet.length = 0;
  neighbors.length = 0;
  done = false;
  openSet.push(start);
}

function InitMaze(){
  openSet.length = 0;
  closedSet.length = 0;
  neighbors.length = 0;
  done = false;

  grid = new Grid();

  // start = grid.spots[2][0];
  //
  // end = grid.spots[18][6];
  // end.cost = 1;
  start = grid.spots[int(random(0,cols - 1))][int(random(0,rows - 1))];
  start.cost = 1;

  end = grid.spots[int(random(0,cols - 1))][int(random(0,rows - 1))];
  while(end == start){
    end = grid.spots[int(random(0,cols - 1))][int(random(0,rows - 1))];
  }
  end.cost = 1;

  openSet.push(start);
}

function NextStep(){
  Search();
}
