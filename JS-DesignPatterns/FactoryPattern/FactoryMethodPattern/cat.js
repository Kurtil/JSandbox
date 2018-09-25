const Animal = require('./animal');

module.exports = class Cat extends Animal{
    constructor(name) {
        super(name);
    }

    makeNoise() {
        console.log(`Meow !! My name is ${this.name}`);
    }
}