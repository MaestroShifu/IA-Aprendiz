var tree;

function setup() {
  // put setup code here
  createCanvas(1000, 400);
  background(51);
  
  tree = new Tree();

  for (let index = 0; index < 100; index++) {
    tree.addValue(floor(random(0,25)));
  }

  // tree.addValue(5);
  // tree.addValue(3);
  // tree.addValue(10);
  // tree.addValue(1);

  console.log(tree);
  tree.traverse();
}