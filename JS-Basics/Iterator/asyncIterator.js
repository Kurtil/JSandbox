const arr = [1, 2, 3, 4, 8];

function AsyncIterable(arr) {
    this.arr = arr;
    this[Symbol.asyncIterable] = function* () {
        for (let e of this.arr) {
            yield new Promise(resolve => {
                setTimeout(() => resolve({ value: e, done: false }), 2000);
            });
        }
    }
};

const asyncArr = new AsyncIterable(arr);

(async () => {
    for await (let e of asyncArr[Symbol.asyncIterable]()) {
        console.log(e);
    }
})();

console.log(asyncArr[Symbol.asyncIterable]().next());

asyncArr[Symbol.asyncIterable]().next().value.then(({value, done}) => console.log(`value is ${value} with done : ${done}`));
