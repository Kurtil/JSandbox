const ob = {
    log(arg) {
        return new Promise((resolve) => setTimeout(() => resolve(`${arg} promise done!`), 1000));
    }
}; // Note that this semicolon is mandatory !!!

// call with async/await
(async () => {
    console.log('--- Before async call in async function ---');
    const message = await ob.log('first promise call');
    console.log(message + ' in async function')
    console.log('--- After async call in async function ---');
})();

// What this async call under the hood is :
// () => {
//     console.log('--- Before async call in async function ---');
//     return ob.log().then((result) => {
//         console.log('--- After async call in async function ---');
//     });
// };

// call without async/await
console.log('--- Before async call ---');
ob.log('last promise call').then(console.log);
console.log('--- After async call ---');
