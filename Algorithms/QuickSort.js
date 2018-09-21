const arr = [0, 50, 30, 40, 20, 50, 90, 60, 80, 10, 70, 10, 90, 50];

const swap = (arr, i, j) => {
    const save = arr[i];
    arr[i] = arr[j];
    arr[j] = save;
}

const quickSort = (arr) => {
    if (arr.length <= 1) {
        return arr;
    } else {
        const pivotIndex = arr.length - 1;
        let smallestElementIndex = -1;
        for (let i = 0; i <= pivotIndex; i++) {
            if (arr[i] <= arr[pivotIndex]) {
                swap(arr, ++smallestElementIndex, i)
            }
        }
        arr = [...quickSort(arr.slice(0, smallestElementIndex)), arr[smallestElementIndex],...quickSort(arr.slice(smallestElementIndex + 1, arr.length))];

        return arr;
    }
}

const sortedArray = quickSort(arr);

console.log(sortedArray);
