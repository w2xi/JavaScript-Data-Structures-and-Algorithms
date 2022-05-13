const Stack = require('./stack-obj-private')

// 十进制转二进制

// 10

// 10 / 2 = 5 % 0
// 5 / 2  = 2 % 1
// 2 / 2  = 1 % 0
// 1 / 2  = 0 % 1

// 10 -> 1010

function decimalToBinary(decimal) {
  const remStack = Stack()
  let binaryString = ''
  
  while (decimal > 0) {
    remStack.push(decimal % 2)
    decimal = Math.floor(decimal / 2)
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString()
  }

  return binaryString
}

// 十进制转任意进制(2 ~ 36)

function baseConverter(decimal, base = 2) {
  const remStack = Stack()
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz'
  let anyString = ''

  while (decimal > 0) {
    remStack.push(decimal % base)
    decimal = Math.floor(decimal / base)
  }

  while (!remStack.isEmpty()) {
    anyString += digits[remStack.pop()]
  }

  return anyString
}

console.log(decimalToBinary(10))    // 1010
console.log(baseConverter(10, 8))   // 12
console.log(baseConverter(10, 16))  // a