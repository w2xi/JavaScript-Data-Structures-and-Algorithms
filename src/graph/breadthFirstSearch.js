const Graph = require("./graph");
const Queue = require("../queue/queue-obj");
const Stack = require('../stack/stack-obj');

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

const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue();
    const neighbors = adjList.get(currentVertex);
    color[startVertex] = Colors.GRAY;

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (color[neighbor] === Colors.WHITE) {
        color[neighbor] = Colors.GRAY;
        queue.enqueue(neighbor);
      }
    }
    color[currentVertex] = Colors.BLACK;

    if (callback) {
      callback(currentVertex);
    }
  }
};

// BFS 求最短路径
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  const distances = {};
  const predecessors = {};
  queue.enqueue(startVertex);
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }
  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue();
    const neighbors = adjList.get(currentVertex);
    color[currentVertex] = Colors.GRAY;

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      if (color[neighbor] === Colors.WHITE) {
        color[neighbor] = Colors.GRAY;
        
        distances[neighbor] = distances[currentVertex] + 1;
        predecessors[neighbor] = currentVertex;

        queue.enqueue(neighbor);
      }
    }
    color[currentVertex] = Colors.BLACK;
  }

  return { distances, predecessors };
}

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
breadthFirstSearch(graph, myVertices[0], printVertex);

// output:

// Visited vertex: A
// Visited vertex: B
// Visited vertex: C
// Visited vertex: D
// Visited vertex: E
// Visited vertex: F
// Visited vertex: G
// Visited vertex: H
// Visited vertex: I

const shortestPathA = BFS(graph, myVertices[0]);
console.log('********* sorthest path - BFS ***********');
console.log(shortestPathA.distances);
console.log(shortestPathA.predecessors);

// output:

// {
//   distances: { A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 },
//   predecessors: {
//     A: null,
//     B: 'A',
//     C: 'A',
//     D: 'A',
//     E: 'B',
//     F: 'B',
//     G: 'C',
//     H: 'D',
//     I: 'E'
//   }
// }

//from A to all other vertices
const fromVertex = myVertices[0];

for (let i = 1; i < myVertices.length; i++) {
  const toVertex = myVertices[i];
  const path = new Stack();
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v);
  }
  path.push(fromVertex);
  let s = path.pop();
  while (!path.isEmpty()) {
    s += ' - ' + path.pop();
  }
  console.log(s);
}

// output:

// A - B
// A - C
// A - D
// A - B - E
// A - B - F
// A - C - G
// A - D - H
// A - B - E - I