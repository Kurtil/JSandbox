// The goal is to write a function that take ann array of integers and return true if the array is hoppable
// the array represents the height of towers, on a tower of 2, you can jump one or two.
// The goal is to jump outside of the array

function isHoppable(arr) {

    if (!arr) return false;

    const [head] = arr;
    if (head === 0) return false;

    let hoppable = false;
    for (let i = 1; i <= head; i++) {
        if (i >= arr.length) { // or equals because we are on the first element... jumping of length from the first let us out of the array!
            return true;
        } else {
            const copieArr = Array.from(arr);
            copieArr.splice(0, i)
            hoppable = hoppable || isHoppable(copieArr);
        }
        if (hoppable) {
            return true;
        }
    }
    return hoppable;
}

const arr = [4, 2, 0, 0, 2, 0];

const res = isHoppable(arr);

console.log(res);
