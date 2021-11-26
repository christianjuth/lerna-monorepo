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
  background-color: #eee;
`

const Content = styled.div`
  width: 800px;
  max-width: 100%;
  background-color: white;
  padding: calc(8px + 1vw);
`

function App() {
  const windowHeight = use100vh() ?? 0

  return (
    <Page>
      <Content style={{minHeight: windowHeight}}>
        <Router>
          <Routes>
            <Route path='tic-tac-toe' element={<Pages.TicTacToe/>} />
          </Routes>
        </Router>
      </Content>
    </Page>
  );
}

export default App;
