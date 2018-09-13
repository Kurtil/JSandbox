const Singleton = require('./singleton');

console.log(Singleton.getInstance().id);
console.log(Singleton.getInstance().id);
console.log(Singleton.getInstance().id);
console.log(Singleton.getInstance().id);
console.log(Singleton.getInstance().id);
console.log(Singleton.getInstance().id);

// This is always the same instance that is returned !