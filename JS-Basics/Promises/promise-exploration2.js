// chaining non asynchronous functions

let promise = new Promise((resolve, reject) => {
    console.log('create promise');
    resolve("creationEnd");
}).then((message) => {
    console.log(message);
    console.log("first then");
    return "return first then"
}).then((message) => {
    console.log(message);
    console.log("second then");
    throw 'bug';
}).catch((message) => {
    console.log(message);
    console.log("third then");
}).then((message) => {
    console.log(message);
    console.log("third then");
});