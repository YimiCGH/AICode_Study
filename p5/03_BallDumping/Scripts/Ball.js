class Ball {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.color = {r:random(0,255),g:random(0,255),b:random(0,255),a:255};

    this.speed = {x:0,y:2};
  }

  show(){
    fill(this.color.r,this.color.g,this.color.b);
    ellipse(this.x,this.y,this.r,this.r);
  }

  move(){
    this.y += this.speed.y;

    if(this.y + this.r > 400 || this.y - this.r < 0){
      this.speed.y *= -1;
    }
  }

  click(x,y){
    var d = dist(x,y,this.x,this.y);
    if(d < this.r){
      return true;
    }
    return false;
  }
}
