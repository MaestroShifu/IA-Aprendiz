function Vehicle (x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.position = createVector(x, y);

  this.r = 6;
  this.maxspeed = 5;
  this.maxforce = 0.5;

  this.health = 1;

  //Manejo de la IA
  this.dna = [];
  this.dna[0] = random(5, -5);
  this.dna[1] = random(5, -5);

  this.d = 25;//Opcional
}

Vehicle.prototype.update = function() {
  //Actualizar velocidad
  this.velocity.add(this.acceleration);

  //Limitar la velocidad
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);

  //Reinicia la velocidad 
  this.acceleration.mult(0);//->multiplicar vector por escalar
}

Vehicle.prototype.applyForce = function(force) {
  // Aceleracion = Fuerza / Masa
  this.acceleration.add(force);
}

//Maneja la direccion del agente con respecto al target
Vehicle.prototype.seek = function(target)  {
  var desired = p5.Vector.sub(target, this.position); //Resta de vectores para localizar el target

  //Extablece la magnitud del vector
  desired.setMag(this.maxspeed);

  //steering = desired - velocity
  var steer = p5.Vector.sub(desired, this.velocity);
  steer.limit(this.maxforce);

  return steer;
}

//Manjea los bordes de salida
Vehicle.prototype.boundaries = function() {
  let desired = null;

  if (this.position.x < this.d) {
    desired = createVector(this.maxspeed, this.velocity.y);
  } else if (this.position.x > width - this.d) {
    desired = createVector(-this.maxspeed, this.velocity.y);
  }

  if (this.position.y < this.d) {
    desired = createVector(this.velocity.x, this.maxspeed);
  } else if (this.position.y > height - this.d) {
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

Vehicle.prototype.behaviors = function(good, bad) {
  var steerG = this.eat(good);
  var steerB = this.eat(bad);

  steerG.mult(this.dna[0]);
  steerB.mult(this.dna[1]);

  this.applyForce(steerG);
  this.applyForce(steerB);
}

Vehicle.prototype.eat = function(listData) {
  var record = Infinity;
  var closestIndex = -1;

  for (let index = 0; index < listData.length; index++) {
    var distanceDifference = this.position.dist(listData[index]);//restamos los puntos para buscar la distancia

    if(distanceDifference < record) {
      record = distanceDifference;

      closestIndex = index;
    }
  }

  if(record < 5) {
    listData.splice(closestIndex, 1);
  } else if (closestIndex > -1) {
    return this.seek(listData[closestIndex]);
  }

  return createVector(0, 0)
}

//Visualizar el agente
Vehicle.prototype.display = function() {
  var angle = this.velocity.heading() + PI / 2;

  push();//Nuevo estado de dibujo
  
  //POsicionamiento
  translate(this.position.x, this.position.y);//Sirce para mover la figura
  rotate(angle);//Rota la fiogura
  
  //Sirve para testear el peso
  stroke(0, 255, 0);
  line(0, 0, 0, -this.dna[0] * 50);
  stroke(255, 0, 0);
  line(0, 0, 0, -this.dna[1] * 50);
  
  //Color y relleno
  fill(127);
  stroke(200);
  strokeWeight(1);
  stroke(255)
  //Tipo de contorno
  beginShape();

  //Puntos de la figura
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  
  endShape(CLOSE);

  pop();
}