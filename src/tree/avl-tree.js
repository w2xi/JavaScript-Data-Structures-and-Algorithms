const BinarySearchTree = require('./binary-search-tree');
const Node = require('./node');
const { Compare } = require('../utils');

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

// AVL 是一种自平衡二叉搜索树 
// 任意一个节点(不论深度)的左右子树的高度最多相差1
// 添加或移除节点时，ALV树会尽可能尝试转换为完全树

class AVLTree extends BinarySearchTree {
  constructor() {
    super();
    this.root = null;
  }
  /* 
   * 计算一个节点的高度
   * 节点高度: 从节点到其任意子节点的边的最大值
   *         3 (h=3)
   *        / \
   * (h=0) 2   6 (h=2)
   *          / \
   *   (h=1) 5   7 (h=0)
   *        /
   *       4 (h=0)
   */
  getNodeHeight(node) {
    if (!node) {
      return -1;
    }
    const leftHeight = this.getNodeHeight(node.left);
    const rightHeight = this.getNodeHeight(node.right);
    const height = Math.max(leftHeight, rightHeight);

    return height + 1;
  }

  // 计算节点的平衡因子
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  insertNode(node, key) {
    if (!node) {
      return new Node(key);
    } 
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else {
      node.right = this.insertNode(node.right, key);
    }

    // 验证树是否是平衡的
    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // 左左
        return this.rotationLL(node);
      } else {
        // 左右
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // 右右
        return this.rotationRR(node);
      } else {
        // 右左
        return this.rotationRL(node);
      }
    }

    return node;
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    node = super.removeNode(node, key);

    if (!node) {
      return node;
    }
    // 验证树是否是平衡的
    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // 左左
        return this.rotationLL(node);
      } else {
        // 左右
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // 右右
        return this.rotationRR(node);
      } else {
        // 右左
        return this.rotationRL(node);
      }
    }

    return node;
  }

  /**
   * Right right case: rotate right
   * 
   *    a                              b
   *   / \                            / \
   *  c   b   -> rotationRR(a) ->    a   e
   *     / \                        / \
   *    d   e                      c   d
   * 
   * @param {Node} node 
   * @returns Node
   */
  rotationRR(node) {
    const newRoot = node.right;
    node.right = newRoot.left;
    newRoot.left = node;
    return newRoot;  
  }
  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param {Node} node
   * @returns Node
   */
  rotationLL(node) {
    const newRoot = node.left;
    node.left = newRoot.right;
    newRoot.right = node;
    return newRoot;
  }
  /**
   * Right left case: rotate right then left
   * @param {Node} node
   */
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }
  /**
   * Left right case: rotate left then right
   * @param {Node} node
   */
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  // 后序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    if (!node) return;
    callback(node);
    this.preOrderTraverseNode(node.left, callback);
    this.preOrderTraverseNode(node.right, callback);
  }

  getRoot() {
    return this.root;
  }
}

const tree = new AVLTree();
//         3 (h=3)
//        / \
// (h=0) 2   6 (h=2)
//          / \
//   (h=1) 5   7 (h=0)
//        /
//       4 (h=0)
tree.insert(3);
tree.insert(2);
tree.insert(6);
tree.insert(5);
tree.insert(7);

// 4是破坏者，插入后，做RL变换
tree.insert(4);
//      LL变换 ->
//        3
//       / \
//      2   5 
//         / \
//        4   6
//             \
//              7

//     RR变换 ->
//       5 
//      / \
//     3   6
//    / \   \ 
//   2   4   7

tree.remove(7);
tree.remove(6);
//     4
//    / \
//   3   5
//  / 
// 2
tree.remove(5);
//     4
//    /
//   3   
//  / 
// 2
// 应该是LL变换，但是这里是竟然走了 LR 变换，导致报错


console.log(tree.getRoot());

// 先序遍历打印每个节点的高度
// tree.preOrderTraverse((node) => {
//   console.log(`key=${node.key}; height=${tree.getNodeHeight(node)}`);
// });