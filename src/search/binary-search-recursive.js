const quickSort = require('../sorting/quick-sort');

// 二分查找 (递归实现)

function binarySearchRecursive(array, target) {
  return helper(quickSort(array), 0, array.length - 1, target);
}

function helper(array, left, right, target) {
  const middle = Math.floor((left + right) / 2);

  if (left <= right) {
    if (target < array[middle]) {
      return helper(array, left, middle - 1, target);
    } else if (target > array[middle]) {
      return helper(array, middle + 1, right, target);
    } else {
      return middle;
    }
  } else {
    return -1;
  }
}

module.exports = binarySearchRecursive;

// const array = [1,2,3,4,5];
// console.log(binarySearchRecursive(array, 2)); // 1
// console.log(binarySearchRecursive(array, 5)); // 4
