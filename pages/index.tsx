import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { useCallback, useEffect, useState } from 'react'
import { useSetAtom } from 'jotai'

import { mapAtom, searchInputAtom } from 'store'

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
  MobileSearchButton,
  IcCafeinWrapper
} from '../components/Home/styles/styles'
import { useRouter } from 'next/router'
import Image from 'next/image'

const Home: NextPage = () => {
  const setMap = useSetAtom(mapAtom)
  const setInput = useSetAtom(searchInputAtom)
  const router = useRouter()
  const mapHandler = useCallback(() => {
    router.push('/maps')
  }, [router.pathname])
  useEffect(() => {
    setMap(null)
    setInput('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return (
    <Wrapper>
      <Head>
        <title>카페인</title>
      </Head>
      <NavWrapper main={true}>
        <Link href="/">
          <a>
            <Ic_Logo />
          </a>
        </Link>
        <NavSubWrapper>
          <WhiteLink
            href="https://www.notion.so/cafeinofficial/f7c711c7a5d344dc94d0e9ab95c2e96a"
            target="_blank"
            rel="noreferrer"
          >
            카페인 스토리
          </WhiteLink>
          <WhiteLink
            href="https://forms.gle/dCqeYDvt6ys4Yn7n7"
            target="_blank"
            rel="noreferrer"
          >
            의견 보내기
          </WhiteLink>
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
            <a
              href="https://forms.gle/F4JChJGvWne3uDxe9"
              target="_blank"
              rel="noreferrer"
            >
              <AddButton>카페 등록하기</AddButton>
            </a>
          </AddLink>
          <IcCafeinWrapper>
            <object type="image/svg+xml" data={'/images/Cafein.svg'}>
              <Image src={'/images/Cafein.svg'} alt="카페로고" layout="fill" />
            </object>
          </IcCafeinWrapper>
        </AddWrapper>
        <Footer isHome={true} />
      </HomeWrapper>
    </Wrapper>
  )
}

export default Home
