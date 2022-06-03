// 内插搜索

function interpolationSearch(array, target) {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;

  while ( low <= high && target >= array[low] && target <= array[high] ) {
    delta = (target - array[low]) / (array[high] - array[low]);
    position = low + Math.floor((high - low) * delta); 

    if (array[position] === target) {
      return position;
    }
    if (array[position] < target) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return DOES_NOT_EXIST;
}

const array = [-1,0,1,2,3,4,5,10,100];
console.log(interpolationSearch(array, -1)); // 0
console.log(interpolationSearch(array, 100)); // 8