// generator are iterator factories

var x = function* () {
    var i = 0;
    while (true) {
        const restart = yield i++;
        if (restart) i = 0;
    }
};
var it = x();
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next("restart").value); // we can pass data to yield via next function argument
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
console.log(it.next().value);
