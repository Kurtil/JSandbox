Coffee = require('./coffee')
Espresso = require('./espresso')
CoffeeDecorator = require('./coffee-decorator')

let espresso = new Espresso('myEspresso', 4)

let espressoChocolate = new CoffeeDecorator(espresso, " with chocolate", 3)

let espresso2xChocolate = new CoffeeDecorator(espressoChocolate, " with chocolate", 3)

console.log(espresso.getPrice(), espresso.getDescription())
console.log(espressoChocolate.getPrice(), espressoChocolate.getDescription())
console.log(espresso2xChocolate.getPrice(), espresso2xChocolate.getDescription())
