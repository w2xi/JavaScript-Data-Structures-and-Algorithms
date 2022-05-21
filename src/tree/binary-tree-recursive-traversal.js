const BinarySearchTree = require('./binary-search-tree');

// 二叉搜索树的递归遍历

class BinaryTreeRecursiveTraversal extends BinarySearchTree {
  constructor() {
    super();
  }

  // 中序遍历
  // 一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.getRoot(), callback);
  }
  inOrderTraverseNode(node, callback) {
    if (node) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  // 先序遍历
  // 以优先于后代节点的顺序访问每个节点的
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.getRoot(), callback);
  }
  preOrderTraverseNode(node, callback) {
    if (node) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  // 后序遍历
  // 先访问节点的后代节点，再访问节点本身
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.getRoot(), callback);
  }
  postOrderTraverseNode(node, callback) {
    if (node) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 层序遍历
  levelOrderTraverse(callback) {
    let res = [];
    const levelOrderTraverseNode = (node, level) => {
      if (node) {
        res[level] = res[level] || [];
        res[level].push(node.key);

        // console.log(`level = ${level}; key = ${node.key}`);
        
        // 下一层
        levelOrderTraverseNode(node.left, level + 1);
        levelOrderTraverseNode(node.right, level + 1);
      }
    }
    levelOrderTraverseNode(this.getRoot(), 0);
    res = res.flat();
    res.forEach(item => callback(item));
  }
}

// 数据结构和算法动态可视化
// https://visualgo.net/zh

const tree = new BinaryTreeRecursiveTraversal();

//     7
//   /   \
//   5    9
//  / \  / \
// 4  6 8  10

// 7,5,9,6,8,10,4
tree.insert(7);
tree.insert(5);
tree.insert(9);
tree.insert(6);
tree.insert(8);
tree.insert(10);
tree.insert(4);

console.log(tree.inOrderTraverse(console.log));   // 4 5 6 7 8 9 10
console.log(tree.preOrderTraverse(console.log));  // 7 5 4 6 9 8 10
console.log(tree.postOrderTraverse(console.log)); // 4 6 5 8 10 9 7
tree.levelOrderTraverse(console.log);             // 7 5 9 4 6 8 10