/** BinaryTreeNode: node for a binary tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree. */
  minDepth() {
    if (!this.root) return 0;

    function depthHelper(node) {
      if (!node) return Infinity;
      if (!node.left && !node.right) return 1;
      return 1 + Math.min(depthHelper(node.left), depthHelper(node.right));
    }

    return depthHelper(this.root);
  }

  /** maxDepth(): return the maximum depth of the tree. */
  maxDepth() {
    if (!this.root) return 0;

    function depthHelper(node) {
      if (!node) return 0;
      return 1 + Math.max(depthHelper(node.left), depthHelper(node.right));
    }

    return depthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree. */
  maxSum() {
    if (!this.root) return 0; // Fix: Return 0 for an empty tree

    let maxSum = -Infinity;

    function maxSumHelper(node) {
      if (!node) return 0;

      const leftMax = Math.max(0, maxSumHelper(node.left));
      const rightMax = Math.max(0, maxSumHelper(node.right));
      maxSum = Math.max(maxSum, node.val + leftMax + rightMax);

      return node.val + Math.max(leftMax, rightMax);
    }

    maxSumHelper(this.root);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree which is larger than lowerBound. */
  nextLarger(lowerBound) {
    if (!this.root) return null;

    let nextLargerVal = null;

    function nextLargerHelper(node) {
      if (
        node.val > lowerBound &&
        (nextLargerVal === null || node.val < nextLargerVal)
      ) {
        nextLargerVal = node.val;
      }
      if (node.left) nextLargerHelper(node.left);
      if (node.right) nextLargerHelper(node.right);
    }

    nextLargerHelper(this.root);
    return nextLargerVal;
  }

  /** areCousins(node1, node2): determine whether two nodes are cousins. */
  areCousins(node1, node2) {
    if (!this.root || node1 === this.root || node2 === this.root) return false;

    function findDepthAndParent(node, target, depth = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { depth, parent };

      return (
        findDepthAndParent(node.left, target, depth + 1, node) ||
        findDepthAndParent(node.right, target, depth + 1, node)
      );
    }

    const node1Info = findDepthAndParent(this.root, node1);
    const node2Info = findDepthAndParent(this.root, node2);

    return (
      node1Info &&
      node2Info &&
      node1Info.depth === node2Info.depth &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    function serializeHelper(node) {
      if (!node) return "null";
      return `${node.val},${serializeHelper(node.left)},${serializeHelper(
        node.right
      )}`;
    }
    return serializeHelper(tree.root);
  }

  /** deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(data) {
    const nodes = data.split(",");

    function deserializeHelper() {
      const val = nodes.shift();
      if (val === "null") return null;
      const node = new BinaryTreeNode(parseInt(val));
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    }

    return new BinaryTree(deserializeHelper());
  }

  /** lowestCommonAncestor(node1, node2): find the lowest common ancestor of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    function lcaHelper(root, p, q) {
      if (!root || root === p || root === q) return root;

      const left = lcaHelper(root.left, p, q);
      const right = lcaHelper(root.right, p, q);

      if (left && right) return root;
      return left ? left : right;
    }

    return lcaHelper(this.root, node1, node2);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
