const Queue = require('./queue-obj');

// P.107 击鼓传花游戏 (Hot Potato Game)

function hotPotato(nameList, num) {
  const q = Queue();
  const eliminatedList = [];

  for (let i = 0; i < nameList.length; i++) {
    q.enqueue(nameList[i]);
  }

  while (q.size() > 1) {
    for (let i = 0; i < num; i++) {
      q.enqueue(q.dequeue());
    }
    eliminatedList.push(q.dequeue());
  }

  return {
    eliminatedList,      // 被淘汰者列表
    winner: q.dequeue(), // 获胜者
  }
}

const result = hotPotato(['A', 'B', 'C', 'D', 'E', 'F'], 3);

console.log(result); 

// output:

// { eliminatedList: [ 'D', 'B', 'A', 'C', 'F' ], winner: 'E' }