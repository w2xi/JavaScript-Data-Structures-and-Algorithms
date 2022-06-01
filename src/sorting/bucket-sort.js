const insertionSort = require('./insertion-sort');

// 桶排序 (分布式排序算法)

// 描述：
// 将元素分在不同的桶中(较小的数组)，
// 使用一个简单的排序算法，例如插入排序，来对每个桶排序
// 最后将所有桶合并为结果数组

// 缺点:
// 1. 对于非常稀疏的数组 如 [1, 1000000]
//   如果不合理调整 bucketSize 的大小，会导致创建大量的空桶，从而降低性能(占用更多的内存，消耗更多的时间)

function bucketSort(array, bucketSize = 5) {
  if (array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize);
  return sortBuckets(buckets);
}

function createBuckets(array, bucketSize) {
  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);
  // 桶的数量
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  // 初始化
  const buckets = Array.from({ length: bucketCount }, () => []);
  // 装桶
  for (let i = 0; i < array.length; i++) {
    const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

function sortBuckets(buckets) {
  const sortedArray = [];

  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i]) {
      // 对小数组 插入排序
      insertionSort(buckets[i]);
      sortedArray.push(...buckets[i]);
    }
  }
  return sortedArray;
}

function createNonSortedArray(size) {
  const array = [];
  for (let i = size; i > 0; i--) {
    array.push(i);
  }
  return array;
}
// let array = createNonSortedArray(5);
let array = [100000000, 1];
console.log(array.join());
array = bucketSort(array);
console.log(array.join());

// output:

// 5,4,3,2,1
// 1,2,3,4,5