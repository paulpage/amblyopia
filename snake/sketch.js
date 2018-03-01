var backgroundColor = 'black';
var snakeColor = '#0000ff';
var foodColor = '#aa0202';
var gui;

var snake;
var food;
var scl = 20;
var movementQueue = [];
var score;
var scoreElement;
var growthFactor = 5;

function setup() {
    gui = createGui('Settings');
    gui.addGlobals('snakeColor', 'foodColor');
    createCanvas(600, 600);
    frameRate(10);

    scoreElement = createP("Score: 0");

    snake = new Snake();
    score = 0;
    pickLocation();
}

function pickLocation() {
    var cols = floor(width/scl);
    var rows = floor(height/scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function draw() {
    scoreElement.html("Score: " + score);
    background(backgroundColor);

    fill(foodColor);
    rect(food.x, food.y, scl, scl);

    if (snake.death()) {
        score = 0;
    }

    if (movementQueue.length > 0) {
        snake.dir(movementQueue[0]);
        movementQueue.splice(0, 1);
    }


    snake.update();
    snake.show();


    if (snake.eat(food)) {
        pickLocation();
        score++;
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        movementQueue.push(createVector(0, -1));
    } else if (keyCode === DOWN_ARROW) {
        movementQueue.push(createVector(0, 1));
    } else if (keyCode === RIGHT_ARROW) {
        movementQueue.push(createVector(1, 0));
    } else if (keyCode === LEFT_ARROW) {
        movementQueue.push(createVector(-1, 0));
    }
}

