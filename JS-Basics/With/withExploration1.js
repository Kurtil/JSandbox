const utilities = {
    add(x, y) {
        return x + y;
    },
    mul(x, y) {
        return x * y;
    },
    sub(x, y) {
        return x - y;
    },
    div(x, y) {
        if (y === 0) throw 'Cannot divide by zero.'
        return x / y;
    },
};

with (utilities) {
    const x = 10;
    const y = 2;

    let res = add(x, mul(y, y));
    res = div(res, x);

    console.log(res);
}