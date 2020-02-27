var m_width = 600;
var m_height = 400;
var rectCenter = {
  x : 300,
  y : 200
};
var dir = 1;
var extraCanvas ;

function setup() {
  createCanvas(m_width, m_height);
  extraCanvas= createGraphics(m_width,m_height);
  extraCanvas.clear();
  background(250,250,100);

}

function draw() {
  rectCenter.x += dir;
  var bg_col = map(rectCenter.x,0,m_width,0,255);

  background(bg_col);

  image(extraCanvas,0,0)

  if(mouseIsPressed){
    extraCanvas.fill(250,200,200,50);
    extraCanvas.noStroke();
    extraCanvas.ellipse(mouseX,mouseY,200,200);
  }

  fill(200,250,200);
  rectMode(CENTER);




  if(rectCenter.x >= m_width || rectCenter.x <= 0){
    dir = -dir;
    rectCenter.y = random(0,m_height);
  }

  rect(rectCenter.x,rectCenter.y,50,50);
}

function mousePressed(){
  dir = -dir;

}
