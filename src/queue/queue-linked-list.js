const DoublyLinkedList = require("../linked-list/doubly-linked-list");

// 双向链表 实现 队列

class QueueLinkedList {
  constructor() {
    this.items = DoublyLinkedList();
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    if (!this.isEmpty()) {
      return this.items.removeAt(0);
    }
  }

  peek() {
    if (!this.isEmpty()) {
      return this.items.getElementAt(0).val;
    }
  }

  isEmpty() {
    return this.items.isEmpty();
  }

  size() {
    return this.items.size();
  }

  clear() {
    this.items.clear();
  }

  toString() {
    return this.items.toString();
  }
}

module.export = QueueLinkedList;