// With composite pattern, clients can treat individual objects and compositions of objects uniformly.

const Composite = require('./composite');
const Element = require('./element');

const composite = new Composite(14);

console.log(composite.getPrice());

const element1 = new Element(2);

console.log(element1.getPrice());

composite.addElement(element1);

console.log(composite.getPrice());

composite.addElement(new Element(5));
composite.addElement(new Element(3));
composite.addElement(new Element(12));

console.log(composite.getPrice());

// To go further, a composite can also be composed of other composites.

const composite2 = new Composite(2 ,[new Element(5), new Element(2), composite]);

console.log(composite2.getPrice());
