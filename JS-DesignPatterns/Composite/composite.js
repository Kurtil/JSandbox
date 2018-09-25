module.exports = class Composite {
    constructor(price, elements = []) {
        this.price = price;
        this.elements = elements;
    }

    addElement(element) {
        this.elements.push(element);
    }

    getPrice() {
        return this.elements.reduce((acc, element) => acc + element.getPrice(), this.price);
    }
}
