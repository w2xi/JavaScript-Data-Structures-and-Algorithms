const { Compare, defaultCompare, swap } = require('../utils');

// 二叉堆——最小堆

/**
 * 二叉树的数组表示法
 *          1 (0)
 *        /    \ 
 *   (1) 2      3 (2)
 *      / \    / \
 *     4   5  6   7
 *    (3) (4)(5) (6)
 * 
 * [1, 2, 3, 4, 5, 6, 7]
 * 对应索引 =>
 *  0  1  2  3  4  5  6
 */

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  insert(value) {
    if (value) {
      // 插入到堆的底部，即数组的最后一个位置
      this.heap.push(value);
      // 执行上移操作
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  // 上移操作
  siftUp(index) {
    // 父节点索引
    const parentIndex = this.getParentIndex(index);
    const currentValue = this.heap[index];
    const parentValue = this.heap[parentIndex];

    // 如果当前节点的索引大于0 且 当前节点值小于父节点值 执行上移操作
    if (index > 0 && this.compareFn(currentValue, parentValue) === Compare.LESS_THAN) {
      // 交换父节点和当前节点的值
      swap(this.heap, index, parentIndex);
      // 继续上移
      this.siftUp(parentIndex);
    }
  }

  // 移除堆中的最小值，即根节点
  // 在移除后，需要将堆的最后一个节点放到根节点的位置，然后再执行下移操作
  // 直到堆的结构正常
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    // 移除值
    const removedValue = this.heap[0];
    // 将堆的最后一个节点放到根节点的位置
    this.heap[0] = this.heap.pop();
    // 执行下移操作
    this.siftDown(0);

    return removedValue;
  }

  // 下移操作
  siftDown(index) {
    let element = index;
    const left = this.getLeftChildIndex(index);
    const right = this.getRightChildIndex(index);
    const size = this.size();

    // 如果当前节点值大于左子节点值
    if (left < size && this.compareFn(this.heap[element], this.heap[left]) === Compare.BIGGER_THAN) {
      element = left;
    }
    // 两种情况：
    // 1. element = index，比较的是当前节点和右子节点
    // 2. element = left, 此时比较的是左子节点和右子节点的大小
    if (right < size && this.compareFn(this.heap[element], this.heap[right]) === Compare.BIGGER_THAN) {
      element = right;
    }
    if (element !== index) {
      swap(this.heap, index, element);
      // 继续下移
      this.siftDown(element);
    }    
  }
  
  findMinimum() {
    if (!this.isEmpty()) {
      return this.heap[0];
    }
  }

  getAsArray() {
    return this.heap;
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(index) {
    // root node has no parent
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.heap.length;
  }

  clear() {
    this.heap.length = 0;
  }
}

module.exports = MinHeap;

// 最小堆可视化 demo
// ref: https://www.cs.usfca.edu/~galles/visualization/Heap.html

// const heap = new MinHeap();

// heap.insert(2);
// heap.insert(3);
// heap.insert(4);
// heap.insert(5);
// heap.insert(1);

// console.log(heap.getAsArray());   // [1, 2, 4, 5, 3]
// console.log(heap.isEmpty());      // false
// console.log(heap.size());         // 5
// console.log(heap.findMinimum());  // 1

// heap.extract();
// console.log(heap.getAsArray());  // [2, 3, 4, 5]
