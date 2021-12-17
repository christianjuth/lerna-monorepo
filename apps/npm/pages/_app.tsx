import '../styles/globals.css'
import type { AppProps } from 'next/app'
import styled from 'styled-components'
import { use100vh } from 'react-div-100vh'
import { Theme, mediaQuery } from '@christianjuth/ui'

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

const BASE_THEME: Theme.Config = {
  primary: ({ l }) => [0,0,l],
  accent1: ({ l }) => [135,94,l],
  gray: ({ l }) => [0,0,l]
}
const DARK_THEME: Partial<Theme.Config> = {
  gray: ({ l }) => [0,0,100-l]
}

function MyApp({ Component, pageProps }: AppProps) {
  const windowHeight = use100vh() ?? 0

  return (
    <>
      <Theme base={BASE_THEME} dark={DARK_THEME} />
      <Page>
        <Content style={{minHeight: windowHeight}}>
          <Component {...pageProps} />
        </Content>
      </Page>
    </>
  )
}

export default MyApp
