const Functor = value => ({
    map(fn) {
        return Functor(fn(value));
    },
    valueOf() {
        return value;
    },
    toString() {
        return `Functor : ${value}`
    },
    [Symbol.iterator]: function* (){
        yield value;
    },
});

const trace = x => {
    console.log(x);
    return x;
}

const foo = Functor('I am the value !');
const bar = Functor('The other value ?')

foo.map(trace);

trace(`${foo} ${bar}`);

trace(['coucou', 'jeanjean', ...foo]);
