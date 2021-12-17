import type { AppProps } from 'next/app'
import { Theme } from '@christianjuth/ui'
import { AuthProvier } from '../components/Gun'
import { Navbar } from '../components/Navbar'
import { use100vh } from 'react-div-100vh'

function MyApp({ Component, pageProps }: AppProps) {
  const pageHeight = use100vh() ?? 0

  return (
    <>
      <Theme
        base={{
          primary: ({ l }) => [0,0,l,0],
          accent1: ({ l }) => [0,0,l,0],
          gray: ({ l }) => [0,0,l,0],
        }}
        dark={{
          gray: ({ l }) => [0,0,100-l,0],
        }}
      />
      <AuthProvier>
        <div style={{minHeight: pageHeight, display: 'flex', flexDirection: 'column'}}>
          <Navbar/>
          <Component {...pageProps} />
        </div>
      </AuthProvier>
    </>
  )
}

export default MyApp
