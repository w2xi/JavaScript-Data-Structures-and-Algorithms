// 0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
function fibonacciRecursive(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

function fibonacciIterative(n) {
  if (n < 1) return 0;
  let last = 0;
  let curr = 1;
  let result = n;

  for (let i = 2; i <= n; i++) {
    result = last + curr;
    last = curr;
    curr = result;
  }

  return result;
}

// 记忆化（保存前一个结果的值的优化技术，类似于缓存），解决重复调用计算问题，明显降低递归次数
// 动态规划 DP
function fibonacciMemoization(n) {
  if (n < 1) return 0;
  const memo = [0, 1];
  const fibonacciMeo = (num) => {
    if (memo[num] != null) return memo[num];
    return memo[num] = fibonacciMeo(num - 1) + fibonacciMeo(num - 2);
  }

  return fibonacciMeo(n);
}

console.log(fibonacciIterative(10));    // 55
console.log(fibonacciRecursive(10));    // 55
console.log(fibonacciMemoization(10));  // 55