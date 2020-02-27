var cols = 10;
var rows = 10;
var resolution = 50;
var grid ;


var openSet = [];
var closedSet = [];
var neighbors = [];

var start;
var end;

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


  openSet.push(start);
  // put setup code here
}

function draw() {


  background(255);
  grid.display();

  fill(0,255,0,100);
  rect(start.x * resolution,start.y * resolution,resolution,resolution);
  fill(255,0,0,100);
  rect(end.x * resolution,end.y * resolution,resolution,resolution);

  // put drawing code here

  Search();
}

function Search(){
  if(openSet.length == 0){
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
        var g_score = current.g + 1;

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
    console.log("Done!");
  }

  RemoveFormArray(openSet,current);
  closedSet.push(current);
}

function DrawPath(){
  var spot = end.cameFrom;
  while(spot != start){
    spot.draw(0,0,255,100);
    spot = spot.cameFrom;
  }
}


function GetNeighbors(_spot){
  var x = _spot.x;
  var y = _spot.y;
  neighbors.length = 0;

  if(y > 0){
    neighbors.push(grid.spots[x][y - 1]);
  }

  if(y < rows - 1){
    neighbors.push(grid.spots[x][y + 1]);
  }

  if(x > 0){
    neighbors.push(grid.spots[x - 1][y]);
  }
  if(x < cols - 1){
    neighbors.push(grid.spots[x + 1][y]);
  }

}

function Heuristic(_spot,_end){
  _spot.h = dist(_spot.x ,_spot.y,_end.x,_end.y) ;
}
