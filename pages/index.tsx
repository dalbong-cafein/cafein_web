import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useEffect } from 'react'
import { useAtom, useSetAtom } from 'jotai'

import { mapAtom } from 'store'

import RecommendSection from '@components/Home/RecommendSection'
import Search from '@components/Home/Search'
import Footer from '@components/Home/Footer'
import Ic_Logo from '@public/logo_black.svg'

import {
  NavWrapper,
  WhiteLink,
  Wrapper,
  HomeTitle,
  HomeWrapper,
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper,
  NavSubWrapper,
  MobileSearchButton
} from '../components/Home/styles/styles'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const [map, setMap] = useAtom(mapAtom)
  const router = useRouter()
  const mapHandler = () => {
    router.push('/maps')
  }
  useEffect(() => {
    setMap(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper>
      <Head>
        <title>카공인을 위한 커페 추천 서비스 카페인</title>
      </Head>
      <NavWrapper main={true}>
        <Link href="/">
          <a>
            <Ic_Logo />
          </a>
        </Link>
        <NavSubWrapper>
          <WhiteLink href="www.naver.com">카페인 스토리</WhiteLink>
          <WhiteLink href="www.daum.ent">의견 보내기</WhiteLink>
        </NavSubWrapper>
      </NavWrapper>
      <HomeWrapper>
        <HomeTitle>
          카공인을 위한
          <br />
          카페 추천 서비스 카페인
        </HomeTitle>
        <Search />
        <MobileSearchButton onClick={mapHandler}>
          지도에서 카페 찾기
        </MobileSearchButton>
        <RecommendSection />
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
