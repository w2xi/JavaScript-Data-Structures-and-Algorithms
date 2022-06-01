const { defaultCompare, Compare } = require('../utils');

// 归并排序 (分而治之)
// 将一个大的数组分成若干个小的数组，直到每个小数组只有一个元素，然后递归的将这些小数组排序，最后将这些小数组合并成一个大的数组
// 时间复杂度为 O(nlogn)
// 空间复杂度为 O(n)

function mergeSort(array, compareFn = defaultCompare) {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  return merge(mergeSort(left, compareFn), mergeSort(right, compareFn), compareFn);
}

function merge(left, right, compareFn) {
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftItem = left[leftIndex];
    const rightItem = right[rightIndex];

    if (compareFn(leftItem, rightItem) === Compare.LESS_THAN) {
      result.push(leftItem);
      leftIndex++;
    } else {
      result.push(rightItem);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}
let array = createNonSortedArray(5);
console.log(array.join());
array = mergeSort(array);
console.log(array.join());

// output:

// 5,4,3,2,1
// 1,2,3,4,5
