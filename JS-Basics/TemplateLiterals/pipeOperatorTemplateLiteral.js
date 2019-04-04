function pipe(strings, ...values) {
    [...strings].slice(1, -1).map(x => x.trim()).forEach(op => {
        if (op !== '|>') {
            throw `operator not supported ${op}`
        }
    });
    const [value, ...functions] = values;
    return functions.reduce((x, f) => f(x), value);
}

const value = 10

const mul = by => x => x * by
const sub = by => x => x - by

const piped = pipe`${value}
                    |> ${mul(4)}
                    |> ${sub(2)}
                    |> ${mul(3)}`;

console.log(piped)
