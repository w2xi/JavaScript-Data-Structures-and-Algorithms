const Dictionary = require('../dictionary/dictionary');

class Graph {
  constructor(isDirected = false) {
    // 是否是有向图 默认是无向图
    this.isDirected = isDirected;
    // 顶点
    this.vertices = [];
    // 邻接表 (字典将会使用顶点的名字作为键，邻接顶点列表作为值)
    this.adjList = new Dictionary();
  }

  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  addEdge(v, w) {
    if (!this.adjList.get(v)) {
      this.addVertex(v);
    }
    if (!this.adjList.get(w)) {
      this.addVertex(w);
    }
    this.adjList.get(v).push(w);

    if (!this.isDirected) { // 无向图
      this.adjList.get(w).push(v);
    }
  }

  getVertices() {
    return this.vertices;
  }

  getAdjList() {
    return this.adjList;
  }

  toString() {
    const vertices = this.getVertices();
    const adjList = this.getAdjList();

    let str = '';
    vertices.forEach(v => {
      str += `${v} -> `;
      adjList.get(v).forEach(w => {
        str += `${w} `;
      });
      str += '\n';
    });
    return str;
  }
}

module.exports = Graph;

// const graph = new Graph();

// const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
// for (let i = 0; i < myVertices.length; i++) {
//  graph.addVertex(myVertices[i]);
// }
// graph.addEdge('A', 'B');

// graph.addEdge('A', 'C');
// graph.addEdge('A', 'D');
// graph.addEdge('C', 'D');
// graph.addEdge('C', 'G');
// graph.addEdge('D', 'G');
// graph.addEdge('D', 'H');
// graph.addEdge('B', 'E');
// graph.addEdge('B', 'F');
// graph.addEdge('E', 'I');

// console.log(graph.toString());