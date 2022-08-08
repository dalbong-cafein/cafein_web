import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import {
  ClearButton,
  HomeTitle,
  HomeWrapper,
  InputWrapper,
  NavWrapper,
  SearchButton,
  SearchFormWrapper,
  SearchInput,
  WhiteLink,
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
import { useHandleClearEvent, useHandleInputs } from '../utils/useSearchHandler'
import { searchInputAtom, searchListsAtom } from '../store'

const Home: NextPage = () => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [isClicked, setIsClicked] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [searchLists, setSearchLists] = useAtom(searchListsAtom)

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
        <SearchFormWrapper
        // onSubmit={(e) =>

        // }
        >
          <InputWrapper>
            <SearchInput
              placeholder="카페 이름이나 지하철역을 검색해보세요"
              value={inputs}
              onChange={(e) =>
                useHandleInputs({
                  e,
                  setInputs,
                  timer,
                  setTimer,
                  setSearchLists
                })
              }
              onFocus={() => setIsClicked(true)}
              onBlur={() => setIsClicked(false)}
            />
            <ClearButton
              isInput={inputs === '' ? false : true}
              onClick={(e) =>
                useHandleClearEvent({ e, setInputs, setSearchLists })
              }
            />
          </InputWrapper>
          <HomeSearchLists
            isDisplay={searchLists.length !== 0 && isClicked ? true : false}
          >
            {searchLists.map((searchList) => {
              const rest_name = searchList.replace(inputs, '')
              return (
                <>
                  <SearchList>
                    <Image
                      src={'/images/location.svg'}
                      width={24}
                      height={24}
                      alt="location IMG"
                    />
                    <SearchListDescs>
                      <SearchListTitle>
                        <SearchListStrong>{inputs}</SearchListStrong>
                        {rest_name}
                      </SearchListTitle>
                      <SearchListPosition>
                        서울특별서 마포구 양학로 45
                      </SearchListPosition>
                    </SearchListDescs>
                  </SearchList>
                </>
              )
            })}
          </HomeSearchLists>
          <SearchButton>지도에서 카페 찾기</SearchButton>
        </SearchFormWrapper>
        <RecommendWrapper>
          <RecommendTitle>지역별 카페 추천</RecommendTitle>
          <RecommendLists>
            <RecommendList isActive={true}>
              <Link
                href={{ pathname: '/', query: { location: '서대문구' } }}
                scroll={false}
              >
                서대문구
              </Link>
            </RecommendList>
            <RecommendList isActive={false}>
              <Link
                href={{ pathname: '/', query: { location: '동대문구' } }}
                scroll={false}
              >
                서대문구
              </Link>
            </RecommendList>
            <RecommendList isActive={false}>
              <Link
                href={{ pathname: '/', query: { location: '남대문구' } }}
                scroll={false}
              >
                서대문구
              </Link>
            </RecommendList>
          </RecommendLists>
          <RecommendItemsWrapper>
            <RecommendItem>1</RecommendItem>
            <RecommendItem>2</RecommendItem>
          </RecommendItemsWrapper>
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
            <Link href="/">
              <QItem>공지사항</QItem>
            </Link>
            <Link href="/">
              <QItem>자주 묻는 질문</QItem>
            </Link>
            <Link href="/">
              <QItem>이용약관</QItem>
            </Link>
          </FooterQLists>
          <FooterQLists>
            <Link href="/">
              <QItem>dalbong.cafeing@gmail.com</QItem>
            </Link>
            <Link href="/">
              <QItem>인스타그램</QItem>
            </Link>
          </FooterQLists>
          <CopyRight>COPYRIGHT © 2022 cafein ALL RIGHTS RESERVED.</CopyRight>
        </FooterWrapper>
      </HomeWrapper>
    </Wrapper>
  )
}

const RecommendWrapper = styled.div`
  margin-top: 102px;
`

const RecommendTitle = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font24}rem;
  font-weight: 700;
`

const RecommendLists = styled.ul`
  margin-top: 24px;
  display: flex;
  gap: 8px;
`

const RecommendList = styled.li<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.grey200 : ''};
  border-radius: 28px;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: ${(props) => (!props.isActive ? props.theme.colors.grey500 : '')};

  &:hover {
    color: inherit;
    background: rgba(0, 0, 0, 0.04);
  }

  & a {
    display: flex;
    padding: 9px 12px;
  }
`

const RecommendItemsWrapper = styled.ul`
  display: grid;
  row-gap: 20px;
  column-gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(364px, 1fr));
`

const RecommendItem = styled.div`
  width: 364px;
  height: 240px;
`

const AddWrapper = styled.div`
  display: flex;
  height: 240px;
  padding: 84px 140px;
  background-image: url('/images/Cafein.svg');
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  background-color: ${(props) => props.theme.colors.grey100};
  background-position: right 132px top 20px;
  border-radius: 20px;
`

const AddLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

const AddLinkText = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font23}rem;
  font-weight: 600;
`

const AddButton = styled.button`
  border-radius: 14px;
  background-color: ${(props) => props.theme.colors.grey600};
  padding: 12px 16px;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
  color: ${(props) => props.theme.colors.white};
`

const FooterWrapper = styled.footer`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`

const FooterQLists = styled.ul`
  display: flex;
  gap: 16px;
`

const QItem = styled.li`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey700};
`

const CopyRight = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey500};
`

export default Home
