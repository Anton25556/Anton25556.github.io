// 2D Ray Casting

let b;

function setup() {
    createCanvas(400, 400);
    b = new boundary(300, 100, 300, 300);
}

function draw() {
    background(0);
    b.show();
}