var backgroundColor = 'black';
var snakeColor = '#0000ff';
var foodColor = '#aa0202';
var gui;

var snake;
var food;
var scl;
var movementQueue = [];
var score;
var scoreElement;
var growthFactor = 5;
var gridSize = 20;

function windowResized() {
    // set canvas size to the largest square that can fit in the window
    var size = min(windowWidth, windowHeight);
    resizeCanvas(size, size);
    scl = size / gridSize;
}

function setup() {
    // set canvas size to the largest square that can fit in the window
    var size = min(windowWidth, windowHeight);
    createCanvas(size, size);
    scl = size / gridSize;

    // create gui
    gui = createGui('Settings');
    gui.addGlobals('snakeColor', 'foodColor');

    frameRate(10);

    // initialize game
    snake = new Snake();
    score = 0;
    newFood();
}

function newFood() {
    food = createVector(floor(random(gridSize)), floor(random(gridSize)));
}

function draw() {
    background(backgroundColor);

    fill(foodColor);
    rect(food.x * scl, food.y * scl, scl, scl);

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
        newFood();
        score++;
    }

    textSize(32);
    fill('white');
    text('Score: ' + score, 20, height - 20);
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

