// Print all subset of a set

function printAllSubsets(set) {
    const subSet = [];
    helper(set, subSet, 0);
}

function helper(set, subSet, index) {
    if (index === set.length) {
        console.log(subSet);
    } else {
        subSet[index] = null;
        helper(set, subSet, index + 1);
        subSet[index] = set[index];
        helper(set, subSet, index + 1);
    }
}

const arr = [1, 2];

printAllSubsets(arr);
