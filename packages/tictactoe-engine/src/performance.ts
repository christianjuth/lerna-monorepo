import {
  getBestMoveNuralNetwork,
  getBestMoveWasmNuralNetwork,
  getBestMovesMiniMax,
  checkWinner,
} from "./tictactoe-engine";

export async function checkPerformance(method = "miniMax") {
  const { performance } = await require("perf_hooks");
  let board = ["", "", "", "", "", "", "", "", ""];
  getBestMoveWasmNuralNetwork(board);

  const runtimes: number[] = [];

  while (checkWinner(board) === undefined) {
    const t1 = performance.now();
    if (method === "nuralNetwork") {
      board = getBestMoveNuralNetwork(board) ?? [];
    } else if (method === "wasmNuralNetwork") {
      board = (await getBestMoveWasmNuralNetwork(board)) ?? [];
    } else {
      board = getBestMovesMiniMax(board) ?? [];
    }
    const t2 = performance.now();
    runtimes.push(t2 - t1);
  }

  const perf = runtimes.reduce((a, b) => a + b) / runtimes.length;
  console.log(perf);
  return perf;
}
