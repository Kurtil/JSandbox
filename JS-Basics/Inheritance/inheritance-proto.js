let point = {
    x : 10,
    y : 20
}

// inheritance with __proto__ property
let point3D = {
    z : 30,
    __proto__ : point
}

// inheritance with Object.create methode
let point3D2 = Object.create(point)
point3D2.z = 40

console.log(point3D.x, point3D.y, point3D.z)
console.log(point3D2.x, point3D2.y, point3D2.z)

console.log(point3D.x, point3D.y, point3D.z)
point.x = -10
console.log(point3D.x, point3D.y, point3D.z)
console.log(point3D2.x, point3D2.y, point3D2.z)