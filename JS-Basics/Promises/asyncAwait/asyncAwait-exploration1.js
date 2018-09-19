const ob = {
    log(arg) {
        return new Promise((resolve) => resolve(console.log(`${arg} promise done!`)));
    }
}; // Note that this semicolon is mandatory !!!

// call with async/await
(async () => {
    console.log('--- Before async call in async function ---');
    await ob.log('first promise call');
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
ob.log('last promise call');
console.log('--- After async call ---');
