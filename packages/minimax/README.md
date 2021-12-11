# `@christianjuth/minimax`

Flexible minimax algorithm with fail-soft alpha-beta pruning.

[Demo](https://npm.christianjuth.com/minimax)

## Usage

```javascript
import {
  getNextMoves,
  checkWinner,
} from "@christianjuth/tictactoe-engine";
import { minimax } from "@christianjuth/minimax";

const bestMove = minimax({
  // Get player who we are trying
  // to get the best move for
  player: "X",
  // Initial game state
  gameState: ["", "", "X", "", "", "O", "", "", ""],
  // Get next game states from the game
  // state paramater passed into this function
  getNextGameState: (gameState) => {
    return getNextMoves(gameState);
  },
  // Static evaluator can be called at any
  // level of the tree once the max depth
  // has been hit (see maxDepth option)
  staticEvaluator: ({ gameState, player }) => {
    // ADD A STATIC EVALUATOR HERE
    return evaluation
  },
  // Leaf evaluator is only called at the root
  // of the tree once the tic tac toe  game has
  // reached an ending point (win, loss, or draw)
  leafEvaluator: ({ gameState, player, level }) => {
    const winner = checkWinner(gameState);
    // Positive value if we won this game.
    // We divide by level to encourage paths
    // that lead to a win in less moves.
    if (winner === player) return 1 / level;
    // Zero means draw
    if (!winner) return 0;
    // Negative number if the opponent won
    return -1 / level;
  },
  // Max depth to go into the tree before
  // staticEvaluator is used instead of leafEvaluator
  maxDepth: Infinity,
  // Randomize the order that next game states
  // appear in the tree below their parent game state.
  // This will affect the alpha/beta pruning of the tree.
  randomizeNextGameStateOrder: true,
  // Wether top level of the tree is trying to max or min
  isMax: true,
});

console.log(bestMove);
```
