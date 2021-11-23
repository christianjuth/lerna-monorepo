import { bfs, dfs, bidirectionalBfs, validatePath } from "../src/graph-search";
import { directedGraph } from './data'

describe("search algorithm are completene", () => {
  test("bfs finds a path", () => {
    const path = bfs({
      start: directedGraph.start,
      dest: directedGraph.dest,
      getNeighbors: directedGraph.getNeighbors,
    });

    expect(validatePath(path, directedGraph.getNeighbors)).toBe(true);
  });

  test("dfs finds a path", () => {
    const path = dfs({
      start: directedGraph.start,
      dest: directedGraph.dest,
      getNeighbors: directedGraph.getNeighbors,
    });

    expect(validatePath(path, directedGraph.getNeighbors)).toBe(true);
  });

  test("bidirectionalBfs finds a path", () => {
    const path = bidirectionalBfs({
      start: directedGraph.start,
      dest: directedGraph.dest,
      getNeighbors: directedGraph.getNeighbors,
    });

    expect(validatePath(path, directedGraph.getNeighbors)).toBe(true);
  });
});
