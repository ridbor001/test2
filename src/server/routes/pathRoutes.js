const express = require('express');
const router = express.Router();
const Place = require('../models/Place');

// 路径查找 (使用 A* 算法)
router.post('/', async (req, res) => {
  const { start, end } = req.body;

  try {
    // 构建邻接表
    const places = await Place.find();
    const graph = buildGraph(places);

    if (!graph[start] || !graph[end]) {
      return res.status(400).json({ error: `Invalid start (${start}) or end (${end}) node.` });
    }

    // 使用 A* 算法查找路径
    const path = aStar(graph, start, end);

    if (!path) {
      return res.status(404).json({ error: `No path found between ${start} and ${end}.` });
    }

    res.json({ path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// 构建邻接表函数
function buildGraph(places) {
  const graph = {};
  places.forEach((place) => {
    graph[place.name] = {
      connections: (place.connections || []).map((conn) => conn.to),
      heuristic: place.heuristic || 0 // 你可以为每个地点定义一个启发式值
    };
  });
  return graph;
}

// A* 算法
function aStar(graph, start, goal) {
  const openList = new PriorityQueue(); // 优先队列：根据 f 值排序
  const closedList = new Set();
  const gScores = {}; // 从起点到当前节点的实际距离
  const fScores = {}; // 从起点到目标节点的估计总成本
  const cameFrom = {}; // 记录路径

  // 初始化起点
  openList.push({ node: start, f: 0 });
  gScores[start] = 0;
  fScores[start] = graph[start].heuristic;

  while (!openList.isEmpty()) {
    // 取出 f 值最小的节点
    const current = openList.pop().node;

    if (current === goal) {
      // 如果到达目标，重建路径并返回
      return reconstructPath(cameFrom, current);
    }

    closedList.add(current);

    // 遍历当前节点的邻居
    for (const neighbor of graph[current].connections) {
      if (closedList.has(neighbor)) continue;

      const tentativeGScore = gScores[current] + 1; // 假设每条边的成本为 1

      if (!openList.contains(neighbor) || tentativeGScore < gScores[neighbor]) {
        cameFrom[neighbor] = current;
        gScores[neighbor] = tentativeGScore;
        fScores[neighbor] = gScores[neighbor] + graph[neighbor].heuristic;
        openList.push({ node: neighbor, f: fScores[neighbor] });
      }
    }
  }

  return null; // 如果没有找到路径
}

// 路径重建函数
function reconstructPath(cameFrom, current) {
  const path = [];
  while (current) {
    path.unshift(current);
    current = cameFrom[current];
  }
  return path;
}

// 优先队列类（实现 A* 中的优先队列）
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  push(element) {
    this.queue.push(element);
    this.queue.sort((a, b) => a.f - b.f); // 根据 f 值排序
  }

  pop() {
    return this.queue.shift();
  }

  contains(node) {
    return this.queue.some((el) => el.node === node);
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

module.exports = router;
