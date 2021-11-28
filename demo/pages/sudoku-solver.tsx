import { solve, isValid } from '@christianjuth/sudoku-solver'
import { GetStaticProps } from "next"
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Package } from '../components/Package'
import { getReadme } from '../utils'

const Puzzel = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  max-width: 100%;
  border-top: 2px solid black;
  border-left: 2px solid black;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  border-bottom: 1px solid #ddd;
  width: 100%;
  :nth-child(3n) {
    border-bottom: 2px solid black;
  }
`

const Cell = styled.input`
  width: 100%;
  aspect-ratio: 1.05;
  font-weight: bold;
  margin: 0;
  border: 0;
  text-align: center;
  font-size: 1rem;
  border-right: 1px solid #ddd;

  ::placeholder {
    color: rgba(0,0,0,0.25);
  }

  :focus {
    outline: none;
    background-color: rgba(200,200,200);
    font-weight: 300;
  }

  :nth-child(3n) {
    border-right: 2px solid black;
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
          <p>Enter values in boxes below and the solver will generate a solution to your sudoku puzzel if one exsists.</p>

          <Puzzel>
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
                    />
                  )
                })}
              </Row>
            ))}
          </Puzzel>
          <br/>
          {solution === null ? (
            <span>Error: invalid puzzel</span>
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