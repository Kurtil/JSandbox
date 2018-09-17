const Prox = require('./proxy');
const Type = require('./type');

const myObject = new Type("XSL 5951");

const myProxy = new Prox(myObject);

console.log('--- direct call to object ---');
console.log(myObject.get());
console.log('--- call to object via proxy ---');
console.log(myProxy.get());