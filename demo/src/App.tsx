import { 
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import * as Pages from './pages'
import styled from 'styled-components'
import { use100vh } from 'react-div-100vh'

const Page = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Content = styled.div`
  width: 1000px;
  max-width: 100%;
  padding: calc(15px + 0.5vw);
`

function App() {
  const windowHeight = use100vh() ?? 0

  return (
    <Page>
      <Content style={{minHeight: windowHeight}}>
        <Router>
          <Routes>
            <Route path='tictactoe-engine' element={<Pages.TicTacToe/>} />
            <Route path='minimax' element={<Pages.Minimax/>} />
            <Route path='graph-search' element={<Pages.GraphSearch/>} />
            <Route path='sudoku-solver' element={<Pages.SudokuSolver/>} />
            <Route path='genetics' element={<Pages.Genetics/>} />
          </Routes>
        </Router>
      </Content>
    </Page>
  );
}

export default App;
