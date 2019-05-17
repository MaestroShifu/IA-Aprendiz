function Graph() {
    this.nodes = [];
    this.graph = {};
    this.end = null;
    this.start = null;
}

Graph.prototype.reset = function() {
    for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].searched = false;
        this.nodes[i].parent = null;
    }
}

Graph.prototype.setStart = function(actor) {
    this.setStart = this.graph[actor];

    return this.setStart;
}

Graph.prototype.setEnd = function(actor) {
    this.setEnd = this.graph[actor];

    return this.setEnd;
}

Graph.prototype.addNode = function(n) {
    //El nodo dentro del array
    this.nodes.push(n);
    var title = n.value;

    //Manejo de hash
    this.graph[title] = n;
}

//revisa si existe el nodo
Graph.prototype.getNode = function(actor) {
    var n = this.graph[actor];

    return n;
}