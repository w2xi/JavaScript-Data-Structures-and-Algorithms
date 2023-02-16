function Node(val) {
  this.val = val;
  this.next = null;
}

class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }
  // 向链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);

    if (this.head) {
      let curr = this.head;
      // find the tail node
      while (curr.next) {
        curr = curr.next;
      }
      curr.next = node;
    } else {
      this.head = node;
    }
    this.count++;
  }
  // 向链表的特定位置插入一个新元素
  insert(element, index) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        const prev = this.getElementAt(index - 1);
        node.next = prev.next;
        prev.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  // 返回链表中特定位置的节点。如果链表中不存在这样的节点，则返回 undefined
  getElementAt(index) {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      for (let i = 0; i < index && node; i++) {
        node = node.next;
      }
      return node;
    }
  }

  // 从链表中移除一个元素
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
  indexOf(element) {
    let curr = this.head;
    let index = 0;
    while (curr) {
      if (curr.val === element) {
        return index;
      }
      curr = curr.next;
      index++;
    }
    return -1;
  }

  // 从链表的特定位置移除一个元素
  removeAt(index) {
    if (index >= 0 && index < this.count) {
      let curr = this.head;
      if (index === 0) {
        this.head = this.head.next;
      } else {
        const prev = this.getElementAt(index - 1);
        curr = prev.next;
        prev.next = curr.next;
      }
      this.count--;
      return curr.val;
    }
  }

  getHead() {
    return this.head;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.head = null;
    this.count = 0
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    } else {
      let str = this.head.val;
      let curr = this.head.next;
      while (curr) {
        str = `${str},${curr.val}`
        curr = curr.next;
      } 
      return str;
    }
  }
}

module.exports = LinkedList;