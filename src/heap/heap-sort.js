const { defaultCompare, swap } = require('../utils');

// 堆化 (下移操作)
function heapify(array, index, heapSize, compareFn) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  let largest = index;

  if (left < heapSize && compareFn(array[left], array[largest]) > 0) {
    largest = left;
  }
  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right;
  }
  if (largest !== index) {
    swap(array, index, largest);
    heapify(array, largest, heapSize, compareFn);
  }
}

// 构建大根堆，使得每个父节点的元素大于等于它的子节点
// 此时整个序列最大值即为堆顶元素
// Reference: https://leetcode.cn/problems/sort-an-array/solution/pai-xu-shu-zu-by-leetcode-solution/
function buildMaxHeap(array, compareFn) {
  const size = array.length;
  // 只对堆中前半部分元素堆化(因为后半部分都是叶子节点, 没有子节点, 做下移操作没有意义)
  for (let i = Math.floor(size / 2); i >= 0; i--) {
    heapify(array, i, size, compareFn);
  }
}

// 堆排序
// 时间复杂度: O(nlog(n))
// 空间复杂度: O(1)
function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  
  while (heapSize > 1) {
    // 交换堆第一个元素和最后一个元素
    swap(array, 0, --heapSize);
    // 堆化
    heapify(array, 0, heapSize, compareFn);
  }
  // 结束后，堆中的数据是从小到大排序的
  return array;
}

const arr = heapSort([ 1, 3, 5, 7, 9, 2, 4, 6, 8, 10 ]);
console.log(arr);  // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
