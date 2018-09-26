/**
 * For each element, insert the element in the correct place
 * in the sorted part of the array.
 */
const insertionSort = array => {
    const arr = [...array];
    if (arr.length < 2) {
        return arr
    } else {
        for (let i = 1; i < arr.length; i++) {
            const sortedIndex = i - 1;
            if (arr[i] < arr[sortedIndex]) {
                [arr[i], arr[sortedIndex]] = [arr[sortedIndex], arr[i]];
                // put the swapped element at the correct splace
                for (let j = sortedIndex; j >= 1; j--) {
                    if (arr[j] < arr[j - 1]) {
                        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
                    }
                }
            }
        }
    }
    return arr;
}

const arr = [70, 60, 50, 40, 30, 20, 10, 80, 90, 90, 10, 20, 40];
const sortedArray = insertionSort(arr);

console.log(sortedArray);
