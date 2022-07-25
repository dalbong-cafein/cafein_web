import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import CurrentPopularLists from '../common/components/Maps/CurrentPopularLists'
import RegionLists from '../common/components/Maps/RegionLists'
import useMap from '../common/hooks/useMap'
import CryptoJS from 'crypto-js'

interface SortedSet {
  [key: string]: string
}

interface StoreImageDtoList {
  imageId: number
  imageUrl: string
}

interface Store {
  storeId: number
  storeName: string
  recommendPercent: number
  businessHoursInfoDto: {
    isOpen: null | boolean
    closed: null | string
    tmrOpen: null | string
  }
  lngX: number
  latY: number
  heartCnt: number
  congestionScoreAvg: number
  storeImageDtoList: StoreImageDtoList[]
}

interface Props {
  stores?: {
    code: number
    data: Store[]
    message: string
  }
  ip: string
}

const MapPage: NextPage<Props> = ({ ip }) => {
  // useMap()
  console.log('hello', ip)
  return (
    <>
      <Head>
        <title>카페인|지도</title>
      </Head>
      <MainWrapper>
        <SearchWrapper>
          <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
          <SearchButton>검색</SearchButton>
        </SearchWrapper>
        <RegionLists />
        <CurrentPopularLists />
      </MainWrapper>
      <MapBox id="map"></MapBox>
    </>
  )
}

MapPage.getInitialProps = async (ctx) => {
  const response = await fetch('https://api.ip.pe.kr/json/')
  if (response.ok) {
    const { ip } = await response.json()
    return { ip }
  }

  // const res = await fetch(`${process.env.API_DOMAIN}/stores`)
  // const stores: Store = await res.json()
  // return {
  //   props: { stores, data }
  // }
}

const MainWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 117px;
  width: 100%;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.grey50};
  max-width: ${(props) => props.theme.widthes.maxBarList}px;
  min-width: ${(props) => props.theme.widthes.minBarList}px;
  z-index: 9999;
`

const SearchWrapper = styled.form`
  display: flex;
  flex-direction: row;
`

const SearchInput = styled.input`
  width: 530px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey100};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  padding: 0 20px;
`

const SearchButton = styled.button`
  width: 86px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.orange400};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  color: ${(props) => props.theme.colors.white};
  margin-left: 16px;
`

const MapBox = styled.div`
  width: 100vw;
  height: calc(100vh - 117px);
`

export default MapPage
