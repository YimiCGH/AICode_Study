class Bubble {
  constructor(x,y,r,xSpeed,ySpeed) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.speed = {x : xSpeed , y :ySpeed};
    this.color = {r:random(0,255),g:random(0,255),b:random(0,255),a:255};
  }

  move()
  {
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  changeColor()
  {
    this.color = {r:random(0,255),g:random(0,255),b:random(0,255),a:255};
  }

  bounce(width,height)
  {
    if((this.x + this.radius) > width || (this.x - this.radius) < 0){
      this.speed.x *= -1;
      this.changeColor();
    }
    if((this.y + this.radius) > height || (this.y - this.radius) < 0){
      this.speed.y *= -1;
      this.changeColor();
    }
  }

  show()
  {
    stroke(255)
    //strokeWeight(4);
    noStroke();
    //noFill();
    fill(this.color.r,this.color.g,this.color.b,this.color.a);
    ellipse(this.x,this.y,this.radius,this.radius);
  }
}
