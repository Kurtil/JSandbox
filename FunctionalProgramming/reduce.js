/* **** Map with reduce **** */
const map = (fn, arr) => arr.reduce((acc, item, index, arr) => acc.concat(fn(item, index, arr)), []);

const add = x => y => x + y;
const add3 = add(3);

const arr = map(add3, [1, 2, 3]);

console.log(arr);

/* **** Filter with reduce **** */
const filter = (fn, arr) => arr.reduce((newArr, item) => fn(item) ? newArr.concat(item) : newArr, []);

const moreThan = x => y => y > x;
const moreThan5 = moreThan(5);

const filteredArr = filter(moreThan5, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

console.log(filteredArr);
