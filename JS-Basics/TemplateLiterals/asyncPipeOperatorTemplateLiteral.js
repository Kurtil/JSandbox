function asyncpipe(strings, ...values) {
    [...strings].slice(1, -1).map(x => x.trim()).forEach(op => {
        if (op !== '|>') {
            throw `operator not supported ${op}`
        }
    });
    const [value, ...functions] = values;
    return functions.reduce(async (x, f) => {
        const data = await x;
        return f(data);
    }, value);
}

const value = 10

const mul = by => x => x * by
const sub = by => x => x - by
const asyncMul = by => x => new Promise(res => {
    setTimeout(() => {
        res(x * by)
    }, 3000);
});

const piped = asyncpipe`${value}
                    |> ${asyncMul(2)}
                    |> ${mul(4)}
                    |> ${sub(2)}
                    |> ${mul(3)}`;

(async function () {
    console.log(await piped);
})()
