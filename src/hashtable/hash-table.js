const defaultToString = require('../utils').defaultToString;
const ValuePair = require('../utils/value-pair');

// 散列表 / 哈希表
// 理论基础:
// https://github.com/youngyangyang04/leetcode-master/blob/master/problems/%E5%93%88%E5%B8%8C%E8%A1%A8%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.md

class HashTable {
  constructor() {
    this.toStrFn = defaultToString;
    this.table = {};
  }

  put(key, value) {
    if (key && value) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }

    return false;
  }

  remove(key) {
    const hash = this.hashCode(key);
    if (this.table[hash]) {
      delete this.table[hash];
      return true;
    }
    return false;
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair ? valuePair.value : undefined;
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

module.exports = HashTable;

// const hash = new HashTable();

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

// 存在冲突，相同 hashCode 的 key 值会被覆盖(后面的会覆盖前面的)

// {4 => [#Ygritte: ygritte@email.com]}
// {5 => [#Aethelwulf: aethelwulf@email.com]}
// {7 => [#Athelstan: athelstan@email.com]}
// {8 => [#Jasmine: jasmine@email.com]}
// {9 => [#Jake: jake@email.com]}
// {10 => [#Sargeras: sargeras@email.com]}