const AbstractFactory = require('./abstractFactory');

// An absctract factory is a set of factory methods

const productA = AbstractFactory.getProductA();

const productB =  AbstractFactory.getProductB();

console.log(productA.makeNoise());
console.log(productB.makeNoise());

// The main idea could be resume in this example :
// imagine an abstract factory that create web components
// you initiate the abstract factory by setting some config.
// This config could be the platform like : mobile, IE, chrome... and the product
// returned will be environment specific ;)