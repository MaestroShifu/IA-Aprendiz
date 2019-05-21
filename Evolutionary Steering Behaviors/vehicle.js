// var mutation =  0.01;
var mutation =  0.1;

function Vehicle (x, y, dna) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(0, -2);
  this.position = createVector(x, y);

  this.r = 4;
  this.maxspeed = 5;
  this.maxforce = 0.5;

  this.health = 1;
  
  //Manejo de la IA
  this.dna = [];
  if(dna === undefined) {
    // Comida - Peso
    this.dna[0] = random(2, -2);
    // Veneno - Peso
    this.dna[1] = random(2, -2);
    // Comida - perception 
    this.dna[2] = random(0, 100);
    // veneno - perception
    this.dna[3] = random(0, 100);
  } else {
    //Mutacion
    this.dna[0] = dna[0];
    if(random(1) < mutation) {
      this.dna[0] += random(-0.1, 0.1);
    }

    this.dna[1] = dna[1];
    if(random(1) < mutation) {
      this.dna[1] += random(-0.1, 0.1);
    }

    this.dna[2] = dna[2];
    if(random(1) < mutation) {
      this.dna[2] += random(-10, 10);
    }

    this.dna[3] = dna[3];
    if(random(1) < mutation) {
      this.dna[3] += random(-10, 10);
    }
  }

}

Vehicle.prototype.update = function() {
  //Pierde salud
  this.health -= 0.01;

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
  let d = 25;//Opcional

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

Vehicle.prototype.behaviors = function(good, bad) {
  var steerG = this.eat(good, 0.3, this.dna[2]);
  var steerB = this.eat(bad, -0.75, this.dna[3]);

  steerG.mult(this.dna[0]);
  steerB.mult(this.dna[1]);

  this.applyForce(steerG);
  this.applyForce(steerB);
}

//Para morir el agente
Vehicle.prototype.dead = function() {
  return (this.health < 0);
}

//Funcion para comer
Vehicle.prototype.eat = function(listData, nutrition, perception) {
  var record = Infinity;
  var closest = null;

  for (let index = (listData.length - 1); index >= 0; index--) {
    var distanceDifference = this.position.dist(listData[index]);//restamos los puntos para buscar la distancia

    if(distanceDifference < this.maxspeed) {
      listData.splice(index, 1);
  
      //Manejo de la comida
      this.health += nutrition;
    } else {
      if(distanceDifference < record && distanceDifference < perception) {//-> manejo de la distancia de la comida y de la percepcion (alcance)
        record = distanceDifference;
  
        closest = listData[index];
      }
    }

  }

  //Esta comiendo en este momento
  if (closest != null) {
    return this.seek(closest);
  }

  return createVector(0, 0)
}

//Se reproduce el agente
Vehicle.prototype.cloneMe = function() {
  if(random(1) < 0.005) {
    return new Vehicle(this.position.x, this.position.y, this.dna);
  } else {
    return null;
  }
}

//Visualizar el agente
Vehicle.prototype.display = function() {
  var angle = this.velocity.heading() + PI / 2;

  push();//Nuevo estado de dibujo
  
  //POsicionamiento
  translate(this.position.x, this.position.y);//Sirce para mover la figura
  rotate(angle);//Rota la fiogura
  
  //Sirve para testear 
  if(debug.checked()) {
    //Comida
    strokeWeight(3);
    stroke(0, 255, 0);
    noFill();
    line(0, 0, 0, -this.dna[0] * 50);//-> El peso
    strokeWeight(2);
    ellipse(0 , 0, this.dna[2] * 2);//-> La precepcion
  
    //Veneno
    stroke(255, 0, 0);
    line(0, 0, 0, -this.dna[1] * 50);//-> El peso
    ellipse(0 , 0, this.dna[3] * 2);//-> La precepcion
  }

  
  //Color y relleno
  var green = color(0, 255, 0);
  var red = color(255, 0, 0);
  var col = lerpColor(red, green, this.health);//Genera una interpolacion entre colores

  fill(col);
  stroke(col);
  strokeWeight(1);

  //Tipo de contorno
  beginShape();

  //Puntos de la figura
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  
  endShape(CLOSE);

  pop();
}