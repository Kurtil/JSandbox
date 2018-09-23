// In this exercice, we will resolve fibonacci problem (give the corresponding value ...)
// with memoization approach

const N = 10; // play with the N to see the power of memoization !

// let resovle the problème by recursion first to see the benefits of memoization later

/**
 * Take an strictly positive integer and return the fibonacci equivalent
 */
let counter = 0;
const fib = n => {
    counter++;
    if (n === 1 || n === 2) {
        return 1;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    }
}

console.log('--- basic recursion ---');
console.log(fib(N));
console.log(`The recursive algorithm take ${counter} steps to resolve the problem`);

// Now let's rewrite the code with memoization

/**
 * Take an strictly positive integer and return the fibonacci equivalent
 * Use memoization to increase performance
 */
let memoizationCounter = 0;

const fibMemo = (n, memo) => {
    memoizationCounter++;
    if (memo.get(n)) {
        return memo.get(n);
    }
    let result;
    if (n === 1 || n === 2) {
        result = 1;
    }
    else {
        result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    }
    memo.set(n, result);
    return result;
}

console.log('--- memoization ---');
const memo = new Map();
console.log(fibMemo(N, memo));
console.log(`The memo algorithm take ${memoizationCounter} steps to resolve the problem`);
