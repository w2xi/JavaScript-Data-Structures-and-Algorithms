// 计数排序 (整数排序算法)

function countingSort(array) {
  if (array.length < 2) {
    return array;
  }
  // 找到数组中最大值和最小值
  const max = Math.max(...array);
  const min = Math.min(...array);
  // 创建一个长度为max - min + 1的数组，用于存放每个数字出现的次数 并将数组中元素值初始化为0
  // max - min + 1 表示数组的最大大小，保证数组不越界
  const countArray = new Array(max - min + 1).fill(0);
  array.forEach(element => {
    countArray[element - min]++;
  });
  let index = 0;
  for (let i = 0; i < countArray.length; i++) {
    // countArray[i] = 0 表示当前数字没有出现
    while (countArray[i] > 0) {
      array[index] = i + min;
      countArray[i]--;
      index++;
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
let array = createNonSortedArray(5);
console.log(array.join());
array = countingSort(array);
console.log(array.join());

// output:

// 5,4,3,2,1
// 1,2,3,4,5