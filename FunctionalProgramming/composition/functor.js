// Functor :
const Functor = value => ({
    map: fn => Functor(fn(value)),
    toString: () => `Functor : ${value}`,
    valueOf: () => value,
    [Symbol.iterator]: function*() {
        yield value;
    }
});

const trace = x => {
    console.log(x);
    return x;
}

const val = Functor(10);
val.map(trace);

// Identity
val.map(x => x).map(trace);

// Composition
const f = x => x + 1;
const g = x => x * 2;

val.map(x => f(g(x))).map(trace);
val.map(g).map(f).map(trace);

console.log(Functor(10) + Functor(20));
console.log(Functor('10') + Functor('20'));

const arr = [1, 2, ...Functor(10)].map(trace);
