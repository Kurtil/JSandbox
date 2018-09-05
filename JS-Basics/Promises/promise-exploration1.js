let promise2 = new Promise((resolve, reject) => {
    console.log('promise2 creation');
    setTimeout(() => {
        resolve("promise 2 creation ended");
    }, 2000);
});
let promise3 = promise2.then((message) =>
    new Promise((resolve, reject) => {
        console.log(message);
        setTimeout(() => {
            console.log(promise3);
            resolve("promise 3 resolved ???");
        }, 2000);
    })
);
promise3.then(() =>
    console.log(promise3));

console.log('end');

