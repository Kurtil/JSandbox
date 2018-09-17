const monoLog = (arg) => console.log(arg);

const obj = {
    coucou: 'jean',
    'yoyo': 'a',
    332: 4825,
    [Symbol.iterator]: function* () {
        // the standard way of doing it :
        // for (const key of Object.keys(this)){
        //     yield this[key];
        // }
        // the other way of doing it :
        // yield* allow to delegate to another generator...
        // array can be use as generator as they are iterable
        // yield* iterate over the value next to it and generate values for each iterations.
        yield* Object.keys(this).map(key => this[key]);
    }
};

[...obj].forEach(monoLog); // object is now iterable !! :D


