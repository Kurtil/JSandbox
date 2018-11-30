const pipe = (x, ...Fns) => Fns.reduce((acc, cur) => cur(acc), x);
const print = x => console.log(x);

const wait = time => value => new Promise(resolve => {
    setTimeout(resolve, time, value);
});

const g = n => n + 1;
const f = n => n * 2;

wait(0)(12)
    .then(g)
    .then(f)
    .then(print);