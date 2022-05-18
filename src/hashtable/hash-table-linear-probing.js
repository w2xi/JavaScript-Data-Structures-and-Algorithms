const defaultToString = require('../utils').defaultToString;
const ValuePair = require('../utils/value-pair');

// 线性探测法

class HashTableLinearProbing {
  constructor() {
    this.toStrFn = defaultToString;
    this.table = {};
  }

  put(key, value) {
    if (key && value) {
      let position = this.hashCode(key);

      console.log(`${position}: ${key}`);

      while (this.table[position]) {
        position++;
      }

      console.log(`${position}: ${key}`);
      console.log('-------------------');

      this.table[position] = new ValuePair(key, value);

      return true;
    }

    return false;
  }

  remove(key) {
    let position = this.hashCode(key);
    let valuePair = this.table[position];

    if (valuePair) {
      while (valuePair) {
        if (valuePair.key === key) {
          delete this.table[position];
          this.verifyRemoveSideEffect(key, position);
          return true;
        }
        valuePair = this.table[++position];
      }
    }

    return false;
  }

  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    let valuePair = this.table[index];

    while (valuePair) {
      const posHash = this.hashCode(valuePair.key);
      if ( posHash <= hash || posHash <= removedPosition) {
        console.log(`${index} => ${removedPosition}`);

        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      valuePair = this.table[++index];
    }
  }

  get(key) {
    let position = this.hashCode(key);
    let valuePair = this.table[position];

    while (valuePair) {
      if (valuePair.key === key) {
        return valuePair.value;
      }
      valuePair = this.table[++position];
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

  // 一个更好的散列函数
  // djb2HashCode(key) {
  //   const tableKey = this.toStrFn(key);
  //   let hash = 5381;
  //   for (let i = 0; i < tableKey.length; i++) {
  //     hash = (hash * 33) + tableKey.charCodeAt(i);
  //   }
  //   return hash % 1013;
  // }

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

module.exports = HashTableLinearProbing;

const hash = new HashTableLinearProbing();

console.log('--------- put start ---------');
hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');
console.log('--------- put end ---------');

// console.log(hash.get('Ygritte'));     // ygritte@email.com
// console.log(hash.get('Sue'));         // sue@email.com
// console.log(hash.get('Aethelwulf'));  // aethelwulf@email.com

console.log('--------- remove start ---------');
hash.remove('Jonathan');
console.log('--------- remove end ---------');

console.log('--------- table ---------');
console.log(hash.getTable());