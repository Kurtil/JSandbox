// This example use a more declarative way of quicksorting and make use of spread operator wildly :P

const arr = [0, 30, 40, 20, 50, 90, 60, 40, 80, 10, 70, 0, 90];

const head = ([x]) => x;
const tail = ([,...r]) => r;

const quickSortF = arr => arr.length ?
    [...quickSortF(tail(arr).filter(e => e < head(arr))), ...arr.filter(e => e === head(arr)), ...quickSortF(tail(arr).filter(e => e > head(arr)))]
    : [];

const sortedArray = quickSortF(arr);

console.log(sortedArray);
