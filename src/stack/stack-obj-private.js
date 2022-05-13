// 基于函数的栈的实现

// 优点：
// 1. 只暴露了需要的方法 (items, count 为私有变量，不会被外部访问)

function Stack() {
  const items = {}
  let count = 0

  return {
    push(...args) {
      for (let i = 0; i < args.length; i++) {
        items[count] = args[i]
        count++
      }
    },

    pop() {
      if (!this.isEmpty()) {
        count--
        const result = items[count]
        delete items[count]

        return result
      }
    },

    peek() {
      if (!this.isEmpty()) {
        return items[count - 1]
      }
    },

    size() {
      return count
    },

    isEmpty() {
      return count === 0
    },

    clear() {
      // this.items = {}
      // this.count = 0

      // equals to:

      while (!this.isEmpty()) {
        this.pop()
      }
    },
  }
}

module.exports = Stack