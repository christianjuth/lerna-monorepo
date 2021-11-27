import { solve, isValid } from '@christianjuth/sudoku-solver'
import { GetStaticProps } from "next"
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Package } from '../components/Package'
import { getReadme } from '../utils'

const Puzzel = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  width: 400px;
  border-bottom: 1px solid #ddd;

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
  const [solution, setSolution] = useState(Array(9*9).fill(''))

  useEffect(() => {
    let canceled = false
    async function run() {
      const res = solve(cells.map(cell => cell ? +cell : 0))
      if (!canceled) {
        console.log(res.solution, res.solution && isValid(res.solution))
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
                    placeholder={placeholder}
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