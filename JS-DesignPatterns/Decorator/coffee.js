module.exports = class Coffee {
    constructor(description, price) {
        this.description = description
        this.price = price
    }

    getDescription() {
        return this.description
    }

    getPrice() {
        return this.price
    }
}