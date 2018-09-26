// we will sort an array by ascending oder using hype sort

// Here, a heap is an array that respect the following functions :
// - left child of element i is 2i
// - right chils of element i is 2i + 1
// - parent of element i is Math.floor(i/2)

function MinHeap(arr) {

    // to respect the functions above, the arr have to begin at 1, that is why arr[0] is null
    // else left child of 0 is 2 * 0 = 0 ... ERROR
    this.heap = [null];
    arr.forEach(e => this.insert(e));
}

MinHeap.prototype.swap = function (i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
}

MinHeap.prototype.insert = function (e) {
    // add the element to the array
    this.heap.push(e);
    // then sort the array to respect the heap structure
    if (this.heap.length > 2) { //remember that the array start to 1
        let addedIndex = this.heap.length - 1;
        while (this.heap[addedIndex] < this.heap[Math.floor(addedIndex / 2)]) {
            if (addedIndex >= 1) {
                this.swap(addedIndex, Math.floor(addedIndex / 2));
                if (Math.floor(addedIndex / 2) > 1) {
                    addedIndex = Math.floor(addedIndex / 2);
                } else {
                    break;
                }
            }
        }
    }
}

MinHeap.prototype.pop = function () {
    if (this.heap.length > 2) {
        this.swap(1, this.heap.length - 1);
        let removed = this.heap.pop();
        if (this.heap.length == 2) {
            if (this.heap[1] > this.heap[2]) {
                this.swap(1, 2);
            }
        } else {
            let i = 1;
            // checking existence (&&s) is not mandatory... it is juste more 'right'
            while ((this.heap[2 * i] && this.heap[i] > this.heap[2 * i]) ||
                (this.heap[2 * i + 1] && this.heap[i] > this.heap[2 * i + 1])) {
                if (this.heap[2 * i] && this.heap[2 * i + 1]) {
                    if (this.heap[2 * i] < this.heap[2 * i + 1]) { // we want to up the lower of the two child
                        this.swap(i, 2 * i);
                        i = 2 * i;
                    } else {
                        this.swap(i, 2 * i + 1);
                        i = 2 * i + 1;
                    }
                } else if (this.heap[2 * i]) {
                    this.swap(i, 2 * i);
                    i = 2 * i;
                } else {
                    this.swap(i, 2 * i + 1);
                    i = 2 * i + 1;
                }
            } // TODO refactor this while loop to handle undefined more elegantly
        }
        return removed;

    } else if (this.heap.length === 2) {
        return this.heap.pop();
    } else {
        return null;
    }
}

/**
 * Create an MinHeap from the array then pop each element of the heap
 * and push it into a new sorted array.
 */
const heapSort = arr => {
    const minHeap = new MinHeap(arr);
    const sortedArray = [];
    while (minHeap.heap.length > 1) {
        sortedArray.push(minHeap.pop());
    }
    return sortedArray;
}

const arr = [70, 60, 50, 40, 30, 20, 10, 80, 90, 90, 10, 20, 40];
const sortedArray = heapSort(arr);

console.log(heapSort(sortedArray));
