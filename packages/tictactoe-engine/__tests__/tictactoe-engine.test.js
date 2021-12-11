import { getNextMoves } from '../src/tictactoe-engine'

const EMPTY_BOARD = Array(9).fill('')

describe("@christianjuth/tictactoe-engine", () => {
  it("empty board has 9 possible moves", () => {
    expect(getNextMoves(EMPTY_BOARD).length).toBe(9)

  });
});
