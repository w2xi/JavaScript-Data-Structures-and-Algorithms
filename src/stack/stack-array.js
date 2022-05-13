// 基于数组的栈的实现

// 优点：
// 1. 可读性好，易于理解

// 缺点：
// 1. 占用内存较大
// 2. 大部分方法都是 O(n) 的时间复杂度，效率不高

class Stack {
  constructor() {
    this.items = []
  }

  push(...args){
    this.items.push(...args)
  }

  pop(){
    return this.items.pop()
  }

  // 返回栈顶元素，不对栈做任何修改
  peek(){
    return this.items[this.items.length - 1]
  }

  isEmpty(){
    return this.items.length === 0
  }
  
  size(){
    return this.items.length
  }

  clear(){
    this.items.length = []
  }
}

const s = new Stack()

console.log(s.isEmpty()) // true
s.push(1, 2, 3, 4)
console.log(s.size()) // 4
console.log(s.peek()) // 4
console.log(s.pop()) // 4
s.clear()
console.log(s.isEmpty()) // true

