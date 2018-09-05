let Point = function(x, y) {
    this.x = x
    this.y = y
}

Point.prototype.getCoordinate = function() {
    return this.x + " " + this.y
}

let point1 = new Point(10,20)
console.log(point1.getCoordinate())