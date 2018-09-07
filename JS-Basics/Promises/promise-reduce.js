const sum = x => x + x;
const mul = x => x * x;

// [sum, mul, console.log].reduce((acc, foo) => acc.then(foo), Promise.resolve(3));

// Or much more elegant :

const waterfaller = (...funcs) => x => funcs.reduce((acc, foo) => acc.then(foo), Promise.resolve(x));
const waterfall = waterfaller(sum, mul, console.log);

waterfall(2);