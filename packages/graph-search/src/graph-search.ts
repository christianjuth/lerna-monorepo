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
    return this.data.pop()!;
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
    return this.data.pop()!;
  }
  size() {
    return this.data.length;
  }
}

function getNodeKey(node: any): string {
  if (typeof node === "object") {
    return node[GRAPH_SEARCH_ID] ?? (node[GRAPH_SEARCH_ID] = uuid());
  } else {
    return String(node);
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

  let pathStart: (T | null)[] = [dest];

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
  let crnt: typeof dest | null = dest;
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
