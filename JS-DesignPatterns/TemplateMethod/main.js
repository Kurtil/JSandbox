// The factory methode provides an template of a methode that will not vary.
// User can add varried parts in this algo when instanciating classes.
const ConcreteGreeting = require('./concreteGreeting');

const greeting1 = new ConcreteGreeting(() => console.log('coucou'), () => console.log('Bye'));
const greeting2 = new ConcreteGreeting(() => console.log('Hey'), () => console.log('Hasta louego.... ????'));

greeting1.templateMethode();
greeting2.templateMethode();
