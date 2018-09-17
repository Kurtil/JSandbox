const monoLog = (arg) => console.log(arg);

// to be iterable, Object must define a function returning an iterator on the
// property with key Symbol.iterator
const ob = {};
ob[Symbol.iterator] = function*(){
    yield 1;
    yield 2;
    yield 3;
};

[...ob].forEach(monoLog);

for (const val of ob) {
    monoLog(val);
}