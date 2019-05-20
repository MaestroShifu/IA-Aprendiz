let v;
let a;
let s;

let d = 25;

function setup() {
    createCanvas(1820, 730);

    v = new Vehicle(width / 2, height / 2);
    a = new Vehicle(width / 1, height / 1);
    s = new Vehicle(width / 5, height / 5);
}

function draw() {
    background(51);

    let mouse = createVector(mouseX, mouseY);

    //Pintar un circulo en el mouse
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(mouse.x, mouse.y, 48, 48);


    v.boundaries();
    v.arrive(mouse);
    v.update();
    v.display();

    a.boundaries();
    a.arrive(mouse);
    a.update();
    a.display();

    s.boundaries();
    s.arrive(mouse);
    s.update();
    s.display();
}