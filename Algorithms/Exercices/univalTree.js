// Given a tree, return the number of unival non empty tree in this tree
// An unival tree is a tree with all the same values.

class Node {
    constructor(value = 0, left, right) {
        this.value = value;
        this.left = left;       // is a node or undefined
        this.right = right;     // is also a node or undefined
    }
}

const isUnival = (value, tree) => {
    if (!tree) {
        return true;
    } else if (tree.left === undefined && tree.right === undefined) {
        return tree.value === value;
    } else {
        return isUnival(value, tree.left) && isUnival(value, tree.right);
    }
}

const numberOfUniversalValueTreeOf = tree => {
    if (!tree) {
        return 0;
    } else {
        const isThisTreeUniversalValued = isUnival(tree.value, tree.left) && isUnival(tree.value, tree.right);
        return isThisTreeUniversalValued + numberOfUniversalValueTreeOf(tree.left) + numberOfUniversalValueTreeOf(tree.right);
    }
}

// Creation of the test node : (must return 5)
/*   0
    / \
   1   0
      / \
     1   0
    / \
   1   1
*/
const justOneNode = new Node(1);
const justZeroNode = new Node();
const oneNode = new Node(1, justOneNode, justOneNode);
const middleTree = new Node(0, oneNode, justZeroNode);
const finalTree = new Node(0, justOneNode, middleTree);

const res = numberOfUniversalValueTreeOf(finalTree);
console.log(res);
