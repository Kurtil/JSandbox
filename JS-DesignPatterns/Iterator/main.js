// we can create infinit collection
// in this example, we will iterate 30 times over an array of 9 elements

const makeIterator = (array, numberOfRepetition) => {
    let counter = numberOfRepetition;
    let nextIndex = 0;
    return {
        next() {  // usefull post (in/de)crements here !
            if (nextIndex < array.length && counter-- > 0) {
                return {
                    value: array[nextIndex++],
                    done: false
                };
            } else if (nextIndex >= array.length && counter-- > 0) {
                nextIndex = 0;
                return {
                    value: array[nextIndex++],
                    done: false
                };
            } else {
                return {
                    done: true
                };
            }
        }
    };
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const iterator30 = makeIterator(arr, 30);

let nextValue;
while (nextValue = iterator30.next(), !nextValue.done) { // little comma operator trick here :P
    console.log(nextValue.value)
}
