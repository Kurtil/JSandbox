Promise.resolve("I am a resolved promised").then(console.log);
Promise.reject("I am a rejected promised").then().catch(console.log);

console.log('end of file');
