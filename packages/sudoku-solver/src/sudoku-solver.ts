import { evolve } from "@christianjuth/genetics";

type Board = number[];

export function getCost(board: Board) {
  let cost = 0;

  for (let i = 0; i < 9; i++) {
    const seen = {};
    for (let j = 0; j < 9; j++) {
      const num = board[i + 9 * j];
      if (num !== 0 && seen[num]) {
        cost++;
      }
      seen[num] = true;
    }
  }

  for (let i = 0; i < 9; i++) {
    const seen = {};
    for (let j = 0; j < 9; j++) {
      const num = board[i * 9 + j];
      if (num !== 0 && seen[num]) {
        cost++;
      }
      seen[num] = true;
    }
  }

  function getBlockIndicies(start: number) {
    return [0, 1, 2, 9, 10, 11, 18, 19, 20].map((num) => num + start);
  }

  for (let i = 0; i < 3; i++) {
    const row = i * 9 * 3;
    for (let j = 0; j < 3; j++) {
      const col = j * 3;

      const seen = {};

      getBlockIndicies(row + col).forEach((index) => {
        const num = board[index];
        if (num !== 0 && seen[num]) {
          cost++;
        }
        seen[num] = true;
      });
    }
  }

  return cost;
}

export function isSolved(board: Board) {
  return getCost(board) === 0;
}

export function evolutionSolver(board: Board) {
  const emptyCells = board.filter((num) => num === 0);

  const { result } = evolve<number[]>({
    geneRanges: emptyCells.map(() => [1, 9]),
    spawn: (cells) => {
      let index = 0;
      return board.map((cell) => {
        if (cell > 0) {
          return cell;
        } else {
          const out = cells[index];
          index++;
          return out;
        }
      });
    },
    getFitness: (cells) => {
      const total = cells.reduce((acc, val) => acc + val, 0);
      const overshot = Math.max(0, 405 - total);
      return 1000 - getCost(cells) - overshot * 2;
    },
    // log: true,
    logPeriod: 5000,
    mutationRate: 0.7,
    maxGenerationsWithoutImprovement: 10000,
    maxGenerations: Infinity,
    targetFitness: 1000,
  });

  return result;
}
