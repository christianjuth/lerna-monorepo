import { useAuth } from "./Gun"
import styled from 'styled-components'
import { color, MainGutters, Divider } from '@christianjuth/ui'

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
`

export function Navbar() {
  const { username, logout } = useAuth()

  return (
    <MainGutters>
      <Nav>
        <h1>{username}</h1>
        <button onClick={logout}>Logout</button>
      </Nav>
      <Divider/>
    </MainGutters>
  )
}