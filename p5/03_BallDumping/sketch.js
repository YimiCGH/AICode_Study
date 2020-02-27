var Balls = [];

function setup() {
  // put setup code here
  createCanvas(400,400);
}

function draw() {
  // put drawing code here
  background(0);

  for (var i = 0; i < Balls.length; i++) {
    //Balls[i].move();
    Balls[i].show();
  }

  if(Balls.length > 10){
    Balls.splice(0,1);
  }
}

// function mousePressed(){
//   var clickOnBall = false;
//   for (var i = Balls.length - 1; i >= 0; i--) {
//     if(Balls[i].click(mouseX,mouseY)){
//       clickOnBall = true;
//
//       Balls.splice(i,1);
//     }
//   }
//
//   if(!clickOnBall){
//     let ball = new Ball(mouseX,mouseY,24);
//     Balls.push(ball);
//   }else{
//     console.log("Click on Ball");
//   }
// }

function mouseDragged(){
  let ball = new Ball(mouseX,mouseY,24);
  Balls.push(ball);
}
