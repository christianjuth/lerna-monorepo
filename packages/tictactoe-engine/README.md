# `@christianjuth/tictactoe-engine`

Tic-tac-toe engine

[Demo](https://npm.christianjuth.com/tictactoe-engine)

## Usage

```javascript
import { 
  getBestMovesMiniMax, 
  checkWinner, 
  printBoard 
} from "@christianjuth/tictactoe-engine";

let board = [
  '','','',
  '','','',
  '','',''
]

while (checkWinner(board) === undefined) {
  board = getBestMovesMiniMax(board)
  printBoard(board)
}
```
