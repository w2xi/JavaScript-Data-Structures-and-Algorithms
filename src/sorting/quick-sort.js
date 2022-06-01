const { defaultCompare, Compare, swap } = require('../utils');

// 快速排序
// 时间复杂度为O(nlogn)
// 算法结构：分治法

// (1) 首先，从数组中选择一个值作为主元（pivot），也就是数组中间的那个值。
// (2) 创建两个指针（引用），左边一个指向数组第一个值，右边一个指向数组最后一个值。移
// 动左指针直到我们找到一个比主元大的值，接着，移动右指针直到找到一个比主元小的值，然后
// 交换它们，重复这个过程，直到左指针超过了右指针。这个过程将使得比主元小的值都排在主元
// 之前，而比主元大的值都排在主元之后。这一步叫作划分（partition）操作。
// (3) 接着，算法对划分后的小数组（较主元小的值组成的子数组，以及较主元大的值组成的
// 子数组）重复之前的两个步骤，直至数组已完全排序。

function quickSort(array, compareFn = defaultCompare) {
  return quickSortHelper(array, 0, array.length - 1, compareFn);
}

function quickSortHelper(array, start, end, compareFn) {
  if (start >= end) return array;
  const pivotIndex = partition(array, start, end, compareFn);
  quickSortHelper(array, start, pivotIndex - 1, compareFn);
  quickSortHelper(array, pivotIndex, end, compareFn);
  return array;
}

function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;
  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++;
    }
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    if (i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

module.exports = quickSort;

// function createNonSortedArray(size) {
//   const array = [];
//   for (let i = size; i > 0; i--) {
//     array.push(i);
//   }
//   return array;
// }
// let array = createNonSortedArray(5);
// console.log(array.join());
// array = quickSort(array);
// console.log(array.join());

// output:

// 5,4,3,2,1
// 1,2,3,4,5