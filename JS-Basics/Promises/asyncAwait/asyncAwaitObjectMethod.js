const monoLog = x => console.log(x);

// foo return a Promise that resolve after 2sec
const foo = () => new Promise(resolve => {
    setTimeout(() => {
        resolve("Im a resolved");
    }, 2000);
});

const obj = {
    async asynclog() {
        const message = await foo();
        console.log(`async logged after await : ${message}`);
        return 'async log finished';
    },

    async log() {
        console.log("sync logged");
        return 'sync log finished';
    }
}

// obj.asynclog(); // Be careful, the call to an async function without await means that it will not wait for completion!
// obj.log();      // The sync log is called before the previous promise resolve

obj.asynclog().then(monoLog);
obj.log().then(monoLog);

monoLog('end of file');

// The purpose of this exploration was to test the returned value (Promise) of an async function.
// As we can see, the Promise return by the async function is resolved with the return value.
