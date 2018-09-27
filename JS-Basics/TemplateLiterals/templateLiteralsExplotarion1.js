// Nested template literals
const bool = true;
const str = `Yo ${bool ? `jose is ${bool}` : `jose is note bool`}`

console.log(str);

// tagged template literals
// can return anything :P
const tag = (strings, ...values) => {
    return arg => `Not forced to return what you think ;) ${strings.length} ${values.length} with arg ${arg}`;
}

const message = 'jose';
const message2 = 'jean';
console.log(tag`Coucou je suis ${message} et je ne suis pas ${message2}`('Hahaha'));
