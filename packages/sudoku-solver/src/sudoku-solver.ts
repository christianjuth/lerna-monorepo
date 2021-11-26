type Board = number[];

export function isValid(board: Board) {
  for (let i = 0; i < 9; i++) {
    const seen = {};
    for (let j = 0; j < 9; j++) {
      const num = board[i + 9 * j];
      if (num !== 0 && seen[num]) {
        return false;
      }
      seen[num] = true;
    }
  }

  for (let i = 0; i < 9; i++) {
    const seen = {};
    for (let j = 0; j < 9; j++) {
      const num = board[i * 9 + j];
      if (num !== 0 && seen[num]) {
        return false;
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
          return false;
        }
        seen[num] = true;
      });
    }
  }

  return true;
}

export function isSolved(board: Board) {
  const total = board.reduce((acc, crnt) => acc + crnt, 0);
  return isValid(board) && total === 405;
}

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;
  let randomIndex = -1;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function dfsSolve(board: Board) {
  const index = board.findIndex((cell) => cell === 0);

  if (index === -1) {
    return isSolved(board);
  }

  for (const num of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    board[index] = num;
    if (!isValid(board)) {
      continue;
    } else if (dfsSolve(board)) {
      return true;
    }
  }

  if (isSolved(board)) {
    return true;
  } else {
    board[index] = 0;
    return false;
  }
}

export function solve(board: Board) {
  const t1 = Date.now();
  board = [...board];

  const isSolved = dfsSolve(board);

  return {
    solution: isSolved ? board : null,
    runtime: Date.now() - t1,
  };
}

export function generate() {
  const size = 9 * 9;
  const board = Array(size).fill(0);
  const { solution } = solve(board);
  const puzzel = [...solution];
  for (let i = 0; i < size; i++) {
    if (Math.random() >= 0.3) {
      puzzel[i] = 0;
    }
  }
  return {
    puzzel,
    solution,
  };
}
