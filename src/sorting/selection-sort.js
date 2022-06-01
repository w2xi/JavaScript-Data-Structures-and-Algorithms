const { defaultCompare, Compare, swap } = require("../utils");

// 选择排序
// O(n^2)

// 选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并
// 将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推

function selectionSort(array, compareFn = defaultCompare) {
  let minIndex;
  for (let i = 0; i < array.length - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (Compare.BIGGER_THAN === compareFn(array[minIndex], array[j])) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(array, i, minIndex);
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
let array = createNonSortedArray(100);
console.log(array.join());
array = selectionSort(array);
console.log(array.join());

// output:

// 5,4,3,2,1
// 1,2,3,4,5