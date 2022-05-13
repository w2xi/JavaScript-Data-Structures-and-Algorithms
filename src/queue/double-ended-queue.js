// 双端队列(deque, 或者称 double-ended-queue)

function Deque() {
  const items = {}
  let count = 0
  let lowestCount = 0

  return {
    addFront(value){
      if (this.isEmpty()) {
        this.addBack(value)
      } else {
        lowestCount--
        items[lowestCount] = value
      }
    },

    removeFront(){
      if (!this.isEmpty()) {
        const item = items[lowestCount]
        delete items[lowestCount]
        lowestCount++

        return item
      }
    },

    addBack(value){
      items[count++] = value
    },

    removeBack(){
      if (!this.isEmpty()) {
        count--
        const item = items[count]
        delete items[count]

        return item
      }
    },

    peekFront(){
      if (!this.isEmpty()) {
        return items[lowestCount]
      }
    },

    peekBack(){
      if (!this.isEmpty()) {
        return items[count - 1]
      }
    },

    isEmpty(){
      return this.size() === 0
    },

    size(){
      return count - lowestCount
    },

    clear(){
      items = {}
      count = 0
      lowestCount = 0
    },

    toString(){
      if (this.isEmpty()) {
        return ''
      } else {
        let str = items[lowestCount]

        for (let i = lowestCount + 1; i < count; i++) {
          str = `${str},${items[i]}`
        }

        return str
      }
    },
  }
}

module.exports = Deque