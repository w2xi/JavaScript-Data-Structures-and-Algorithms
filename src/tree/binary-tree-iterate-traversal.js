const BinarySearchTree = require('./binary-search-tree');
const Stack = require('../stack/stack-obj-private');

// 二叉树的迭代(非递归)遍历

class BinaryTreeIterateTraversal extends BinarySearchTree {
  constructor() {
    super();
  }

  // 中序遍历
  inOrderTraverse(callback) {
    const stack = Stack();
    const root = this.getRoot();
    let curr = root;

    while (!stack.isEmpty() || curr) {
      // 左节点先入栈
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      // 出栈
      const node = stack.pop();
      callback(node.key);

      if (node.right) {
        curr = node.right;
      }
    }
  }

  // 先序遍历
  preOrderTraverse(callback) {
    // const stack = Stack();
    // const root = this.getRoot();
    // stack.push(root);

    // while (!stack.isEmpty()) {
    //   // 出栈
    //   const node = stack.pop();
    //   callback(node.key);

    //   // 子节点入栈 先右后左
    //   node.right && stack.push(node.right);
    //   node.left && stack.push(node.left);
    // }

    const stack = Stack();
    const root = this.getRoot();
    let curr = root;

    while (!stack.isEmpty() || curr) {
      // 左节点先入栈
      while (curr) {
        stack.push(curr);
        callback(curr.key);
        curr = curr.left;
      }
      // 出栈
      const node = stack.pop();

      if (node.right) {
        curr = node.right;
      }
    }
  }

  // 后序遍历
  postOrderTraverse(callback) {
    const stack = Stack();
    const helper = Stack();
    const root = this.getRoot();
    stack.push(root);

    while (!stack.isEmpty()) {
      // 出栈
      const node = stack.pop();
      
      helper.push(node);

      // 子节点入栈 先左后右
      node.left && stack.push(node.left);
      node.right && stack.push(node.right);
    }

    let curr = helper.pop();
    while (curr) {
      callback(curr.key)
      curr = helper.pop();
    }
  }

  // 层序遍历
  levelOrderTraverse(callback) {
    const queue = [];
    const root = this.getRoot();
    queue.push(root);

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.key);
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }
}

// 数据结构和算法动态可视化
// https://visualgo.net/zh

const tree = new BinaryTreeIterateTraversal();

//     7
//   /   \
//   5    9
//  / \  / \
// 4   6 8  10

// 7,5,9,6,8,10,4
tree.insert(7);
tree.insert(5);
tree.insert(9);
tree.insert(6);
tree.insert(8);
tree.insert(10);
tree.insert(4);

tree.inOrderTraverse(console.log);    // 4 5 6 7 8 9 10
console.log('--------------');
tree.preOrderTraverse(console.log);   // 7 5 4 6 9 8 10
console.log('--------------');
tree.postOrderTraverse(console.log);  // 4 6 5 8 10 9 7
console.log('--------------');
tree.levelOrderTraverse(console.log); // 7 5 9 4 6 8 10