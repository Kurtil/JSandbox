module.exports = class Espresso extends Coffee {
    constructor(description, price) {
        super(description + " as espresso", price + 1)
    }
}