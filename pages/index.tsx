import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  ButtonsWrapper,
  HeaderWrapper,
  HomeTitle,
  HomeWrapper,
  NavWrapper,
  OrangeButton,
  OrangeButtonWrapper,
  SearchButton,
  SearchByMap,
  SearchFormWrapper,
  SearchInput,
  StrongTitle,
  WhiteLink,
  WhiteLinkWrapper,
  Wrapper
} from '../components/Home/styles/styles'
import logoImg from '../public/images/logo_black.svg'

const Home: NextPage = () => {
  return (
    <Wrapper>
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
      <HomeWrapper>
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
    </Wrapper>
  )
}

export default Home
