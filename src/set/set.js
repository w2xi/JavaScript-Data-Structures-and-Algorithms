// 集合

class Set {
  constructor() {
    this.items = {};
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  values() {
    return Object.values(this.items);
  }

  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  intersection(otherSet) {
    const intersectionSet = new Set();
    // 优化: 使用更小的集合来迭代
    const values = this.size() > otherSet.size() ? otherSet.values() : this.values();
    otherSet = this.size() > otherSet.size() ? this : otherSet;

    values.forEach(value => {
      if (otherSet.has(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }
  
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  subset(otherSet) {
    if (this.size() > otherSet.size()) {
      return false;
    }
    return this.values().every(value => otherSet.has(value));
  }
}

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);
setB.add(5);

console.log(setA.union(setB).values()); // [1, 2, 3, 4, 5]
console.log(setA.intersection(setB).values()); // [2, 3]
console.log(setA.difference(setB).values()); // [1]
console.log(setB.difference(setA).values()); // [4, 5]

const setC = new Set();
setC.add(1);
setC.add(2);
setC.add(3);

console.log(setA.subset(setB)); // false
console.log(setB.subset(setA)); // false
console.log(setA.subset(setC)); // true
console.log(setC.subset(setA)); // true
