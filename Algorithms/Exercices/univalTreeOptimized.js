// Given a tree, return the number of unival non empty tree in this tree
// An unival tree is a tree with all the same values.

class Node {
    constructor(value = 0, left, right) {
        this.value = value;
        this.left = left;       // is a node or undefined
        this.right = right;     // is also a node or undefined
    }
}

// The Optimization is base on the fact that this method return an object {count, isUnival}
const countUnival = tree => {
    if (!tree) {
        return { count: 0, isUnival: true };
    }
    const { count: leftCount, isUnival: isLeftUnival } = countUnival(tree.left);
    const { count: rightCount, isUnival: isRightUnival } = countUnival(tree.right);

    let isUnival = true;
    if (!isLeftUnival || !isRightUnival) {
        isUnival = false;
    }
    if (tree.left && tree.left.value !== tree.value) {
        isUnival = false;
    }
    if (tree.right && tree.right.value !== tree.value) {
        isUnival = false;
    }
    return isUnival ? { count: leftCount + rightCount + 1, isUnival: true } :
        { count: leftCount + rightCount, isUnival: false };
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

const res = countUnival(finalTree).count;
console.log(res);
