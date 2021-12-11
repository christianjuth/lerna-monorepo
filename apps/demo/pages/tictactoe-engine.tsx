import { useState, useEffect, Fragment } from 'react'
import { getBestMoveMiniMax, whosMove, checkWinner, predictWinner, TicTacToe } from '@christianjuth/tictactoe-engine'
import styled from "styled-components";
import { Package } from '../components/Package'
import { GetStaticProps } from "next"
import { getReadme } from '../utils'

const PKG = '@christianjuth/tictactoe-engine'

const Board = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid gray;
  width: 200px;
  max-width: 200px;
`;

const Cell = styled.button`
  flex: 1;
  aspect-ratio: 1;
  line-height: 50px;
  font-size: 45px;
  text-align: center;
  border: 1px solid gray;
  background-color: transparent;
  cursor: pointer;
  color: var(--text);
`;

const Break = styled.div`
  min-width: 100%;
`;

function TicTacToe({
  readme
}: {
  readme: string
}) {
  const [player, setPlayer] = useState('X')
  const [board, setBoard] = useState<TicTacToe.GameState>(Array(9).fill(''))

  useEffect(() => {
    setBoard(Array(9).fill(''))
  }, [player])

  useEffect(() => {
    const move = whosMove(board)
    if (move !== player && checkWinner(board) === undefined) {
      setBoard(b => getBestMoveMiniMax(b)!)
    }
  }, [player, board])

  return (
    <Package
      pkg="@christianjuth/tictactoe-engine" 
      readme={readme}
      demo={(
        <>
          <button onClick={() => setPlayer('X')}>Play as X</button>
          <button onClick={() => setPlayer('O')}>Play as O</button>

          <br />
          <br />

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

          <br />

          <span>Predicted winenr: {predictWinner(board) ?? 'draw'}</span>
        </>
      )}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let readme: string | null = null

  try {
    readme = await getReadme(PKG)
  } catch(e) {}

  return {
    props: {
      readme
    },
    revalidate: 5 * 60,
  }
}

export default TicTacToe