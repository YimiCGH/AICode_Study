function BinaryTree(){
  this.root = null;
  this.deep = 0;
}

BinaryTree.prototype.addValue = function(_val){
  var node =  new BNode(_val);
  if(this.root == null){
    this.root = node;
    node.x = 300;
    node.y = 20;
    return 0;
  }else {
    return this.root.addNode(node);
  }
}

BinaryTree.prototype.traverse = function(){
  this.root.visit();
}

BinaryTree.prototype.search = function(_val){
  return this.root.search(_val);
}

BinaryTree.prototype.draw = function(){
  this.root.draw(this.deep,this.root.x);
}
