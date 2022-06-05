const DoublyLinkedList = require('../linked-list/doubly-linked-list')

function StackLinkedList() {
  let items = DoublyLinkedList()

  return {
    push(element) {
      items.push(element);
    },

    pop() {
      if (!this.isEmpty()) {
        return items.removeAt(items.size() - 1);
      }
    },

    peek() {
      if (!items.isEmpty()) {
        return items.getElementAt(items.size() - 1).val;
      }
    },

    isEmpty() {
      return items.isEmpty();
    },

    size() {
      return items.size();
    },

    clear() {
      items.clear();
    },

    toString() {
      return items.toString();
    }
  }
}

module.exports = StackLinkedList;

