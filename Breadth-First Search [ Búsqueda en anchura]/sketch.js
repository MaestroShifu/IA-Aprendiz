var data;
var graph;

var dropdown;

function preload() {
  data = dataMovie;
}

function setup() {
  graph = new Graph();

  dropdown = createSelect(); 
  dropdown.changed(bfs);

  noCanvas();

  var movies = data.movies;

  //Vamos a crear los nodos
  for (let i = 0; i < movies.length; i++) {
    var movie = movies[i].title;
    var cast = movies[i].cast;
    
    var movieNode = new Node(movie);//Creando nuevo nodo
    graph.addNode(movieNode);//Agregando nuevo nodo

    for (let j = 0; j < cast.length; j++) {
      var actor = cast[j];
      var actorNode = graph.getNode(actor);//->Lo busca en caso de existir el nodo  

      //Valida si ya existe el nodo
      if(actorNode == undefined) {
        actorNode = new Node(actor);
        dropdown.option(actor);
      } 
      
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode)
    }
  }

}


function bfs() {
  graph.reset();

  var start = graph.setStart(dropdown.value());
  var end = graph.setEnd("Avi Arad");
  
  console.log(graph);
  
  var queue = [];
  
  start.searched = true;
  
  queue.push(start);
  
  //Este es el algoritmo recursivo
  while(queue.length > 0) {
    var current = queue.shift();
  
    if(current == end) {
      console.log("Lo lograste: ", current.value);
      break;
    }
  
    var edges = current.edges;
  
    for (let i = 0; i < edges.length; i++) {
      var neightboor = edges[i];
      
      if(!neightboor.searched) {
        neightboor.searched = true;
  
        neightboor.parent = current;
        queue.push(neightboor);
      }
    }
  }
  
  
  //Regresamos por los nodos que se viajaron
  var path = [];
  path.push(end);
  
  var next = end.parent;
  
  while(next != null) {
    path.push(next);
    next = next.parent;
  }
  
  var txt = '';
  for (let i = path.length - 1; i >= 0; i--) {
    n = path[i];
  
    txt += n.value;
    if(i != 0) {
      txt += ' ---> ';
    }
  }
  
  createP(txt);
}