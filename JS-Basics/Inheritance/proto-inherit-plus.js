function Personne(firstName, lastName, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
}

Personne.prototype.getFullName = function() {
    return `My name is ${this.firstName} ${this.lastName}`
}

Personne.prototype.getAge = function() {
    return `I am ${this.age} years old`
}

function SubPersonne(firstName, lastName, age, bonus) {
    Personne.call(this, firstName, lastName, age)

    this.bonus = bonus
}

SubPersonne.prototype = Object.create(Personne.prototype)
SubPersonne.prototype.constructor = SubPersonne

SubPersonne.prototype.getBonus = function() {
    return this.bonus
}

let pers = new Personne("John", "Doe", 20)
let sub1 = new SubPersonne('joe', 'hey', 12, "bonus")

Personne.prototype.scream = function() {
    return `Hooooooooo ${this.firstName}`
}

console.log(sub1.scream())

console.log("end")