//Esto es un nodo 
function Node(val, x, y) {
    this.value = val;

    this.x = x;
    this.y = y;

    this.left = null; 
    this.right = null;
}

Node.prototype.visit = function(parent) {
    if(this.left != null) {
        this.left.visit(this);
    }

    console.log(this.value);
    fill(255);
    noStroke();
    text(this.value, this.x, this.y);
    stroke(255);
    line(parent.x, parent.y, this.x, this.y);

    if(this.right != null) {
        this.right.visit(this);
    }
}

//Agrega un nuevo nodo por izq o der [Organizando el menor a la izquierda]
Node.prototype.addNode = function(n) {
    if(n.value < this.value) {
        if(this.left === null) {
            this.left = n;

            this.left.x = this.x - 50;
            this.left.y = this.y + 20;
        } else {
            this.left.addNode(n);
        }
    } else if (n.value > this.value) {
        if(this.right === null) {
            this.right = n;

            this.right.x = this.x + 50;
            this.right.y = this.y + 20;
        } else {
            this.right.addNode(n);
        }
    }
}
  