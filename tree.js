/** TreeNode: node for a general tree. */

class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    if (!this.root) return 0;

    let totalSum = 0;
    function sumHelper(node) {
      totalSum += node.val;
      for (let child of node.children) {
        sumHelper(child);
      }
    }

    sumHelper(this.root);
    return totalSum;
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    if (!this.root) return 0;

    let count = 0;
    function evensHelper(node) {
      if (node.val % 2 === 0) count++;
      for (let child of node.children) {
        evensHelper(child);
      }
    }

    evensHelper(this.root);
    return count;
  }

  /** numGreater(lowerBound): return a count of the number of nodes whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    if (!this.root) return 0;

    let count = 0;
    function greaterHelper(node) {
      if (node.val > lowerBound) count++;
      for (let child of node.children) {
        greaterHelper(child);
      }
    }

    greaterHelper(this.root);
    return count;
  }
}

module.exports = { Tree, TreeNode };
