function Vehicle (x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.position = createVector(x, y);

  this.r = 6;
  this.maxspeed = 4;
  this.maxforce = 0.1;
}

Vehicle.prototype.update = function() {
  //Actualizar velocidad
  this.velocity.add(this.acceleration);

  //Limitar la velocidad
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);

  //Reinicia la velocidad 
  this.acceleration.mult(0);
}

Vehicle.prototype.applyForce = function(force) {
  // Aceleracion = Fuerza / Masa
  this.acceleration.add(force);
}

//Maneja la direccion del agente con respecto al target
Vehicle.prototype.arrive = function(target)  {
  var desired = p5.Vector.sub(target, this.position); //Resta de vectores para localizar el target

  //Extablece la magnitud del vector
  desired.setMag(this.maxspeed);

  //steering = desired - velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce); //Extablece la magnitud del vector

  this.applyForce(steer);
}

//Manjea los bordes de salida
Vehicle.prototype.boundaries = function() {
  let desired = null;

  if (this.position.x < d) {
    desired = createVector(this.maxspeed, this.velocity.y);
  } else if (this.position.x > width - d) {
    desired = createVector(-this.maxspeed, this.velocity.y);
  }

  if (this.position.y < d) {
    desired = createVector(this.velocity.x, this.maxspeed);
  } else if (this.position.y > height - d) {
    desired = createVector(this.velocity.x, -this.maxspeed);
  }

  if (desired !== null) {
    desired.normalize();
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
}

//Visualizar el agente
Vehicle.prototype.display = function() {
  var theta = this.velocity.heading() + PI / 2;

  //Color y relleno
  fill(127);
  stroke(200);
  strokeWeight(1);
  push();//Nuevo estado de dibujo

  //POsicionamiento
  translate(this.position.x, this.position.y);//Sirce para mover la figura
  rotate(theta);//Rota la fiogura
  
  //Tipo de contorno
  beginShape();

  //Puntos de la figura
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  
  endShape(CLOSE);


  pop();
}