const { swap } = require('../utils');

function shuffle(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    swap(array, currentIndex, randomIndex);
  }
  return array;
}

module.exports = shuffle;

// const arr = [1,2,3,4,5,6,7,8,9,10];

// console.log(shuffle(arr));
