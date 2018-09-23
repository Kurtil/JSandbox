/**
 * Merge two SORTED arrays
 * The sorted part is one of the main point of the merge sort algorithms
 */
const merge = (arr1, arr2) => {
    const sortedMergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // while loop with two indexes is a good solution ;)
    while(leftIndex < arr1.length && rightIndex < arr2.length) {
        if (arr1[leftIndex] < arr2[rightIndex]) {
            sortedMergedArray.push(arr1[leftIndex++]);
        } else {
            sortedMergedArray.push(arr2[rightIndex++]);
        }
    }

    return sortedMergedArray.concat(arr1.splice(leftIndex)).concat(arr2.splice(rightIndex));
}

/**
 * Divide array in two, and merge the sorted halves
 * Return the sorted array
 */
const mergeSort = arr => {
    if (arr.length < 2) {
        return arr;
    } else {
        const middle = Math.floor(arr.length / 2);
        const left = arr.slice(0,middle);
        const right = arr.slice(middle);

        return merge(mergeSort(left), mergeSort(right));
    }
}

const arr = [70, 60, 50, 40, 30, 20, 10, 80, 90, 90, 10, 20, 40];
const sortedArray = mergeSort(arr);

console.log(sortedArray);
