import styled from 'styled-components'
import { useEffect, useState, useRef } from 'react'
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
  const game = useRef(gameOfLife(20)).current
  const [,setSignal] = useState(0)
  const [speed, setSpeed] = useState(6)

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
    }, 1000 - (100*speed))
    return () => {
      window.clearInterval(id)
    }
  }, [game, speed])

  return (
    <Package
      pkg={PKG}
      readme={readme}
      demo={(
        <>
          <label>Speed:</label>
          <select value={speed} onChange={e => setSpeed(parseInt(e.target.value))}>
            {Array(10).fill(0).map((_,i) => (
              <option key={i} value={i}>{i+1}</option>
            ))}
          </select>
          <br/>
          <br/>
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