var vehicles = [];
var G_FlowField;
var G_WalkableMap;
var G_HeatMap;

var debug;
var showGrid;
var debugHeatMap;

var resolution;
var cols;
var rows;
var G_TargetPoint;

var selectAction;

function setup() {
  //初始设置
  createCanvas(600,300);
  resolution = 20;
  cols = width / resolution;
  rows = height / resolution;

  G_TargetPoint = createVector(0,0);//{x:0,y:0};

  //调试相关
  debug = true;
  debugCheckBox = createCheckbox('Debug', debug);
  debugCheckBox.changed(DebugCheckedEvent);
  showGrid = false;
  showGridCheckBox = createCheckbox('Show Grid', showGrid);
  showGridCheckBox.changed(ShowGridCheckedEvent);
  debugHeatMap = false;
  heatMapCheckBox =  createCheckbox('HeatMap', debugHeatMap);
  heatMapCheckBox.changed(HeatMapCheckedEvent);

  selectAction = createSelect();
  selectAction.option('AddWall');
  selectAction.option('RemoveWall');
  selectAction.option('SetTarget');
  selectAction.option('AddEntity');

  selectAction.changed(SelectActionChange);


  G_WalkableMap = new WalkableMap();
  G_HeatMap = new HeatMap();
  G_FlowField = new FlowField();

  SetTarget(cols / 2,rows / 2);

  var button = createButton("Clear Entities");
  button.mousePressed(ClearEntities);
}

function draw() {
  background(200);
  if(debugHeatMap){
    G_HeatMap.display();
  }
  if (debug){
    G_FlowField.display();
  }
  if(showGrid){
    G_FlowField.displayGrid();
  }
  //绘制Wall ,Start ,End
  G_WalkableMap.display();
  fill(0,255,0,100);
  rect(G_TargetPoint.x * resolution ,G_TargetPoint.y * resolution,resolution,resolution);

  // Call the appropriate steering behaviors for our agents
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].run();
  }
}
function mouseDragged(){
  if(mouseX > width || mouseY > height){
    return;
  }
  if(mouseButton != CENTER) {
    if(mouseButton == LEFT ){
      var x = int(constrain(mouseX / resolution,0,cols - 1));
      var y = int(constrain(mouseY / resolution,0,rows - 1));

      if(selectAction.value() == 'AddWall'){
        G_WalkableMap.walkable[x][y] = 0;
        UpdateFlowField();
      }else if(selectAction.value() == 'RemoveWall'){
        G_WalkableMap.walkable[x][y] = 1;
        UpdateFlowField();
      }else if(selectAction.value() == 'AddEntity'){
        var v = new Vehicle(mouseX,mouseY);
        vehicles.push(v);
      }else if(selectAction.value() == 'SetTarget'){
        SetTarget(mouseX / resolution,mouseY / resolution);
      }
    }
  }else{
    var v = new Vehicle(mouseX,mouseY);
    vehicles.push(v);
  }

}
function mouseClicked(){
  if(mouseX > width || mouseY > height){
    return;
  }

  if(selectAction.value() == 'SetTarget'){
    SetTarget(mouseX / resolution,mouseY / resolution);
    return;
  }else if(selectAction.value() == 'AddEntity'){
    var v = new Vehicle(mouseX,mouseY);
    vehicles.push(v);
  }
}

function SetTarget(_x,_y){
  G_TargetPoint.x = int(constrain(_x,0,cols - 1));
  G_TargetPoint.y = int(constrain(_y,0,rows - 1));
  UpdateFlowField();
}


function UpdateFlowField(){
  //TODO 检测是否和上次的目标位置一样
  G_HeatMap.upadte();
  G_FlowField.update();
}

let debugCheckBox;
let showGridCheckBox;
let heatMapCheckBox;
let addWallCheckBox;
let setTargetCheckBox;

function DebugCheckedEvent() {
  debug = this.checked();
}
function ShowGridCheckedEvent() {
  showGrid = this.checked();
}
function HeatMapCheckedEvent() {
  debugHeatMap = this.checked();
}

function SelectActionChange(){
}

function ClearEntities(){
  vehicles.length = 0;
}
