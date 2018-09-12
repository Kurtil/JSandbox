module.exports = class Animal {
    constructor(name) {
        this.name = name;
    }

    makeNoise() {
        console.log(`I am an animal named ${this.name}`);
    }
}