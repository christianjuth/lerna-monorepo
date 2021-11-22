import { v4 as uuid } from "uuid";
import Heap from "heap";

const GRAPH_SEARCH_ID = "GRAPH_SEARCH_ID";

abstract class List<T> {
  abstract add: (node: T) => any;
  abstract remove: () => T;
  abstract size: () => number;
}

class Stack<T> implements List<T> {
  data: T[] = [];
  add(node: T) {
    this.data.push(node);
  }
  remove() {
    return this.data.pop();
  }
  size() {
    return this.data.length;
  }
}

class Queue<T> implements List<T> {
  data: T[] = [];
  add(node: T) {
    this.data.unshift(node);
  }
  remove() {
    return this.data.pop();
  }
  size() {
    return this.data.length;
  }
}

function getNodeKey(node: any) {
  if (typeof node === "string" || typeof node === "number") {
    return node;
  } else if (typeof node === "object") {
    return node[GRAPH_SEARCH_ID] ?? (node[GRAPH_SEARCH_ID] = uuid());
  }
}

interface SearchParams<T> {
  start: T;
  dest: T;
  getNeighbors: (node: T) => T[];
  getHeuristicDistance?: (node: T, dest: T) => number;
}

interface InternalSearchParams<T> extends SearchParams<T> {
  list: List<T>;
  bidirectional?: boolean;
}

function internalSearch<T>({
  start,
  dest,
  getNeighbors,
  list,
  bidirectional = false,
}: InternalSearchParams<T>) {
  const visited: Record<string, boolean> = {};
  const prevNodes: Record<string, T | null> = {};
  const finder: Record<string, "a" | "b"> = {};

  const startKey = getNodeKey(start);
  visited[startKey] = true;
  prevNodes[startKey] = null;
  finder[startKey] = "a";
  list.add(start);

  if (bidirectional) {
    const destKey = getNodeKey(dest);
    visited[destKey] = true;
    prevNodes[destKey] = null;
    finder[destKey] = "b";
    list.add(dest);
  }

  let pathStart = [dest];

  let foundDest = false;
  while (list.size() > 0 && !foundDest) {
    const crnt = list.remove();
    const crntKey = getNodeKey(crnt);

    if (crnt === dest && !bidirectional) {
      foundDest = true;
      break;
    }

    for (const neighbor of getNeighbors(crnt) ?? []) {
      const neighborKey = getNodeKey(neighbor);
      finder[neighborKey] = finder[neighborKey] ?? finder[crntKey];
      let isVisited = visited[neighborKey];

      if (finder[crntKey] !== finder[neighborKey]) {
        foundDest = true;
        pathStart =
          finder[crntKey] === "a" ? [crnt, neighbor] : [neighbor, crnt];
        break;
      } else if (!isVisited) {
        visited[neighborKey] = true;
        prevNodes[neighborKey] = crnt;
        list.add(neighbor);
      }
    }
  }

  if (!foundDest) {
    return;
  }

  const path: T[] = [];
  let [first, second] = pathStart;
  while (first) {
    path.unshift(first);
    first = prevNodes[getNodeKey(first)];
  }
  while (second) {
    path.push(second);
    second = prevNodes[getNodeKey(second)];
  }

  return path;
}

function heapSearch<T>({
  start,
  dest,
  getNeighbors,
  getHeuristicDistance = () => 1,
}: InternalSearchParams<T>): T[] | undefined {
  const visited: Record<string, boolean> = {};
  const prevNodes: Record<string, T | null> = {};

  const startKey = getNodeKey(start);

  const heuristic: Record<string, number> = {
    [startKey]: 0, // distance for start doesn't affect search
  };
  const heap = new Heap((a: T, b: T) => {
    return heuristic[getNodeKey(a)] - heuristic[getNodeKey(b)];
  });

  visited[startKey] = true;
  prevNodes[startKey] = null;
  heap.push(start);

  let foundDest = false;
  while (heap.size() > 0 && !foundDest) {
    const crnt = heap.pop();

    if (crnt === dest) {
      foundDest = true;
      break;
    }

    for (const neighbor of crnt ? getNeighbors(crnt) : []) {
      const neighborKey = getNodeKey(neighbor);
      let isVisited = visited[neighborKey];

      if (!isVisited) {
        visited[neighborKey] = true;
        prevNodes[neighborKey] = crnt;
        heuristic[neighborKey] = getHeuristicDistance(neighbor, dest);
        heap.push(neighbor);
      }
    }
  }

  if (!foundDest) {
    return;
  }

  const path: T[] = [];
  let crnt = dest;
  while (crnt) {
    path.unshift(crnt);
    crnt = prevNodes[getNodeKey(crnt)];
  }

  return path;
}

export function dfs<T>(config: SearchParams<T>) {
  return internalSearch({
    ...config,
    list: new Stack<T>(),
  });
}

export function bfs<T>(config: SearchParams<T>) {
  return internalSearch({
    ...config,
    list: new Queue<T>(),
  });
}

export function bidirectionalBfs<T>(config: SearchParams<T>) {
  return internalSearch({
    ...config,
    list: new Queue<T>(),
    bidirectional: true,
  });
}

export function bestFirstSearch<T>(config: SearchParams<T>) {
  return heapSearch({
    ...config,
    list: new Queue<T>(),
  });
}

export function validatePath<T>(
  path: T[] | undefined,
  getNeighbors: (node: T) => T[]
) {
  if (!path) {
    return false;
  }
  for (let i = 1; i < path.length; i++) {
    if (!getNeighbors(path[i - 1]).includes(path[i])) {
      return false;
    }
  }
  return true;
}

// const graph = {
//   'Washington': ['Oregon', 'Idaho'],
//   'Oregon': ['Washington', 'Idaho', 'California'],
//   'California': ['Nevada', 'Arizona', 'Oregon'],
//   'Idaho': ['Washington', 'Oregon', 'Montana', 'Wyoming', 'Utah', 'Nevada'],
//   'Nevada': ['Oregon', 'California', 'Idaho', 'Utah', 'Arizona'],
//   'Arizona': ['California', 'Nevada', 'Utah', 'New Mexico'],
//   'Utah': ['Idaho', 'Wyoming', 'Nevada', 'Arizona', 'Colorado'],
//   'Montana': ['Idaho', 'North Dakota', 'South Dakota', 'Wyoming'],
//   'Wyoming': ['Montana', 'Idaho', 'Utah', 'Colorado', 'Nebraska', 'South Dakota'],
//   'Colorado': ['Wyoming', 'Utah', 'Nebraska', 'Kansas', 'Oklahoma', 'New Mexico'],
//   'New Mexico': ['Arizona', 'Colorado', 'Texas', 'Oklahoma'],
//   'North Dakota': ['Montana', 'South Dakota', 'Minnesota'],
//   'South Dakota': ['North Dakota', 'Montana', 'Wyoming', 'Nebraska', 'Minnesota', 'Iowa'],
//   'Nebraska': ['South Dakota', 'Wyoming', 'Colorado', 'Kansas', 'Iowa', 'Missouri'],
//   'Kansas': ['Nebraska', 'Colorado', 'Oklahoma', 'Missouri'],
//   'Oklahoma': ['Kansas', 'Colorado', 'New Mexico', 'Texas', 'Missouri', 'Arkansas'],
//   'Texas': ['New Mexico', 'Oklahoma', 'Arkansas', 'Louisiana'],
//   'Minnesota': ['North Dakota', 'South Dakota', 'Iowa', "Wisconsin"],
//   'Iowa': ['Minnesota', 'South Dakota', 'Nebraska', 'Missouri', 'Illinois', 'Wisconsin'],
//   'Missouri': ['Iowa', 'Illinois', 'Kentucky', 'Tennessee', 'Arkansas'],
//   'Arkansas': ['Missouri', 'Oklahoma', 'Texas', 'Louisiana', 'Mississippi', 'Tennessee'],
//   'Louisiana': ['Texas', 'Arkansas', 'Mississippi'],
//   'Wisconsin': ['Michigan', 'Minnesota', 'Iowa', 'Illinois'],
//   'Illinois': ['Wisconsin', 'Iowa', 'Missouri', 'Kentucky', 'Indiana'],
//   'Kentucky': ['Illinois', 'Indiana', 'Ohio', 'West Virginia', 'Virginia', 'Tennessee', 'Missouri'],
//   'Tennessee': ['Missouri', 'Arkansas', 'Mississippi', 'Alabama', 'Georgia', 'North Carolina', 'Virginia', 'Kentucky'],
//   'Mississippi': ['Arkansas', 'Louisiana', 'Tennessee', 'Alabama'],
//   'Michigan': ['Wisconsin', 'Indiana'],
//   'Indiana': ['Michigan', 'Illinois', 'Kentucky', 'Ohio'],
//   'Alabama': ['Tennessee', 'Mississippi', 'Georgia', 'Florida'],
//   'Ohio': ['Michigan', 'Indiana', 'Kentucky', 'West Virginia', 'Pennsylvania'],
//   'Georgia': ['Tennessee', 'North Carolina', 'South Carolina', 'Florida', 'Alabama'],
//   'Florida': ['Alabama', 'Georgia'],
//   'New York': ['Pennsylvania', 'New Jersey', 'Massachusetts', 'New Hampshire', 'Connecticut'],
//   'Pennsylvania': ['New York', 'Ohio', 'West Virginia', 'Delaware', 'New Jersey'],
//   'West Virginia': ['Ohio', 'Pennsylvania', 'Maryland', 'Virginia', 'Kentucky'],
//   'Virginia': ['West Virginia', 'Maryland', 'North Carolina', 'Tennessee', 'Kentucky'],
//   'North Carolina': ['Virginia', 'Tennessee', 'South Carolina', 'Georgia'],
//   'South Carolina': ['North Carolina', 'Georgia'],
//   'Vermont': ['New York', 'New Hampshire', 'Rhode Island'],
//   'Massachusetts': ['Vermont', 'New York', 'New Hampshire', 'Rhode Island', 'Connecticut'],
//   'Rhode Island': ['Massachusetts', 'Connecticut'],
//   'Connecticut': ['Massachusetts', 'Rhode Island', 'New York'],
//   'New Jersey': ['New York', 'Pennsylvania', 'Delaware'],
//   'Delaware': ['New Jersey', 'Pennsylvania', 'Maryland'],
//   'Maryland': ['Pennsylvania', 'West Virginia', 'Virginia', 'Delaware'],
//   'New Hampshire': ['Vermont', 'Maine', 'Rhode Island'],
//   'Maine': ['Vermont'],
//   'Alaska': [],
//   'Hawaii': []
// }

// const path = bfs({
//   start: 'New Jersey',
//   dest: 'California',
//   getNeighbors: (node) => {
//     return graph[node]
//   }
// })

// const size = 8
// const startPos = [0,0]
// const destPos = [size-1, size-1]

// const map = Array(size).fill('').map((_,y) => Array(size).fill('').map((_,x) => {
//   const isStart = [x,y].join() == startPos.join()
//   const isDest = [x,y].join() == destPos.join()
//   const block = !isStart && !isDest && Math.random() < 1/10
//   return `${x},${y}${block ? 'B' : ' '}`
// }))

// function getNeighbors(cell: string) {
//   let pos = cell.split(',')
//   const x = parseInt(pos[0])
//   const y = parseInt(pos[1])

//   return [
//     map[y+1]?.[x],
//     map[y-1]?.[x],
//     map[y]?.[x+1],
//     map[y]?.[x-1],
//   ]
//   .filter(Boolean)
//   .filter(str => str.indexOf('B') === -1)
// }

// function getNodePosition(node: string) {
//   let pos = node.split(',')
//   return [parseInt(pos[0]), parseInt(pos[1]) ]
// }

// function manhattanDistance(a: string, b: string) {
//   const [ax, ay] = getNodePosition(a)
//   const [bx, by] = getNodePosition(b)
//   return Math.abs(bx - ax) + Math.abs(by - ay)
// }

// function euclideanDistance(a: string, b: string) {
//   const [ax, ay] = getNodePosition(a)
//   const [bx, by] = getNodePosition(b)
//   return Math.sqrt((bx - ax)**2 + (by - ay)**2)
// }

// const start = map[startPos[0]][startPos[1]]
// const dest = map[destPos[0]][destPos[1]]

// console.log(map.map(row => row.join(' ')).join('\n'))

// const path = bestFirstSearch({
//   start,
//   dest,
//   getNeighbors: (node) => getNeighbors(node),
//   getHeuristicDistance: (node, dest) => euclideanDistance(node, dest)
// })

// console.log(path, path?.length)

// console.log(validatePath(path, getNeighbors))
