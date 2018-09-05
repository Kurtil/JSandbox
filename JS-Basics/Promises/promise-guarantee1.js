// Promise callbacks will never be called before the completion of the current
// run of the JavaScript event loop.

// there is no asynchronous code in the promise creation
let promise = new Promise((resolve, reject) => {
    resolve('message');
});

promise.then(console.log);

console.log('end of file');

// Guarantee 1 confirmed : the message is logged after the "end of file".