import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import {
  ButtonsWrapper,
  HeaderWrapper,
  HomeTitle,
  HomeWrapper,
  NavWrapper,
  SearchButton,
  SearchByMap,
  SearchFormWrapper,
  SearchInput,
  StrongTitle,
  WhiteLink,
  WhiteLinkWrapper,
  Wrapper
} from '../components/Home/styles/styles'
import {
  HomeSearchLists,
  SearchList,
  SearchListDescs,
  SearchListPosition,
  SearchListStrong,
  SearchListTitle
} from '../components/Maps/styles/FormStyles'

const Home: NextPage = () => {
  const [inputs, setInputs] = useState('')
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const handleInputs = async (e: ChangeEvent<HTMLInputElement>) => {
    setInputs(e.target.value)
    if (timer) {
      clearTimeout(timer)
    }
    const newTimer = setTimeout(async () => {
      try {
        const response = await axios({
          method: 'get',
          url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`
          },
          params: {
            query: `${inputs}`,
            category_group_code: 'CE7'
          }
        })
        console.log(response)
      } catch (error) {
        console.error(`Debouncing Error while fetching Seach Lists : ${error}`)
      }
    }, 500)
    setTimer(newTimer)
  }
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
              width={80}
              height={21.5}
            />
          </a>
        </Link>
        <ButtonsWrapper>
          <WhiteLinkWrapper>
            <Link href="/">
              <WhiteLink>의견 보내기</WhiteLink>
            </Link>
          </WhiteLinkWrapper>
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
          <SearchInput
            placeholder="카페 이름이나 지하철역을 검색해보세요"
            value={inputs}
            onChange={handleInputs}
          />
          <SearchButton>검색</SearchButton>
          <Link href="/maps">
            <SearchByMap>지도에서 찾기</SearchByMap>
          </Link>
        </SearchFormWrapper>
        <HomeSearchLists>
          <SearchList>
            <Image
              src={'/images/location.svg'}
              width={24}
              height={24}
              alt="location IMG"
            />
            <SearchListDescs>
              <SearchListTitle>
                <SearchListStrong>푸썸플레이스</SearchListStrong> 합정역점
              </SearchListTitle>
              <SearchListPosition>
                서울특별서 마포구 양학로 45
              </SearchListPosition>
            </SearchListDescs>
          </SearchList>
        </HomeSearchLists>
      </HomeWrapper>
    </Wrapper>
  )
}

export default Home
