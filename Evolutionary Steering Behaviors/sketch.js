var vehicle = [];
var food = [];
var poison = [];

var debug;

function setup() {
    // createCanvas(640, 360);

    createCanvas(800, 600);

    //Crear nuevos vehiculos
    for (let index = 0; index < 20; index++) {
        vehicle.push(new Vehicle(random(width), random(height)));
    }

    //Manejo de la comida
    for (let index = 0; index < 80; index++) {
        food.push(createVector(random(width), random(height)));
    }

    //Manejo del veneno
    for (let index = 0; index < 30; index++) {
        poison.push(createVector(random(width), random(height)));
    }

    debug = createCheckbox("Debug");
}

function draw() {
    background(51);

    if(random(1) < 0.2) {
        food.push(createVector(random(width), random(height)));
    }

    if(random(1) < 0.02) {
        poison.push(createVector(random(width), random(height)));
    }

    //Renderizar la comida
    for (let index = 0; index < food.length; index++) {
        fill(0, 255, 0);
        noStroke();

        ellipse(food[index].x, food[index].y, 4, 4);
    }

    //Renderizar el veneno
    for (let index = 0; index < poison.length; index++) {
        fill(255, 0, 0);
        noStroke();

        ellipse(poison[index].x, poison[index].y, 4, 4);
    }

    //manejo de los vehiculos
    for (let index = (vehicle.length - 1) ; index >= 0; index--) {
        vehicle[index].boundaries();
        vehicle[index].behaviors(food, poison);
        vehicle[index].update();
        vehicle[index].display();

        var newVehicle = vehicle[index].cloneMe(); 

        if(newVehicle != null) {
            vehicle.push(newVehicle);
            food.push(createVector(vehicle[index].position.x, vehicle[index].position.y));
        }

        if(vehicle[index].dead()) {
            vehicle.splice(index, 1);
        }
    }
}