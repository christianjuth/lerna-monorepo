# `@christianjuth/game-of-life`

Conway Game of Life simulation

[Demo](https://npm.christianjuth.com/game-of-life)

## Usage

```javascript
import { gameOfLife } from '@christianjuth/game-of-life'

const game = gameOfLife(20)
game.print()

setInterval(() => {
  game.tick()
  game.print()
}, 800)
```
