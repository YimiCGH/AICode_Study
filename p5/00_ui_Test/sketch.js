var button;
function setup() {
  // put setup code here
  createCanvas(400,400);

  createP('');

  button = createButton("go");
  button.mousePressed(ClickButton);
  createSlider(0,100,12);
}

function draw() {
  // put drawing code here
  background(0);
}

function ClickButton(){
  console.log("Click");

}
