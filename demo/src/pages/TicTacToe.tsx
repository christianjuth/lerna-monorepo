import { useState, useEffect, Fragment } from 'react'
import { getBestMoveNuralNetwork, whosMove, checkWinner, predictWinner } from '@christianjuth/tictactoe-engine'
import styled from "styled-components";

const Board = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid black;
  width: 200px;
  max-width: 200px;
`;

const Cell = styled.div`
  flex: 1;
  aspect-ratio: 1;
  line-height: 50px;
  font-size: 45px;
  text-align: center;
  border: 1px solid black;
`;

const Break = styled.div`
  min-width: 100%;
`;

export function TicTacToe() {
  const [player, setPlayer] = useState('X')
  const [board, setBoard] = useState(Array(9).fill(''))

  useEffect(() => {
    setBoard(Array(9).fill(''))
  }, [player])

  useEffect(() => {
    const move = whosMove(board)
    if (move !== player && checkWinner(board) === undefined) {
      setBoard(b => getBestMoveNuralNetwork(b))
    }
  }, [player, board])

  return (
    <>
      <h1>@christianjuth/tictactoe-engine</h1>
      <hr/>

      <h2>Demo</h2>

      <button onClick={() => setPlayer('X')}>Play as X</button>
      <button onClick={() => setPlayer('O')}>Play as O</button>

      <br/>
      <br/>

      <Board>
        {board.map((cell, i) => (
          <Fragment key={i + cell}>
            {i % 3 === 0 && <Break />}
            <Cell
              onClick={() => {
                if (whosMove(board) === player && checkWinner(board) === undefined) {
                  setBoard((b) => {
                    const bClone = b.slice(0);
                    bClone[i] = player;
                    return bClone;
                  });
                }
              }}
            >
              {cell}
            </Cell>
          </Fragment>
        ))}
      </Board>

      <br/>

      <span>Predicted winenr: {predictWinner(board) ?? 'draw'}</span>
    </>
  )
}