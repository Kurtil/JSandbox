const Dog = require('./dog');
const Cat = require('./cat');

class AnimalFactory {

    // The creation logic is encapsulated in the factory
    createAnimal() {
        let animalToReturn;
        const random = Math.random() * 10;
        if (random >= 5) {
            animalToReturn = new Dog(`Dog${random}`);
        } else {
            animalToReturn = new Cat(`Cat${random}`);
        }
        return animalToReturn;
    }
}

module.exports = new AnimalFactory();