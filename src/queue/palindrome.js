const Qeque = require('./double-ended-queue')

// P.108 回文检查器

function palindromeChecker(aString){
  const q = Qeque()

  if (!aString) {
    return false
  }

  // 移除字符串中的空格
  const lowerString = aString.toLowerCase().split(' ').join('')

  for (let i = 0; i < lowerString.length; i++) {
    q.addBack(lowerString[i])
  }

  let isEqual = true

  while (q.size() > 1 && isEqual) {
    if (q.removeFront() !== q.removeBack()) {
      isEqual = false
    }
  }

  return isEqual
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets')); 

// output:

// a true
// aa true
// kayak true
// level true
// Was it a car or a cat I saw true
// Step on no pets false
