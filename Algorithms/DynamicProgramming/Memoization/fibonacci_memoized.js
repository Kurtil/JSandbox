// In this exercice, we will resolve fibonacci problem (give the corresponding value ...)
// with memoization approach

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
console.log(fib(5));
console.log(`The recursive algorithm take ${counter} steps to resolve the problem`);

// Now let's rewrite the code with memoization

/**
 * Take an strictly positive integer and return the fibonacci equivalent
 * Use memoization to increase performance
 */
let memoizationCounter = 0;
const memo = new Map();
// add base cases to Map. (This will remove to calls to the fibMemo function)
memo.set(1, 1);
memo.set(2, 1);

const fibMemo = n => {
    memoizationCounter++;
    if (n === 1 || n === 2) {
        return 1;
    }
    else {
        const fibMinus1 = getAndHandleStorage(n - 1);
        const fibMinus2 = getAndHandleStorage(n - 2);

        return fibMinus1 + fibMinus2;
    }
}

/**
 * return the fib equivalent to x, get from memo if already store,
 * or compute, save the result and return it
 */
const getAndHandleStorage = x => {
    let fibMinus;
    if (memo.get(x)) {
        fibMinus = memo.get(x)
    } else {
        fibMinus = fibMemo(x);
        memo.set(x, fibMinus)
    }
    return fibMinus;
}

console.log('--- memoization ---');
console.log(fibMemo(5));
console.log(`The memo algorithm take ${memoizationCounter} steps to resolve the problem`);
