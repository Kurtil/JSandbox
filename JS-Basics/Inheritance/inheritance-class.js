class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    static printPoint() {
        console.log("Point")
    }

    getCoordinate() {
        return this.x + ' ' + this.y
    }
}

let point = new Point(2, 3)
let point2 = new Point(10, 20)

console.log(point.getCoordinate())
console.log(point2.getCoordinate())