import { useState, useEffect, Fragment } from "react";
import {
  getBestMoveMiniMax,
  whosMove,
  checkWinner,
  predictWinner,
  TicTacToe,
} from "@christianjuth/tictactoe-engine";
import styled from "styled-components";
import { Package } from "../components/Package";
import { Grid } from "@christianjuth/ui";
import { GetStaticProps } from "next";
import { getReadme } from "../utils";
import { Button, color } from "@christianjuth/ui";

const PKG = "@christianjuth/tictactoe-engine";

const Board = styled(Grid.Row)`
  position: relative;
  margin: -1px 0 0 -1px;

  &:after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid ${color('gray', 0)};
    pointer-events: none;
  }
`;

const Cell = styled.button`
  flex: 1;
  aspect-ratio: 1;
  line-height: 50px;
  font-size: 45px;
  text-align: center;
  border: 1px solid ${color('gray', 2)};
  background-color: transparent;
  cursor: pointer;
  color: var(--text);
  padding: 0;
  margin: 0;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`;

function TicTacToe({ readme }: { readme: string }) {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState<TicTacToe.GameState>(Array(9).fill(""));

  useEffect(() => {
    const move = whosMove(board);
    if (move !== player && checkWinner(board) === undefined) {
      setBoard((b) => getBestMoveMiniMax(b).gameState!);
    }
  }, [player, board]);

  useEffect(() => {
    setBoard(Array(9).fill(""));
  }, [player]);

  return (
    <Package
      pkg="@christianjuth/tictactoe-engine"
      readme={readme}
      demo={
        <>
          <FlexRow>
            <Button onClick={() => setPlayer("X")} size="sm" style={{marginRight: '1ch'}}>
              Play as X
            </Button>
            <Button onClick={() => setPlayer("O")} size="sm">
              Play as O
            </Button>
          </FlexRow>

          <br />

          <Board cols={3} style={{ maxWidth: 200 }}>
            {board.map((cell, i) => (
              <Grid.Col xs={1} key={i + cell}>
                <Cell
                  onClick={() => {
                    if (
                      whosMove(board) === player &&
                      checkWinner(board) === undefined &&
                      !board[i]
                    ) {
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
              </Grid.Col>
            ))}
          </Board>

          <br />

          <span>Predicted winner: {predictWinner(board) ?? "draw"}</span>
        </>
      }
    />
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let readme: string | null = null;

  try {
    readme = await getReadme(PKG);
  } catch (e) {}

  return {
    props: {
      readme,
    },
    revalidate: 5 * 60,
  };
};

export default TicTacToe;
