import type { AppProps } from 'next/app'
import Image from 'next/image'
import Link from 'next/link'
import styled, { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global-style'
import { theme } from '../styles/theme'
import logoImg from '../public/images/logo_black.svg'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <NavWrapper>
          <Link href="/">
            <a>
              <Image src={logoImg} alt="카페인 로고" width={120} height={57} />
            </a>
          </Link>
          <ButtonsWrapper>
            <WhiteLinkWrapper>
              <Link href="/">
                <WhiteLink>의견 보내기</WhiteLink>
              </Link>
            </WhiteLinkWrapper>
            <OrangeButtonWrapper>
              <OrangeButton>카페 등록하기</OrangeButton>
            </OrangeButtonWrapper>
          </ButtonsWrapper>
        </NavWrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavWrapper = styled.nav`
  max-width: ${(props) => props.theme.widthes.maxWidth}px;
  width: 100%;
  height: 117px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonsWrapper = styled.ul`
  display: flex;
  gap: 24px;
`

const WhiteLinkWrapper = styled.li`
  width: 117px;
  height: 48px;
`

const WhiteLink = styled.a`
  display: inline-block;
  vertical-align: bottom;
  padding: 16px 24px;
  font-size: 0.9375rem;
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const OrangeButtonWrapper = styled.li`
  width: 130px;
  height: 48px;
`

const OrangeButton = styled.button`
  ${(props) => props.theme.buttons.orangeButton}
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  padding: 16px 24px;
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

export default MyApp
