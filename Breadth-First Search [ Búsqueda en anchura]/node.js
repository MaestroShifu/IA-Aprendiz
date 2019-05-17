function Node (value) {
    this.value = value;
    this.edges = [];
    this.searched = false;
    this.parent = null;
}   

Node.prototype.addEdge = function(n) {
    this.edges.push(n);

    n.edges.push(this);
}