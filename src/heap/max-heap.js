const MinHeap = require('./min-heap');
const { defaultCompare, reverseCompare } = require('../utils');

class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
    this.compareFn = reverseCompare(compareFn);
  }
}

module.exports = MaxHeap;

// const heap = new MaxHeap();

// heap.insert(2);
// heap.insert(3);
// heap.insert(4);
// heap.insert(5);
// heap.insert(1);

// console.log(heap.getAsArray());   // [ 5, 4, 3, 2, 1 ]
// console.log(heap.isEmpty());      // false
// console.log(heap.size());         // 5
// console.log(heap.findMinimum());  // 5

// heap.extract();
// console.log(heap.getAsArray());  // [ 4, 2, 3, 1 ]