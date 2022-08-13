import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper,
  HomeTitle,
  HomeWrapper,
  NavWrapper,
  RecommendTitle,
  RecommendWrapper,
  WhiteLink,
  Wrapper
} from '../components/Home/styles/styles'
import Search from '../components/Home/Search'
import TabList from '../components/Home/TabList'
import RecommendItems from '../components/Home/RecommendItems'
import Footer from '../components/Home/Footer'

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Head>
        <title>카공인을 위한 커페 추천 서비스 카페인</title>
      </Head>
      <NavWrapper main={true}>
        <Link href="/">
          <a>
            <Image
              src={'/images/logo_black.svg'}
              alt="카페인 로고"
              width={103}
              height={22}
            />
          </a>
        </Link>
        <Link href="/">
          <WhiteLink>의견 보내기</WhiteLink>
        </Link>
      </NavWrapper>
      <HomeWrapper>
        <HomeTitle>
          카공인을 위한
          <br />
          카페 추천 서비스 카페인
        </HomeTitle>
        <Search />
        <RecommendWrapper>
          <RecommendTitle>지역별 카페 추천</RecommendTitle>
          <TabList />
          <RecommendItems />
        </RecommendWrapper>
        <AddWrapper>
          <AddLink>
            <AddLinkText>추천하고 싶은 카페가 있다면 알려주세요</AddLinkText>
            <Link href="/">
              <AddButton>카페 등록하기</AddButton>
            </Link>
          </AddLink>
        </AddWrapper>
        <Footer isHome={true} />
      </HomeWrapper>
    </Wrapper>
  )
}

export default Home
