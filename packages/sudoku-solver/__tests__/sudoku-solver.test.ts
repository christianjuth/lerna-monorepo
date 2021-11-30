import { isSolved, solve, generate } from '../src/sudoku-solver'


const boards = [
  // Easy
  [
    0, 3, 0, 4, 9, 0, 0, 1, 0,
    7, 4, 0, 0, 1, 8, 0, 0, 0,
    1, 9, 6, 7, 0, 0, 0, 2, 4,
    0, 0, 0, 5, 0, 1, 7, 6, 2,
    0, 0, 3, 0, 2, 7, 0, 5, 9,
    0, 0, 0, 0, 4, 0, 3, 0, 0,
    0, 7, 8, 9, 0, 0, 0, 0, 0,
    4, 2, 9, 0, 0, 0, 0, 7, 3,
    0, 0, 0, 3, 7, 0, 0, 9, 8,
  ],
  // Hard
  [
    0, 4, 9, 1, 0, 0, 0, 0, 0,
    0, 0, 1, 0, 0, 6, 0, 0, 0,
    0, 0, 5, 2, 8, 0, 0, 9, 0,
    0, 9, 6, 0, 0, 5, 3, 0, 8,
    0, 1, 0, 0, 6, 3, 4, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 3, 0, 0, 0, 9, 8, 0,
    7, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 6, 0, 0, 3, 0, 0, 0, 0,
  ],
  // Evil
  [
    0, 0, 9, 0, 0, 0, 4, 0, 0,
    0, 0, 0, 0, 8, 0, 3, 0, 0,
    0, 6, 0, 0, 0, 7, 0, 9, 8,
    0, 0, 6, 0, 4, 0, 0, 1, 2,
    0, 0, 0, 0, 0, 0, 9, 0, 0,
    0, 7, 0, 5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 3,
    2, 0, 0, 0, 0, 4, 0, 0, 0,
    0, 0, 1, 0, 2, 0, 0, 8, 6,
  ],
  generate().puzzle,
  generate().puzzle,
]


describe('@christianjuth/sudoku-solver', () => {

  test.each(boards)("solves puzzle", (...board) => {
    const { solution } = solve(board)
    expect(isSolved(solution)).toBe(true)
  })

});
