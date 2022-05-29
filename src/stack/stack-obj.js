// 基于对象的栈的实现

// 优点：
// 1. 除了toString()方法，其他方法都是 O(1) 的时间复杂度
// 2. 想比较使用数组的方式实现，占用的内存更少

// 缺点：
// 1. count, items 属性不是私有的，外部可以直接访问，这是不安全的

class Stack {
  constructor() {
    this.count = 0
    this.items = {}
  }
  
  push(...args) {
    for (let i = 0; i < args.length; i++) {
      this.items[this.count] = args[i]
      this.count++
    }
  }

  pop() {
    if (!this.isEmpty()) {
      this.count--
      const result = this.items[this.count]
      delete this.items[this.count]

      return result
    }
  }

  peek(){
    if (!this.isEmpty()) {
      return this.items[this.count - 1]
    }
  }

  size(){
    return this.count
  }

  isEmpty(){
    return this.count === 0
  }

  clear(){
    // this.items = {}
    // this.count = 0
    
    // equals to:

    while(!this.isEmpty()) {
      this.pop()
    }
  }

  toString(){
    if (this.isEmpty()) {
      return ''
    }

    let str = `${this.items[0]}`
    for (let i = 1; i < this.count; i++) {
      str = `${str},${this.items[i]}`
    }

    return str
  }
}

module.exports = Stack;