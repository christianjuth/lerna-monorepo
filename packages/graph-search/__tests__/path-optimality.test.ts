import { bfs, dfs, bidirectionalBfs } from "../src/graph-search";

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

describe("paths from each algorithm are as optimal as expected", () => {
  test("bfs returns a path that is better than or equal to dfs", () => {
    const path1 = bfs({
      start: 3,
      dest: 8,
      getNeighbors,
    });
    const path2 = dfs({
      start: 3,
      dest: 8,
      getNeighbors,
    });

    expect(path1.length).toBeLessThanOrEqual(path2.length);
  });

  test("bfs returns a path that is better than or equal to bidirectionalBfs", () => {
    const path1 = bfs({
      start: 3,
      dest: 8,
      getNeighbors,
    });
    const path2 = bidirectionalBfs({
      start: 3,
      dest: 8,
      getNeighbors,
    });

    expect(path1.length).toBeLessThanOrEqual(path2.length);
  });
});
