module.exports = class Coffee {
    constructor(description, price) {
        this.description = description
        this.price = price
    }

    getPrice() {
        return this.price
    }

    getDescription() {
        return this.description
    }
}