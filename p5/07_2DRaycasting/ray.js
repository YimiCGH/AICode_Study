class Ray{
  constructor(pos,angle){
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }
  show(){
    stroke(255);
    push();
    translate(this.pos.x,this.pos.y);
    line(0,0,this.dir.x * 10,this.dir.y * 10);
    pop();
  }

  lookAt(x,y){
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  cast(wall){
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
    //分母为0，表示两线段不相交，即平行
    if(den == 0){
      return ;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;// 如果 0 <= t <= 1.0，表示交点落在第一个线段内
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;//如果 0 <= u <= 1.0 ，表示交点落在第二个线段内

    if(t > 0 && t < 1 && u > 0){
      //因为第二条线是射线而不是线段，所以，我们只截取正方向
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);

      return pt;
    }else{
      return ;
    }
  }
}
