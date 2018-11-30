const pipe = (...Fns) => x => Fns.reduce((acc, cur) => cur(acc), x);
const print = x => console.log(x);
const trace = label => value => {
    print(`${label} : ${value}`);
    return value;
};

const g = n => n + 1;
const f = n => n * 2;

const foo = n => {
    const afterG = g(n);
    trace('after g')(afterG);
    const afterF = f(afterG);
    trace('after f')(afterF);
    return afterF;
};

const pipedFoo = pipe(
    g,
    trace('after g'),
    f,
    trace('after f')
);

print(pipedFoo(4));

// print(pipe(4, g, f));

// print(pipe(4))