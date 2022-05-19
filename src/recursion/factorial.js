// 阶乘

// 迭代
function factorialIterative(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// 递归
function factorialRecursive(n) {
  if (n === 1 || n === 0) {
    return 1;
  }
  return n * factorialRecursive(n - 1);
}

// 递归思路：
// 1. 有一个出口，就是 n === 1 || n === 0
// 2. 把一个任务拆分正若干个相同的子任务，然后把子任务分别求解

// 5! = 5 * 4!
// 4! = 4 * 3!
// 3! = 3 * 2!
// 2! = 2 * 1!
// 1! = 1 * 0!
// 0! = 1

console.log(factorialIterative(5)); // 120
console.log(factorialRecursive(5)); // 120