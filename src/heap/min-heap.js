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
      // 插入到堆的底部
      this.heap.push(value);
      // 执行上移操作
      this.siftUp(this.heap.length - 1);
      return true;
    }
    return false;
  }

  siftUp(index) {
    const parentIndex = this.getParentIndex(index);
    if (index > 0 && this.compareFn(this.heap[index], this.heap[parentIndex]) === Compare.LESS_THAN) {
      swap(this.heap, index, parentIndex);
      this.siftUp(parentIndex);
    }
  }
  // 移除最小值
  extract(index = 0) {
    const leftChildIndex = this.getLeftChildIndex(index);
    const rightChildIndex = this.getRightChildIndex(index);
    const lastIndex = this.size() - 1;

    if (leftChildIndex <= lastIndex) {
      this.heap[index] = this.heap[leftChildIndex];
      this.extract(leftChildIndex);
    } else if (rightChildIndex <= lastIndex) {
      this.heap[index] = this.heap[rightChildIndex];
      this.extract(rightChildIndex);
    }
  }
  
  findMinimum() {
    if (!this.isEmpty()) {
      return this.heap[0];
    }
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
}

const heap = new MinHeap();

heap.insert(2);
heap.insert(3);
heap.insert(4);
heap.insert(5);
heap.insert(1);

console.log(heap.heap);