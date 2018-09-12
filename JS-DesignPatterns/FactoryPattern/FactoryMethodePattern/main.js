const animalFactory = require('./animalFactory');

// The logic of creaztion is not part of this file ;)
const animal1 = animalFactory.createAnimal();
animal1.makeNoise();

const animal2 = animalFactory.createAnimal();
const animal3 = animalFactory.createAnimal();
const animal4 = animalFactory.createAnimal();
const animal5 = animalFactory.createAnimal();
const animal6 = animalFactory.createAnimal();

[animal2, animal3, animal4, animal5, animal6].forEach(animal => animal.makeNoise());

// To go further, we can pass arguments to the factory to act on the logic ... ;)