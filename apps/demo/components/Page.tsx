import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BiMenu } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'
import styled from 'styled-components'
import { ReactChildren } from '../types'
import { Divider } from './Divider'
import { Grid, Display } from './Grid'

const MenuButtn = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: transparent;
  border: 2px solid var(--text);
  border-radius: 5px;
  display: flex;
  z-index: 101;
  color: var(--text);
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--background);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;

  * {
    line-height: 1.6em;
  }
`

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;

  * {
    line-height: 1.6em;
  }
`

const Main = styled.main`
  *:first-child {
    margin-top: 0;
  }
`

export function Page({
  header,
  sidebar,
  children
}: {
  header: ReactChildren
  sidebar?: ReactChildren
  children: ReactChildren
}) {
  const router = useRouter()
  const [mobileSidebar, setMobileSidebar] = useState(false)

  useEffect(() => {
    setMobileSidebar(false) 
  }, [router.asPath])

  return (
    <>
      <Display xs={true} md={false}>
        {mobileSidebar && <Modal>{sidebar}</Modal>}
      </Display>

      <Grid.Row cols='150px 1fr 150px' spacing={5}>
        {/* Header */}
        <Grid.Col xs={0} md={1} />
        <Grid.Col xs={3} md={1}>
          {header}
          <Divider /> 
        </Grid.Col>
        <Grid.Col xs={0} md={1} />

        {/* Content */}
        <Grid.Col xs={0} md={1}>
          <Sidebar>
            {sidebar}
          </Sidebar>
        </Grid.Col>

        <Grid.Col xs={3} md={1}>
          <Main>
            {children}
          </Main>
        </Grid.Col>

      </Grid.Row>
      
      <Display xs={true} md={false}>
        <MenuButtn onClick={() => setMobileSidebar(b => !b)}>
          {mobileSidebar ? <IoMdClose size={30}/> : <BiMenu size={30}/>}
        </MenuButtn>
      </Display>
    </>
  )
}