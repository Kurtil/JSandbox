const a = Symbol('coucou');

const b = {a:'coucou'};
b[a] = 'joe';

for(let el in b) {
    console.log(el)
}
console.log(Object.getOwnPropertySymbols(b));
console.log(Symbol.keyFor(b));
console.log('end of file');