var vehicle = [];
var food = [];
var poison = [];

function setup() {
    createCanvas(1820, 730);

    //Crear nuevos vehiculos
    for (let index = 0; index < 10; index++) {
        vehicle.push(new Vehicle(random(width), random(height)));
    }

    //Manejo de la comida
    for (let index = 0; index < 50; index++) {
        food.push(createVector(random(width), random(height)));
    }

    //Manejo del veneno
    for (let index = 0; index < 50; index++) {
        poison.push(createVector(random(width), random(height)));
    }
}

function draw() {
    background(51);

    //Renderizar la comida
    for (let index = 0; index < food.length; index++) {
        fill(0, 255, 0);
        noStroke();

        ellipse(food[index].x, food[index].y, 8, 8);
    }

    //Renderizar el veneno
    for (let index = 0; index < poison.length; index++) {
        fill(255, 0, 0);
        noStroke();

        ellipse(poison[index].x, poison[index].y, 8, 8);
    }

    //manejo de los vehiculos
    for (let index = 0; index < vehicle.length; index++) {
        vehicle[index].behaviors(food, poison);
        vehicle[index].update();
        vehicle[index].display();
    }
}