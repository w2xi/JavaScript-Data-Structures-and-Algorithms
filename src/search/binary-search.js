const quickSort = require('../sorting/quick-sort');

// 二分查找
// 在一个已经排好序的数组中查找一个值，如果数组中存在这个值，则返回它的索引，否则返回-1

function binarySearch(array, target) {
  const sortedArray = quickSort(array);

  let left = 0;
  let right = sortedArray.length - 1;
  
  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (target < sortedArray[middle]) {
      right = middle - 1;
    } else if (target > sortedArray[middle]) {
      left = middle + 1;
    } else {
      return middle;
    }
  }

  return -1;
}

module.exports = binarySearch;

// const array = [-1,0,1,2,3,4,5,10,100];
// console.log(binarySearch(array, -1)); // 0
// console.log(binarySearch(array, 100)); // 8