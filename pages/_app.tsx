import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Props } from 'next/script'
import { ReactElement, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global-style'
import { theme } from '../styles/theme'

// 잘 모르고 사용한 것들. getStaticProps의 Prop들의 타입을 지정해주는 함수인 것 같음
export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<Props>
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {getLayout(<Component {...pageProps} />, pageProps)}
    </ThemeProvider>
  )
}

export default MyApp
