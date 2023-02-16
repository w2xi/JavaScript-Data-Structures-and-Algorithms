const { defaultCompare, Compare, swap } = require("../utils");

// 冒泡排序
// O(n^2)

function bubbleSort(array, compareFn = defaultCompare) {
  for (let i = 0; i < array.length; i++) {
    let isSorted = true;

    for (let j = 0; j < array.length - i - 1; j++) {
      if (Compare.BIGGER_THAN === compareFn(array[j], array[j + 1])) {
        swap(array, j, j + 1);
        isSorted = false;
      }
    }
    // 如果数组已经有序，则退出循环
    if (isSorted) {
      break;
    }
  }
  return array;
}

function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}
// let array = createNonSortedArray(5);
let array = [1,2,3,4,5,6,7,8,9,10];
console.log(array.join());
array = bubbleSort(array);
console.log(array.join());

// output:

// 5,4,3,2,1
// 1,2,3,4,5
