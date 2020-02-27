class Particle {
  constructor(x,y){
    this.pos = createVector(x,y);
    this.rays = [];
    for (let i = 0; i < 360; i+= 1) {
      this.rays.push( new Ray(this.pos,radians(i)));
    }
  }
  update(x,y){
    this.pos.x = x;
    this.pos.y = y;
  }
  look(walls){
    for (var ray of this.rays) {
      let record = Infinity;
      let closet = null;
      for (var wall of walls) {
        const pt = ray.cast(wall);
        if(pt){
          const d = p5.Vector.dist(this.pos,pt);
          if(d < record){
            closet = pt;
            record = d;
          }
        }
      }
      if(closet){
        stroke(255,100);
        line(this.pos.x,this.pos.y,closet.x,closet.y);
      }

    }
  }

  show(){
    fill(255);
    ellipse(this.pos.x,this.pos.y,4);
    // for (var i = 0; i < this.rays.length; i++) {
    //   this.rays[i].show();
    // }
    for (var ray of this.rays) {
      ray.show();
    }
  }
}
