var cols = 40;
var rows = 40;
var resolution = 15;
var grid ;


var openSet = [];
var closedSet = [];
var neighbors = [];

var start;
var end;
var done;

function setup() {
  createCanvas(cols * resolution,rows * resolution);
  grid = new Grid();

  start = grid.spots[int(random(0,cols - 1))][int(random(0,rows - 1))];
  start.cost = 1;

  end = grid.spots[int(random(0,cols - 1))][int(random(0,rows - 1))];
  while(end == start){
    end = grid.spots[int(random(0,cols - 1))][int(random(0,rows - 1))];
  }
  end.cost = 1;

  done = false;
  openSet.push(start);
  // put setup code here
}

function draw() {


  background(255);
  grid.display();

  DrawOpenSet();
  DrawClosedSet();
  Search();

  start.draw(0,255,0,255);
  end.draw(255,0,0,255);
}

function Search(){
  if(done){
    DrawPath();
    return;
  }

  //执行搜索中

  var lowest_id = 0;
  for (var i = 1; i < openSet.length; i++) {
    if(openSet[i].f < openSet[lowest_id].f){
      lowest_id = i;
    }
  }

  var current = openSet[lowest_id];
  GetNeighbors(current);
  for (var i = 0; i < neighbors.length; i++) {
    var neighbor = neighbors[i];
    if(neighbor.cost != 0){

      if(!closedSet.includes(neighbor)){
        var g_score = current.g + dist(neighbor.x,neighbor.y,current.x,current.y);

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

        neighbor.h = Heuristic(neighbor,end);
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }

  if(current == end){
    done = true;
    console.log("Done!");
  }

  RemoveFormArray(openSet,current);
  closedSet.push(current);
}

function Heuristic(_spot,_end){
  return abs(_spot.x - _end.x) + abs(_spot.y - _end.y) ;
}


function GetNeighbors(_spot){
  var x = _spot.x;
  var y = _spot.y;
  neighbors.length = 0;

  let NoLeft = x > 0;
  let NoRight = x < cols - 1;
  let NoTop = y > 0;
  let NoBottom = y < rows - 1;

  var top = null;
  var right = null;
  var bottom = null;
  var left = null;

  if(NoTop){
    top = grid.spots[x][y - 1];//上
    neighbors.push(top);
  }
  if(NoRight){
    right = grid.spots[x + 1][y];
    neighbors.push(right);//右
  }
  if(NoBottom){
    bottom = grid.spots[x][y + 1];//下
    neighbors.push(bottom);
  }
  if(NoLeft){
    left = grid.spots[x - 1][y];
    neighbors.push(left);//左
  }
  //
  if(NoTop){
    if(NoRight && top.cost != 0 && right.cost != 0){
      neighbors.push(grid.spots[x + 1][y - 1]);//右上
    }
  }
  if(NoRight){
    if(NoBottom && right.cost != 0 && bottom.cost != 0){
      neighbors.push(grid.spots[x + 1][y+1]);//右下
    }
  }
  if(NoBottom){
    if(NoLeft && left.cost != 0 && bottom.cost != 0){
      neighbors.push(grid.spots[x - 1][y + 1]);//左下
    }
  }

  if(NoLeft){
    if(NoTop && top.cost != 0 && left.cost != 0){
      neighbors.push(grid.spots[x - 1][y - 1]);//左上
    }
  }

}

function DrawPath(){

  var spot = end.cameFrom;
  while(spot != start){
    spot.draw(0,0,255,100);
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
      openSet[i].draw(0,150,255,100);
    }
  }
}
function DrawClosedSet(){
  if(closedSet.length > 0){
    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].draw(250,0,100,100);
    }
  }
}
