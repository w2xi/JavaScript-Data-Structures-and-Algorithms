const Node = require('./node')

// 循环链表

function CircularLinkedList() {
  let head, count = 0;

  return {
    push(element) {
      const node = new Node(element);

      if (head) {
        // find the tail node
        let tail = this.getElementAt(this.size() - 1);
        tail.next = node;
      } else {
        head = node;
      }
      // set node.next to head - to have circular list
      node.next = head;
      count++;
    },

    // 向链表的特定位置插入一个新元素
    insert(element, index) {
      if (index >= 0 && index <= count) {
        const node = new Node(element);
        
        if (index === 0) {
          if (head) {
            // find the tail node
            const tail = this.getElementAt(this.size() - 1);
            node.next = head;
            head = node;
            tail.next = head;
          } else {
            head = node;
            node.next = head;
          }
        } else {
          const prev = this.getElementAt(index - 1);
          node.next = prev.next;
          prev.next = node;
        }
        count++;

        return true;
      }

      return false;
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

    // 从链表中移除一个元素
    remove(element) {
      const index = this.indexOf(element);

      return this.removeAt(index);
    },

    // 返回元素在链表中的索引。如果链表中没有该元素则返回-1
    indexOf(element) {
      let curr = head;

      for (let i = 0; i < this.size() && curr; i++) {
        if (curr.val === element) {
          return i;
        }
        curr = curr.next;
      }

      return -1;
    },

    // 从链表的特定位置移除一个元素
    removeAt(index) {
      if (index >= 0 && index < count) {
        let curr = head;

        if (index === 0) {
          if (count === 1) {
            head = null;
          } else {
            const tail = this.getElementAt(this.size() - 1);
            head = head.next;
            tail.next = head;
          }
        } else {
          // no need to update last element for circular list
          const prev = this.getElementAt(index - 1);
          curr = prev.next;
          prev.next = curr.next;
        }
        count--;

        return curr.val;
      }
    },

    getHead() {
      return head;
    },

    isEmpty() {
      return this.size() === 0;
    },

    size() {
      return count;
    },

    clear() {
      head = null;
      count = 0;
    },

    toString() {
      if (this.isEmpty()) {
        return ''
      } else {
        let str = head.val;
        let curr = head.next;
        let index = 0;

        for ( index = 1; index < count && curr; index++) {
          str = `${str},${curr.val}`
          curr = curr.next;
        }

        return str;
      }
    },
  }
}