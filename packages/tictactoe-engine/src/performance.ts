import { getBestMoveMiniMax, checkWinner } from "./tictactoe-engine";

export async function checkPerformance(method = "miniMax") {
  const { performance } = await require("perf_hooks");
  let board = ["", "", "", "", "", "", "", "", ""];

  const runtimes: number[] = [];

  while (checkWinner(board) === undefined) {
    const t1 = performance.now();
    if (method === "miniMax") {
      board = getBestMoveMiniMax(board) ?? [];
    }
    const t2 = performance.now();
    runtimes.push(t2 - t1);
  }

  const perf = runtimes.reduce((a, b) => a + b) / runtimes.length;
  console.log(perf);
  return perf;
}
