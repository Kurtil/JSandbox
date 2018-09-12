const Animal = require('./animal');

module.exports = class Dog extends Animal{
    constructor(name) {
        super(name);
    }

    makeNoise() {
        console.log(`Woaf !! My name is ${this.name}`);
    }
}