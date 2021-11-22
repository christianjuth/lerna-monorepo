import { bfs, dfs, bidirectionalBfs, validatePath } from "../src/graph-search";

// Directed graph with source 3 and sink 8
const graph = {
  3: [5, 1],
  5: [4, 2],
  1: [7],
  7: [2, 8],
  2: [6],
  4: [6],
  6: [8],
  8: [],
};

const getNeighbors = (node: number) => graph[node];

describe("search algorithm are completene", () => {
  test("bfs finds a path", () => {
    const path = bfs({
      start: 3,
      dest: 8,
      getNeighbors,
    });

    expect(validatePath(path, getNeighbors)).toBe(true);
  });

  test("dfs finds a path", () => {
    const path = dfs({
      start: 3,
      dest: 8,
      getNeighbors,
    });

    expect(validatePath(path, getNeighbors)).toBe(true);
  });

  test("bidirectionalBfs finds a path", () => {
    const path = bidirectionalBfs({
      start: 3,
      dest: 8,
      getNeighbors,
    });

    expect(validatePath(path, getNeighbors)).toBe(true);
  });
});
