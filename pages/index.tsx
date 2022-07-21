import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import logoImg from '../public/images/logo_black.svg'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <HomeWrapper>
      <Head>
        <title>카공인을 위한 커페 추천 서비스 카페인</title>
      </Head>
      <HeaderWrapper>
        <Image src={logoImg} alt="카페인 로고" width={120} height={57} />
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
      </HeaderWrapper>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HeaderWrapper = styled.header`
  max-width: 1386px;
  width: 100%;
  height: 117px;
  display: flex;
  justify-content: space-around;
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
`

const OrangeButtonWrapper = styled.li`
  width: 130px;
  height: 48px;
`

const OrangeButton = styled.button`
  ${(props) => props.theme.buttons.orangeButton}
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  padding: 16px 24px;
`

export default Home
