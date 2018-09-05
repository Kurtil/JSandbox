module.exports = class CoffeeDecorator extends Coffee{
    constructor(coffee, description, price) {
        super(description, price)
        this.coffee = coffee
    }

    getDescription() {
        return this.coffee.getDescription() + this.description
    }

    getPrice() {
        return this.coffee.getPrice() + this.price
    }
}