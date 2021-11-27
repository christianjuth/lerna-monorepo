# `@christianjuth/sudoku-solver`

Depth first search Sudoku solver.

[Demo](https://npm.christianjuth.com/sudoku-solver)

## Usage

```javascript
import { solve } from '../src/sudoku-solver'

const sudoku = [
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

const { solution } = solve(sudoku)
```
