const arr = ["coucou", "ccj", 233];

const it = arr.entries();

let nextValue = it.next();
console.log(nextValue.value, nextValue.done);
nextValue = it.next();
console.log(nextValue.value, nextValue.done);
nextValue = it.next();
console.log(nextValue.value, nextValue.done);
nextValue = it.next();
console.log(nextValue.value, nextValue.done);
