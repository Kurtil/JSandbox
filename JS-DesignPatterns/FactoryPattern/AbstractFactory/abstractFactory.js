const AnimalFactory = require('../FactoryMethodePattern/animalFactory');

class BastractFactory {
    constructor(factoryA, factoryB) {
        this.factoryA = factoryA;
        this.factoryB = factoryB;
    }

    // we will reuse the factory of the methode factory pattern...
    // but it could be more meaningfull to use different ones... for different
    // implementation of the abstractFacotry pattern.
    getProductA() {
        return this.factoryA.createAnimal();
    }

    getProductB() {
        return this.factoryA.createAnimal();
    }
}

module.exports = new BastractFactory(AnimalFactory, AnimalFactory);