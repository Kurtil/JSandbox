/**
 * Sort an array of positive integers.
 */
const countingSort = arr => {
    // Count elements : the key in the count array is the element,
    // the value is the number of repetition of this element.
    const count = []
    arr.forEach(element => {
        if (count[element]) {
            count[element] = ++count[element];
        } else {
            count[element] = 1;
        }
    });
    // Update count array by adding previous values to each element.
    for (let i = 1; i < count.length; i++) {
        // replace undefined by 0
        count[i] = count[i] !== undefined ? count[i] : 0;
        count[i - 1] = count[i - 1] !== undefined ? count[i - 1] : 0;
        // Add each previous value to the current one.
        count[i] = count[i] + count[i - 1]
    }

    // The element of the array to be sorted is place in the sorted array
    // at the index count[element] - 1.
    // After places, count[element] is decremented for next same elements.
    const sortedArray = [];
    arr.forEach(element => {
        sortedArray[count[element] - 1] = element;
        count[element]--;
    })
    return sortedArray;
}

const arr = [1, 4, 0, 0, 5, 5, 9, 1, 8, 7, 6, 3, 0, 2, 12];
const sortedArray = countingSort(arr);

console.log(sortedArray);
