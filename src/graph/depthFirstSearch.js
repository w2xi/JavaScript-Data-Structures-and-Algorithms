const Graph = require("./graph");

const Colors = {
  WHITE: 0, // 未访问
  GREY: 1,  // 已访问，未探索
  BLACK: 2, // 已访问，已探索
};

const initializeColor = (vertices) => {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
};

// 深度优先搜索

const depthFirstSearch = (graph, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === Colors.WHITE) {
      // 这里只会调用一次 因为递归调用的时候，会将其他的点都访问过了
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
};

const depthFirstSearchVisit = (startVertex, color, adjList, callback) => {
  color[startVertex] = Colors.GRAY;

  if (callback) {
    callback(startVertex);
  }
  const neighbors = adjList.get(startVertex);

  for (let i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i];
    if (color[neighbor] === Colors.WHITE) {
      depthFirstSearchVisit(neighbor, color, adjList, callback);
    }
  }
  color[startVertex] = Colors.BLACK;
};

const graph = new Graph();
const myVertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");

const printVertex = (value) => console.log('Visited vertex: ' + value);
depthFirstSearch(graph, printVertex);

// output:

// Visited vertex: A
// Visited vertex: B
// Visited vertex: E
// Visited vertex: I
// Visited vertex: F
// Visited vertex: C
// Visited vertex: D
// Visited vertex: G
// Visited vertex: H