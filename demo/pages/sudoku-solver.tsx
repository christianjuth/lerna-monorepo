import { solve } from '@christianjuth/sudoku-solver'
import { GetStaticProps } from "next"
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Package } from '../components/Package'
import { getReadme } from '../utils'

const Puzzle = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  border: 2px solid black;
  border-bottom: none;
  background-color: black;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr 1px 1fr 2px 1fr 1px 1fr 1px 1fr 2px 1fr 1px 1fr 1px 1fr;
  margin-bottom: 1px;
  width: 100%;
  :nth-child(3n) {
    margin-bottom: 2px;
  }
`

const Cell = styled.input`
  width: 100%;
  aspect-ratio: 1;
  margin: 0;
  border: 0;
  text-align: center;
  font-size: 1rem;

  ::placeholder {
    color: rgba(0,0,0,0.25);
  }

  :focus {
    outline: none;
    background-color: rgba(200,200,200);
    font-weight: 300;
  }

  :nth-child(9n) {
    grid-column: 1;
  }
  :nth-child(9n+2) {
    grid-column: 3;
  }
  :nth-child(9n+3) {
    grid-column: 5;
  }
  :nth-child(9n+4) {
    grid-column: 7;
  }
  :nth-child(9n+5) {
    grid-column: 9;
  }
  :nth-child(9n+6) {
    grid-column: 11;
  }
  :nth-child(9n+7) {
    grid-column: 13;
  }
  :nth-child(9n+8) {
    grid-column: 15;
  }
  :nth-child(9n+9) {
    grid-column: 17;
  }
`

const PKG = '@christianjuth/sudoku-solver'

const GRID: number[][] = Array(9).fill(Array(9).fill(0))

function SudokuSolver({
  readme
}: {
  readme: string
}) {
  const [cells, setCells] = useState(Array(9*9).fill(''))
  const [solution, setSolution] = useState<number[] | null>(Array(9*9).fill(0))
  const [runtime, setRuntime] = useState(0)

  useEffect(() => {
    let canceled = false
    async function run() {
      const res = solve(cells.map(cell => cell ? +cell : 0))
      if (!canceled) {
        setRuntime(res.runtime) 
        setSolution(res.solution)
      }
    }
    run()
    return () => {
      canceled = true
    }
  }, [cells])

  return (
    <Package
      pkg="@christianjuth/sudoku-solver"
      readme={readme}
      demo={(
        <>
          <p>Enter values in boxes below and the solver will generate a solution to your sudoku puzzle if one exsists.</p>

          <Puzzle>
            {GRID.map((row, i) => (
              <Row key={i}>
                {row.map((_, j) => {
                  const index = (i*9)+j
                  const cell = cells[index]
                  const placeholder = solution?.[index] 
                  return (
                    <Cell
                      key={i+j}
                      placeholder={placeholder ? String(placeholder) : ''}
                      value={cell}
                      onChange={e => {
                        setCells(crnt => {
                          const clone = [...crnt]
                          clone[index] = e.target.value.replace(/[^0-9]/, '')
                          return clone
                        })
                      }}
                      style={cell ? { fontWeight: 700 } : undefined}
                    />
                  )
                })}
              </Row>
            ))}
          </Puzzle>
          <br/>
          {solution === null ? (
            <span>Error: invalid puzzle</span>
          ) : (
            <span>Found solution in {runtime/1000}seconds</span>
          )}
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

export default SudokuSolver