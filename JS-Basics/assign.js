const ob = {
    key: 'value'
};

console.log(ob);

Object.assign(ob, { key: 'updated value' });

console.log(ob);

// the object.assign update values if key is already present in the object

// Object.assign(undefined, ob); // this throw an error

// no need to initial value on non empty array.
// If array.length === 1 : no call to reduce callback...
const accumulatedObjuect = [{ x: 1 }, { y: 2 }, { z: 3 }]
    .reduce((acc, o) => Object.assign(acc, o));

console.log('end of file');