import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper,
  CopyRight,
  FooterQLists,
  FooterWrapper,
  HomeTitle,
  HomeWrapper,
  NavWrapper,
  QItem,
  RecommendTitle,
  RecommendWrapper,
  WhiteLink,
  Wrapper
} from '../components/Home/styles/styles'
import Search from '../components/Home/Search'
import TabList from '../components/Home/TabList'
import RecommendItems from '../components/Home/RecommendItems'

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
          <Link href="/">
            <AddLink>
              <AddLinkText>추천하고 싶은 카페가 있다면 알려주세요</AddLinkText>
              <AddButton>카페 등록하기</AddButton>
            </AddLink>
          </Link>
        </AddWrapper>
        <FooterWrapper>
          <FooterQLists>
            <QItem>
              <Link href="/">공지사항</Link>
            </QItem>
            <QItem>
              <Link href="/">자주 묻는 질문</Link>
            </QItem>
            <QItem>
              <Link href="/">이용약관</Link>
            </QItem>
          </FooterQLists>
          <FooterQLists>
            <QItem>
              <Link href="mailto:dalbong.cafeing@gmail.com">
                dalbong.cafeing@gmail.com
              </Link>
            </QItem>
            <QItem>
              <Link href="/">인스타그램</Link>
            </QItem>
          </FooterQLists>
          <CopyRight>COPYRIGHT © 2022 cafein ALL RIGHTS RESERVED.</CopyRight>
        </FooterWrapper>
      </HomeWrapper>
    </Wrapper>
  )
}





export default Home
