const LinkedList = require('../linked-list/linked-list');
const defaultToString = require('../utils/index').defaultToString;
const ValuePair = require('../utils/value-pair');

// P.166 分离链接法 处理冲突

class HashTableSeparateChaining {
  constructor() {
    this.toStrFn = defaultToString;
    this.table = {};
  }

  put(key, value) {
    if (key && value) {
      const position = this.hashCode(key);

      if (!this.table[position]) {
        this.table[position] = LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }

  remove(key) {
    const hash = this.hashCode(key);
    const linkedList = this.table[hash];

    if (linkedList && !linkedList.isEmpty()) {
      const current = linkedList.getHead();

      while (current) {
        if (current.val.key === key) {
          linkedList.remove(current.val);
          if (linkedList.isEmpty()) {
            delete this.table[hash];
          }
          return true;
        }
        current = current.next;
      }

      return true;
    }
    return false;
  }

  get(key) {
    const hash = this.hashCode(key);
    const linkedList = this.table[hash];

    if (linkedList && !linkedList.isEmpty()) {
      const current = linkedList.getHead();

      while (current) {
        if (current.val.key === key) {
          return current.val.value;
        }
        current = current.next;
      }
    }
  }

  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }

    const tableKey = this.toStrFn(key);
    let hash = 0;

    for (let i = 0; i < tableKey.length; i++) {
      hash += key.charCodeAt(i);
    }

    return hash % 37;
  }

  getTable() {
    return this.table;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return Object.keys(this.table).length;
  }

  clear() {
    this.table = {};
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;

    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
    }
    
    return objString;
  }
}

module.exports = HashTableSeparateChaining;

// const hash = new HashTableSeparateChaining();

// hash.put('Ygritte', 'ygritte@email.com');
// hash.put('Jonathan', 'jonathan@email.com');
// hash.put('Jamie', 'jamie@email.com');
// hash.put('Jack', 'jack@email.com');
// hash.put('Jasmine', 'jasmine@email.com');
// hash.put('Jake', 'jake@email.com');
// hash.put('Nathan', 'nathan@email.com');
// hash.put('Athelstan', 'athelstan@email.com');
// hash.put('Sue', 'sue@email.com');
// hash.put('Aethelwulf', 'aethelwulf@email.com');
// hash.put('Sargeras', 'sargeras@email.com'); 

// console.log(hash.toString())

// {4 => [#Ygritte: ygritte@email.com]}
// {5 => [#Jonathan: jonathan@email.com],[#Jamie: jamie@email.com],[#Sue: sue@email.com],[#Aethelwulf: aethelwulf@email.com]}
// {7 => [#Jack: jack@email.com],[#Athelstan: athelstan@email.com]}
// {8 => [#Jasmine: jasmine@email.com]}
// {9 => [#Jake: jake@email.com]}
// {10 => [#Nathan: nathan@email.com],[#Sargeras: sargeras@email.com]}