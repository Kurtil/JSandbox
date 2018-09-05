// Callbacks added with then() even after the success or failure of the
// asynchronous operation, will be called.

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('error message');
        resolve('message');
        console.log('the end of the timeout');
    }, 1000);
});

promise.then(console.log, console.log);

console.log('end of file');

// Guarantee 2 confirmed : the message (or error message) is logged after the
// message "the end of the timeout".