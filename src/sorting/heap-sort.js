const { swap } = require('../utils');

// 堆排序
// 时间复杂度：O(nlogn)
// 空间复杂度：O(1)

function heapSort(array) {
  let heapSize = array.length;
  buildMaxHeap(array);
  while (heapSize > 1) {
      swap(array, 0, --heapSize);
      heapify(array, 0, heapSize);
  }
  return array;
}
function buildMaxHeap(array) {
  for (let i = Math.floor(array.length / 2); i >= 0; i--) {
      heapify(array, i, array.length);
  }
}
function heapify(array, index, heapSize) {
  let largest = index;
  const left = index * 2 + 1;
  const right = index * 2 + 2;

  if (left < heapSize && array[index] < array[left]) {
      largest = left;
  }
  if (right < heapSize && array[largest] < array[right]) {
      largest = right;
  }
  if (index !== largest) {
      swap(array, index, largest);
      heapify(array, largest, heapSize);
  }
}

let arr = [5, 4, 3, 2, 1];
arr = heapSort(arr);
console.log(arr.join());