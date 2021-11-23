"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePath = exports.bestFirstSearch = exports.bidirectionalBfs = exports.bfs = exports.dfs = void 0;
const uuid_1 = require("uuid");
const heap_1 = require("heap");
const GRAPH_SEARCH_ID = "GRAPH_SEARCH_ID";
class List {
}
class Stack {
    constructor() {
        this.data = [];
    }
    add(node) {
        this.data.push(node);
    }
    remove() {
        return this.data.pop();
    }
    size() {
        return this.data.length;
    }
}
class Queue {
    constructor() {
        this.data = [];
    }
    add(node) {
        this.data.unshift(node);
    }
    remove() {
        return this.data.pop();
    }
    size() {
        return this.data.length;
    }
}
function getNodeKey(node) {
    var _a;
    if (typeof node === "string" || typeof node === "number") {
        return node;
    }
    else if (typeof node === "object") {
        return (_a = node[GRAPH_SEARCH_ID]) !== null && _a !== void 0 ? _a : (node[GRAPH_SEARCH_ID] = (0, uuid_1.v4)());
    }
}
function internalSearch({ start, dest, getNeighbors, list, bidirectional = false, }) {
    var _a, _b;
    const visited = {};
    const prevNodes = {};
    const finder = {};
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
        for (const neighbor of (_a = getNeighbors(crnt)) !== null && _a !== void 0 ? _a : []) {
            const neighborKey = getNodeKey(neighbor);
            finder[neighborKey] = (_b = finder[neighborKey]) !== null && _b !== void 0 ? _b : finder[crntKey];
            let isVisited = visited[neighborKey];
            if (finder[crntKey] !== finder[neighborKey]) {
                foundDest = true;
                pathStart =
                    finder[crntKey] === "a" ? [crnt, neighbor] : [neighbor, crnt];
                break;
            }
            else if (!isVisited) {
                visited[neighborKey] = true;
                prevNodes[neighborKey] = crnt;
                list.add(neighbor);
            }
        }
    }
    if (!foundDest) {
        return;
    }
    const path = [];
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
function heapSearch({ start, dest, getNeighbors, getHeuristicDistance = () => 1, }) {
    const visited = {};
    const prevNodes = {};
    const startKey = getNodeKey(start);
    const heuristic = {
        [startKey]: 0,
    };
    const heap = new heap_1.default((a, b) => {
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
    const path = [];
    let crnt = dest;
    while (crnt) {
        path.unshift(crnt);
        crnt = prevNodes[getNodeKey(crnt)];
    }
    return path;
}
function dfs(config) {
    return internalSearch(Object.assign(Object.assign({}, config), { list: new Stack() }));
}
exports.dfs = dfs;
function bfs(config) {
    return internalSearch(Object.assign(Object.assign({}, config), { list: new Queue() }));
}
exports.bfs = bfs;
function bidirectionalBfs(config) {
    return internalSearch(Object.assign(Object.assign({}, config), { list: new Queue(), bidirectional: true }));
}
exports.bidirectionalBfs = bidirectionalBfs;
function bestFirstSearch(config) {
    return heapSearch(Object.assign(Object.assign({}, config), { list: new Queue() }));
}
exports.bestFirstSearch = bestFirstSearch;
function validatePath(path, getNeighbors) {
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
exports.validatePath = validatePath;
//# sourceMappingURL=graph-search.js.map