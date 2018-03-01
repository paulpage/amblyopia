function Snake() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 1;
    this.size = 0;
    this.growthQueue = 0;
    this.tail = [];

    this.death = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                this.size = 0;
                this.tail = [];
                return true;
            }
        }
        return false;
    }

    this.update = function() {
        if (this.growthQueue > 0) {
            this.growthQueue--;
            this.size++;
        }

        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.size >= 1) {
            this.tail[this.size - 1] = createVector(this.x, this.y);
        }

        // update location
        this.x += this.vx;
        this.y += this.vy;

        // constrain location to within canvas boundaries
        this.x = constrain(this.x, 0, gridSize - 1);
        this.y = constrain(this.y, 0, gridSize - 1);
    }

    this.show = function() {
        fill(snakeColor);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x * scl, this.tail[i].y * scl, scl, scl);
        }
        rect(this.x * scl, this.y * scl, scl, scl);
    }
    this.dir = function(vect) {
        this.vx = vect.x;
        this.vy = vect.y;
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.growthQueue += growthFactor;
            return true;
        } else {
            return false;
        }
    }
}
