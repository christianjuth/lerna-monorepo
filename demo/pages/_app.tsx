import '../styles/globals.css'
import type { AppProps } from 'next/app'
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
