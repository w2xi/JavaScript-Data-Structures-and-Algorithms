function Queue() {
  const items = {}
  let count = 0
  let lowestCount = 0

  return {
    enqueue(...args) {
      args.forEach(item => {
        items[count] = item
        count++
      })
    },

    dequeue() {
      if (!this.isEmpty()) {
        const item = items[lowestCount]
        delete items[lowestCount]
        lowestCount++

        return item
      }
    },

    peek() {
      return items[lowestCount]
    },

    isEmpty() {
      return this.size() === 0
    },

    size() {
      return count - lowestCount
    },

    clear() {
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

module.exports = Queue