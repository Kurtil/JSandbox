// Memoization can drasticly reduc the number of call of a recursive algorithm
// but is it still recursion and stack can be limited

// Here is the bottom up fibonacci problem that does not growth the stask ;)

const fib_bottomUp = n => {
    if (n === 1 || n === 2 ) {
        return 1;
    } else {
        // in this algo, we just need the two previous result to know the current one.
        let previousResults = [1,1];
        for (let i = 3; i <= n; i++) {
            previousResults = [previousResults[1], previousResults[0] + previousResults[1]];
        }
        // the result for n is then stored in the last element of the two saved elements
        return previousResults[1];
    }
}

console.log(fib_bottomUp(6));
