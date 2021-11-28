import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styled from 'styled-components'
import { use100vh } from 'react-div-100vh'
import { mediaQuery } from '../components/Grid/utils'

const Page = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const Content = styled.div`
  width: 900px;
  max-width: 100%;
  padding: calc(15px + 0.5vw);

  @media ${mediaQuery('xs', 'md')} {
    pre { 
      margin: 0 calc((15px + 0.5vw) * -1);
    }
    pre > div {
      border-radius: 0 !important;
      padding: calc(15px + 0.5vw) !important;
    }
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  const windowHeight = use100vh() ?? 0

  return (
    <Page>
      <Content style={{minHeight: windowHeight}}>
        <Component {...pageProps} />
      </Content>
    </Page>
  )
}

export default MyApp
