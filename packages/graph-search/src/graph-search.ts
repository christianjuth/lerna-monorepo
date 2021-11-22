import { v4 as uuid } from 'uuid'

// class Node<T> {
//   data: T
// }

const GRAPH_SEARCH_ID = 'GRAPH_SEARCH_ID'

abstract class List<T> {  
  abstract add: (node: T) => any
  abstract remove: () => T
  abstract size: () => number
}

class Stack<T> implements List<T> {
  data: T[] = []
  add(node: T) {
    this.data.push(node)
  }
  remove() {
    return this.data.pop()
  }
  size() {
    return this.data.length
  }
}

class Queue<T> implements List<T> {
  data: T[] = []
  add(node: T) {
    this.data.unshift(node)
  }
  remove() {
    return this.data.pop()
  }
  size() {
    return this.data.length
  }
}

function getNodeKey(node: any) {
  if (typeof node === 'string' || typeof node === 'number') {
    return node
  } else if(typeof node === 'object') {
    return node[GRAPH_SEARCH_ID] ?? (node[GRAPH_SEARCH_ID] = uuid())
  }
}

interface SearchParams<T> {
  start: T
  dest: T
  getNeighbors: (node: T) => T[]
}

interface InternalSearchParams<T> extends SearchParams<T> {
  list: List<T>
}

function internalSearch<T>({
  start,
  dest,
  getNeighbors,
  list
}: InternalSearchParams<T>) {
  const visited: Record<string, boolean> = {}
  const prevNodes: Record<string, T | null> = {}
  let foundDest: T | null = null

  const startKey = getNodeKey(start)
  visited[startKey] = true
  prevNodes[startKey] = null

  list.add(start)

  while (list.size() > 0) {
    const crnt = list.remove()

    if (crnt === dest) {
      foundDest = dest
    } 
    
    for (const neighbor of (getNeighbors(crnt) ?? [])) {
      const neighborKey = getNodeKey(neighbor)
      let isVisited = visited[neighborKey]

      if (!isVisited) {
        visited[neighborKey] = true
        prevNodes[neighborKey] = crnt
        list.add(neighbor)
      }
    }
  }

  if (!foundDest) {
    return
  }

  const path: T[] = []
  let crnt = dest
  while (crnt) {
    path.unshift(crnt)
    crnt = prevNodes[getNodeKey(crnt)]
  }

  return path
}

export function dfs<T>(config: SearchParams<T>) {
  return internalSearch({
    ...config,
    list: new Stack<T>()
  })
}

export function bfs<T>(config: SearchParams<T>) {
  return internalSearch({
    ...config,
    list: new Queue<T>()
  })
}