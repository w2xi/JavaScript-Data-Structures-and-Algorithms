const Node = require('./node');
const { Compare, defaultCompare } = require('../utils');

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    if (Compare.LESS_THAN === this.compareFn(key, node.key)) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  search(key) {
    return this.searchNode(this.root, key);
  }

  searchNode(node, key) {
    if (!node) {
      return false;
    }
    if (Compare.LESS_THAN === this.compareFn(key, node.key)) {
      return this.searchNode(node.left, key);
    } else if (Compare.GREATER_THAN === this.compareFn(key, node.key)) {
      return this.searchNode(node.right, key);
    } else {
      return true;
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (!node) {
      return null;
    }
    if (Compare.LESS_THAN === this.compareFn(key, node.key)) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (Compare.GREATER_THAN === this.compareFn(key, node.key)) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // 找到了要删除的节点
      
      /** 场景一：移除一个叶节点 */
      if (!node.left && !node.right) {
        node = null;
        // console.log('remove', node);
        return node;
      }
      
      /** 场景二：移除一个只有一个子节点的节点 */
      // 左节点为空
      if (!node.left) {
        node = node.right;
        return node;
      }
      // 右节点为空
      if (!node.right) {
        node = node.left;
        return node;
      }
      
      /** 场景三：移除有两个子节点的节点 */

      // (1)找到右子树的最小值节点
      let temp = this.minNode(node.right);
      // (2)将右子树的最小值节点的值赋值给当前节点
      node.key = temp.key;
      // (3)移除右子树的最小值节点
      node.right = this.removeNode(node.right, temp.key);

      return node;
    }
  }

  min() {
    return this.minNode(this.root);
  }

  minNode(node) {
    let curr = node;
    while (curr && curr.left) {
      curr = curr.left;
    }
    return curr;
  }

  max() {
    return this.maxNode(this.root);
  }

  maxNode(node) {
    let curr = node;
    while (curr && curr.right) {
      curr = curr.right;
    }
    return curr;
  }

  getRoot() {
    return this.root;
  }
}

module.exports = BinarySearchTree;

// 数据结构和算法动态可视化
// https://visualgo.net/zh

//     7
//   /   \
//   5    9
//  / \  / \
// 4  6 8  10

// const tree = new BinarySearchTree();
// 7,5,9,6,8,10,4 
// tree.insert(7);
// tree.insert(5);
// tree.insert(9);
// tree.insert(6);
// tree.insert(8);
// tree.insert(10);
// tree.insert(4);
// console.log(tree.min()); // 4
// console.log(tree.max()); // 10

// console.log(tree.search(7)); // true
// console.log(tree.search(1)); // false

// tree.remove(10);

// console.log(tree.getRoot());