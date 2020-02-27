function BNode(_value,_x = 0,_y = 0){
  this.value = _value;
  this.left = null;
  this.right = null;
  this.x = _x;
  this.y = _y;
  this.parent = null;
  this.level = 0;
  this.dir = 0;//用来确定相对于在父节点的左边-1还是右边1
}

BNode.prototype.addNode = function(_node){
  if(_node.value < this.value){
    if(this.left == null){
      this.left = _node;
      _node.dir = -1;

      _node.x = this.x - 30;
      _node.y = this.y + 30;
      _node.parent = this;
      _node.level = this.level + 1;
      return _node.level
    }else{
      return this.left.addNode(_node);
    }
  }else{
    if(this.right == null){
      this.right = _node;
      _node.dir = 1;

      _node.x = this.x + 30;
      _node.y = this.y + 30;
      _node.parent = this;
      _node.level = this.level + 1;
      return _node.level;
    }else{
      return this.right.addNode(_node);
    }
  }
}

BNode.prototype.visit = function(){
  if(this.left != null){
    this.left.visit();
  }
  //
  console.log(this.value);
  if(this.right != null){
    this.right.visit();
  }
}

BNode.prototype.search = function(_val){
  if(this.value == _val){
    return this;
  }else{
    if(_val < this.value){
      if(this.left == null){
        return null;
      }else{
        return this.left.search(_val);
      }
    }else{
      if(this.right == null){
        return null;
      }else{
        return this.right.search(_val);
      }
    }
  }
}

BNode.prototype.PrettyXPos = function(_deep){
  var x_offset = pow(2,_deep - 1) - 1;
  if(x_offset > 0){
    x_offset *= 30 * 0.5 * this.dir;
    //console.log(`offset = ${x_offset}`);
  }else {
    x_offset = 0;
  }
  return this.x + x_offset;
}

BNode.prototype.draw = function(_deep,_parentX){
  var x_offset = pow(2,_deep - 1) - 1;
  if(x_offset > 0){
    x_offset *= 15 * 0.5 ;
    //console.log(`offset = ${x_offset}`);
  }else {
    x_offset = 0;
  }

  var xPos = this.x + x_offset * this.dir;

  if(this.left != null){
    this.left.draw(_deep,xPos);
  }
  //var xPos = this.PrettyXPos(_deep);


  noStroke();
  ellipse(xPos,this.y,24,24);
  textAlign(CENTER)
  text(this.value,xPos,this.y);
  stroke(255);
  if(this.parent != null){
    line(_parentX ,this.parent.y,xPos,this.y);
  }

  if(this.right != null){
    this.right.draw(_deep,xPos);
  }
}
