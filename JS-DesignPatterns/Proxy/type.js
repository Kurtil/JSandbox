module.exports = class Obj {

    constructor(mainProperty) {
        this.mainProperty = mainProperty;
    }

    get() {
        return `My main property is ${this.mainProperty}`;
    }
}