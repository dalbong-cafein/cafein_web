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
      <HeaderWrapper>
        <HomeTitle>
          카공인을 위한
          <br />
          카페 추천 서비스 <StrongTitle>카페인</StrongTitle>
        </HomeTitle>
      </HeaderWrapper>
      <SearchFormWrapper>
        <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
        <SearchButton>검색</SearchButton>
        <SearchByMap>지도에서 찾기</SearchByMap>
      </SearchFormWrapper>
    </HomeWrapper>
  )
}

const HomeWrapper = styled.div`
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

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-start;
  max-width: ${(props) => props.theme.widthes.maxWidth}px;
  width: 100%;
`

const HomeTitle = styled.h1`
  font-size: ${(props) => props.theme.fontsizes.font28}rem;
  font-weight: 700;
  margin-top: ${(props) => props.theme.marginTop.margin40}px;
`

const StrongTitle = styled.strong`
  color: ${(props) => props.theme.colors.orange500};
`

const SearchFormWrapper = styled.form`
  max-width: ${(props) => props.theme.widthes.maxWidth}px;
  width: 100%;
  margin-top: ${(props) => props.theme.marginTop.margin30}px;
  display: flex;
  flex-direction: row;
`

const SearchInput = styled.input`
  width: 440px;
  height: 56px;
  padding: 0 20px;
  border-radius: ${(props) => props.theme.borderRadius.border16}px;
  background-color: ${(props) => props.theme.colors.white};
`

const SearchButton = styled.button`
  width: 108px;
  height: 56px;
  margin-left: 20px;
  border-radius: ${(props) => props.theme.borderRadius.border16}px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.orange400};
`

const SearchByMap = styled.button`
  width: 127px;
  height: 56px;
  margin-left: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: ${(props) => props.theme.borderRadius.border16}px;
  color: ${(props) => props.theme.colors.orange400};
  background-color: transparent;
`

export default Home
