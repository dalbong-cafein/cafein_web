import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>카공인을 위한 커페 추천 서비스 카페인</title>
      </Head>
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
    </>
  )
}

const HomeWrapper = styled.div`
  max-width: ${(props) => props.theme.widthes.maxWidth}px;
  width: 100%;
`

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-start;
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
