import styled from 'styled-components'
import { useEffect, useState, useMemo } from 'react'
import { Package } from '../components/Package'
import { getReadme } from '../utils'
import { GetStaticProps } from "next"
import { gameOfLife } from '@christianjuth/game-of-life'

const PKG = '@christianjuth/game-of-life'

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const Cell = styled.div`
  flex: 1;
  aspect-ratio: 1;
  border: 1px solid black;
`

function Game({
  readme
}: {
  readme: string
}) {
  const [,setSignal] = useState(0)
  const game = useMemo(
    () => gameOfLife(40),
    []
  )

  useEffect(() => {
    function handleChange() {
      setSignal(s => (s+1) % 10000)
    }
    game.addEventListener('onChange', handleChange)
    return () => {  
      game.removeEventListener('onChange', handleChange)
    }
  }, [game])

  useEffect(() => {
    const id = window.setInterval(() => {
      game.tick()
    }, 100)
    return () => {
      window.clearInterval(id)
    }
  }, [game])

  return (
    <Package
      pkg={PKG}
      readme={readme}
      demo={(
        <>
          {game.getFrame().map((row, y) => (
            <FlexRow key={y}>
              {row.map((cell, x) => (
                <Cell
                  key={x}
                  style={{backgroundColor: cell === 1 ? 'black' : 'white'}}
                />
              ))}
            </FlexRow>
          ))}
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

export default Game