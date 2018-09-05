// Multiple callbacks may be added by calling then() several times.
// Each callback is executed one after another, in the order in which
// they were inserted.

let promise = new Promise((resolve) => {
    setTimeout(() => {
        resolve('message');
        console.log('the end of the timeout')
    }, 1000);
});

promise.then((res) => console.log(res, 1));
promise.then((res) => console.log(res, 2));
promise.then((res) => console.log(res, 3));
promise.then((res) => console.log(res, 4));
promise.then((res) => console.log(res, 5));
promise.then((res) => console.log(res, 6));
promise.then((res) => console.log(res, 7));
promise.then((res) => console.log(res, 8));
promise.then((res) => console.log(res, 9));

console.log('end of file');

// Guarantee 3 confirmed : the callback are called in order they where attached.