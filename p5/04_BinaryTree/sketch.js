  var tree;

function setup() {
  createCanvas(600,400);
  background(51);

  tree = new BinaryTree();


  for (var i = 0; i < 10; i++) {
    var level = tree.addValue(floor(random(0,100)));
    if(level > tree.deep)
      tree.deep = level;
  }


  tree.traverse();



  // var res = tree.search(6);
  // console.log(res);
  //
  // var res2 = tree.search(2);
  // console.log(res2);

}

function draw() {  
  tree.draw();
}
