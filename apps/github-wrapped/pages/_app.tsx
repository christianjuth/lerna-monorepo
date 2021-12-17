import type { AppProps } from 'next/app'
import { Theme } from '@christianjuth/ui'

function MyApp({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
