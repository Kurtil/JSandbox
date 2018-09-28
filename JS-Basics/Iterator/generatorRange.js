const monoLog = arg => console.log(arg);

// range methode for numbers only
const range = function*(from, to, step = 1) {
    for (from; from <= to; from += step) {
        yield from;
    }
}

for (let e of range(20,25)) {
    monoLog(e)
}

[...range(18,19)].forEach(monoLog);
[...range(2,10,2)].forEach(monoLog);
