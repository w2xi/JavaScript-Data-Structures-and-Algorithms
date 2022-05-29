const { defaultCompare, Compare } = require("../utils");

function insertionSort(array, compareFn = defaultCompare) {
  let temp;
  for (let i = 1; i < array.length; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
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
let array = createNonSortedArray(5);
console.log(array.join());
array = insertionSort(array);
console.log(array.join());

// output:

// 5,4,3,2,1
// 1,2,3,4,5
