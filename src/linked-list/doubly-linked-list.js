const DoublyNode = require('./doubly-node')

// 双向链表

function DoublyLinkedList() {
  let head, tail;
  let count = 0;

  return {
    push(element) {
      const node = new DoublyNode(element);

      if (head) {
        let curr = head;
        // find the tail node
        while (curr.next) {
          curr = curr.next;
        }
        curr.next = node;
        node.prev = curr;
        tail = node;
      } else {
        head = node;
        tail = node;
      }
      count++;
    },

    insert(element, index) {
      if (index >= 0 && index <= count) {
        const node = new DoublyNode(element);

        if (index === 0) {
          // 插入到第一个节点
          if (head) {
            node.next = head;
            head.prev = node;
            head = node;
          } else {
            head = node;
            tail = node;
          }
        } else if (index === count) {
          // 插入到最后一个节点
          tail.next = node;
          node.prev = tail;
          tail = node;
        } else {
          const prev = this.getElementAt(index - 1);
          const curr = prev.next;

          node.next = curr;
          node.prev = prev;
          curr.prev = node;
          prev.next = node;
        }
        count++;

        return true;
      }

      return false;
    },

    // 从链表中移除一个元素
    remove(element) {
      const index = this.indexOf(element);

      return this.removeAt(index);
    },

    // 从链表的特定位置移除一个元素
    removeAt(index) {
      if (index >= 0 && index < count) {
        let curr = head;
        if (index === 0) {
          head = curr.next;
          if (count === 1) {
            tail = null;
          } else {
            head.prev = null;
          }
        } else if (index === count - 1) { // 最后一项
          curr = tail;
          tail = curr.prev;
          tail.next = null;
        } else {
          curr = this.getElementAt(index);
          const prev = curr.prev;
          prev.next = curr.next;
          curr.next.prev = prev;
        }
        count--;

        return curr.val;
      }
    },

    // 返回链表中特定位置的节点。如果链表中不存在这样的节点，则返回 undefined
    getElementAt(index) {
      if (index >= 0 && index <= count) {
        let node = head;

        for (let i = 0; i < index && node; i++) {
          node = node.next;
        }

        return node;
      }
    },

    // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
    indexOf(element) {
      let curr = head;
      let index = 0;

      while (curr) {
        if (curr.val === element) {
          return index;
        }
        curr = curr.next;
        index++;
      }

      return -1;
    },

    getHead() {
      return head;
    },

    getTail() {
      return tail;
    },

    isEmpty() {
      return this.size() === 0;
    },

    size() {
      return count;
    },

    clear() {
      head = null;
      tail = null;
      count = 0;
    },

    toString() {
      if (this.isEmpty()) {
        return ''
      } else {
        let str = head.val;
        let curr = head.next;

        while (curr) {
          str = `${str},${curr.val}`
          curr = curr.next;
        }

        return str;
      }
    },

    inverseToString() {
      if (this.isEmpty()) {
        return ''
      } else {
        let str = tail.val;
        let curr = tail.prev;

        while (curr) {
          str = `${str},${curr.val}`
          curr = curr.prev;
        }

        return str;
      }
    },
  }
}

module.exports = DoublyLinkedList