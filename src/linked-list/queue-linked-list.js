const DoublyLinkedList = require('./doubly-linked-list');

function QueueLinkedList() {
  let items = DoublyLinkedList();

  return {
    enqueue(element) {
      items.push(element);
    },

    dequeue() {
      if (!this.isEmpty()) {
        return items.removeAt(0);
      }
    },

    peek() {
      if (!this.isEmpty()) {
        return items.getElementAt(0).val;
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

module.export = QueueLinkedList;




