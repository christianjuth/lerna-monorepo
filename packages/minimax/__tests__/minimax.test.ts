import minimax from "../src/minimax";

const tree = {
  a: ["c", "b"],
  b: ["e", "d"],
  c: ["h", "g", "f"],
  f: ["j", "i"],
  i: ["n", "m"],
  g: ["l", "k"],
  // Leaf nodes
  d: 3,
  e: 5,
  n: 7,
  m: 0,
  j: 5,
  l: 8,
  k: 7,
  h: 4,
};

describe("@christianjuth/minimax", () => {
  it("needs tests", () => {
    const bestMove = minimax({
      gameState: "a",
      player: "",
      getNextGameState: (gameState) => {
        const children = tree[gameState];
        return typeof children === "number" ? [] : children;
      },
      leafEvaluator: ({ gameState }) => {
        return tree[gameState];
      },
    });

    expect(bestMove).toBe("c");
  });
});
