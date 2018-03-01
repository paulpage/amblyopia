function Snake() {
    this.x = 0;
    this.y = 0;
    this.vx = 1;
    this.vy = 0;
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
        this.x += this.vx * scl;
        this.y += this.vy * scl;

        // constrain location to within canvas boundaries
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    this.show = function() {
        fill(snakeColor);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
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
