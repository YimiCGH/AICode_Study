function Wall (_x,_y,_width,_height){
  this.x = _x;
  this.y = _y;
  this.w = _width;
  this.h = _height;
  this.inView = false;
}
Wall.prototype.Display = function(){
  if(this.inView){
    fill(255,0,0,120);
  }else{
    fill(0);
  }
  rectMode(CENTER);
  rect(this.x,this.y,this.w,this.h);
}

Wall.prototype.ContainPoint = function(_x,_y){
  var xOffset = abs(_x- this.x);
  var yOffset = abs(_y- this.y);

  if(xOffset < (this.w * 0.5) && yOffset < (this.h*0.5)){
    return true;
  }
  return false;
}
//获取墙壁的法线方向以及沿墙方向
Wall.prototype.GetNormalAndSideDir = function(_location,_forward,_View){
  var xOffset = this.w * 0.5;
  var yOffset = this.h * 0.5;

  var points = [];
  points[0] = createVector(this.x - xOffset,this.y - yOffset);
  points[1] = createVector(this.x + xOffset,this.y - yOffset);
  points[2] = createVector(this.x + xOffset,this.y + yOffset);
  points[3] = createVector(this.x - xOffset,this.y + yOffset);



  var normal = null;
  var closet = null;//和墙壁的交点
  var conner = null;//距离行驶方向最近的角点
  var dis = Infinity;
  var f_dir =p5.Vector.sub(_location,_forward).normalize();

  for (var i = 0; i < 4; i++) {
    var p1 = points[i % 4];
    var p2 = points[(i+1)%4];

    var rates = CrossPoint(_location,_forward,p1,p2);
    //rates.t 为交点在视线上的百分比，rates.u为交点在墙壁上的百分比
    if(rates){

      pt = createVector();
      pt.x = p1.x + rates.u * (p2.x - p1.x);
      pt.y = p1.y + rates.u * (p2.y - p1.y);
      //ellipse(pt.x,pt.y,8,8);

      var d = p5.Vector.dist(_location,pt);
      if(d < dis){
        dis = d;
        var lineDir = p5.Vector.sub(p2,p1).normalize();
        var dot = p5.Vector.dot(f_dir,lineDir);

        if(dot > 0){
          conner = p1;
        }else{
          conner = p2;
        }

        closet = pt;
        normal = createVector(lineDir.y,-lineDir.x).normalize().setMag(_View * (1-rates.t));
      }
    }
  }

  if(normal != null){
    fill(255,0,0);
    ellipse(conner.x,conner.y,8,8);
    var sideDir = p5.Vector.sub(conner,closet);
    return {n:normal,s:sideDir};
  }

  return ;
}


function CrossPoint(_p1,_p2,_p3,_p4){
  const x1 = _p1.x;
  const y1 = _p1.y;
  const x2 = _p2.x;
  const y2 = _p2.y;

  const x3 =_p3.x;
  const y3 = _p3.y;
  const x4 = _p4.x;
  const y4 = _p4.y;



  const den = (x1-x2) * (y3-y4) - (y1-y2) * (x3-x4);
  //分母为0，表示两线段不相交，即平行
  if(den == 0){
    return null;
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;// 如果 0 <= t <= 1.0，表示交点落在第一个线段内
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;//如果 0 <= u <= 1.0 ，表示交点落在第二个线段内

  if(t > 0 && t < 1 && u > 0 && u < 1){
    //因为第二条线是射线而不是线段，所以，我们只截取正方向
    // const pt = createVector();
    // pt.x = x1 + t * (x2 - x1);
    // pt.y = y1 + t * (y2 - y1);

    return {t:t,u:u};
  }else{
    return null;
  }

}
