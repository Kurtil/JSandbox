const monoLog = (arg) => console.log(arg);

const arr = ["coucou", "jean", 24];

Array.prototype.extraArrProp = {};
Object.prototype.extraObjProp = {};

const directSymb = Symbol('this is the direct symbol property');
const undirectSymb = Symbol('this is the undirect symbol property');

Object.prototype[undirectSymb] = {};

arr[directSymb] = {};

monoLog("--- call to Object.key(ob) ---");
Object.keys(arr).forEach(monoLog); // show own enumerable props (no symbols)

monoLog("--- call to for ... in ---");
for (const prop in arr) { // show enumerable props (own and inherited, no symbols)
    monoLog(prop);
}

monoLog("--- call to for ... of ---");
for (const prop of arr) { // show value of iterable props
    monoLog(prop);
}

monoLog("--- call to Object.getOwnPropertyNames(ob) ---");
// show own enumerable and nonenumerable props (no symbols)
Object.getOwnPropertyNames(arr).forEach(monoLog);

monoLog("--- call to Object.getOwnPropertyDescriptors(ob) ---");
// show own symbols
Object.getOwnPropertySymbols(arr).forEach(monoLog);
