import { isSolved, evolutionSolver } from '../src/sudoku-solver'

describe('@christianjuth/sudoku-solver', () => {

  it('can solve a puzzle using evolution', () => {
    const board = [
      0, 3, 0, 4, 9, 0, 0, 1, 0,
      7, 4, 0, 0, 1, 8, 0, 0, 0,
      1, 9, 6, 7, 0, 0, 0, 2, 4,
      0, 0, 0, 5, 0, 1, 7, 6, 2,
      0, 0, 3, 0, 2, 7, 0, 5, 9,
      0, 0, 0, 0, 4, 0, 3, 0, 0,
      0, 7, 8, 9, 0, 0, 0, 0, 0,
      4, 2, 9, 0, 0, 0, 0, 7, 3,
      0, 0, 0, 3, 7, 0, 0, 9, 8,
    ]

    const solution = evolutionSolver(board)

    expect(isSolved(solution)).toBe(true)
  })
});
