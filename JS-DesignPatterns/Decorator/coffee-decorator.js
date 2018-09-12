// a decorator "is a" and "has a"

module.exports = class CoffeeDecorator extends Coffee{
    constructor(coffee, description, price) {
        super(description, price)
        this.coffee = coffee
    }

    // Here, the coffee methods are overidden.
    // The methode of the ("has a") coffee are called
    // with an extra : it is decorated
    // Here, we van imagine the "this.decription" and "this.price" are the decorations added to
    // the ("has a") coffee
    getDescription() {
        return this.coffee.getDescription() + this.description
    }

    getPrice() {
        return this.coffee.getPrice() + this.price
    }
}