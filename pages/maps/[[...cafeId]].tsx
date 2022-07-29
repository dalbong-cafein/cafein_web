import axios from 'axios'
import { useAtom, useAtomValue } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import styled from 'styled-components'
import { Ddabong } from '../../components/common/Common'
import { HomeTitle } from '../../components/Home/styles/FormStyles'
import CurrentPopularLists from '../../components/Maps/CurrentPopularLists'
import MapLayout from '../../components/Maps/MapLayout'
import RegionLists from '../../components/Maps/RegionLists'
import {
  SearchButton,
  SearchInput,
  SearchWrapper
} from '../../components/Maps/styles/styles'
import { cafeInfoAtom, CafeInfoInterface, is_running_atom } from '../../store'
import { NextPageWithLayout } from '../_app'

const MapPage: NextPageWithLayout = () => {
  // 주소창에 cafeId가 있으면 Detail Map을 보여줌
  const router = useRouter()
  const { cafeId } = router.query
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const [isRunning, closeTime] = useAtomValue(is_running_atom)

  useEffect(() => {
    if (!router.isReady || !cafeId) return
    async function getDetailStore() {
      try {
        if (cafeInfo?.storeId == cafeId) return
        const response = await axios.get(`/api/stores/${cafeId}`)
        const data: CafeInfoInterface = response.data.data
        setCafeInfo(data)
      } catch (error) {
        console.log(`GET 요청 에러 : ${error}`)
      }
    }
    getDetailStore()
  })
  console.log(cafeInfo)
  let MapContent
  if (!cafeId) {
    MapContent = (
      <>
        <SearchWrapper>
          <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
          <SearchButton>검색</SearchButton>
        </SearchWrapper>
        <RegionLists />
        <CurrentPopularLists />
      </>
    )
  } else {
    MapContent = (
      <>
        <Head>
          <title>카페인| 지도 {cafeId}</title>
        </Head>
        {cafeInfo && (
          <>
            <ImageWrappers>
              {cafeInfo.storeImageList.slice(0, 5).map((imgData, idx) => (
                <Image
                  src={imgData.imageUrl}
                  alt="카페 사진"
                  key={cafeInfo.storeId + idx}
                  width={392}
                  height={284}
                />
              ))}
            </ImageWrappers>
            <CafeInfoHeader>
              <TitleWrapper>
                <HeaderTitle>{cafeInfo.storeName}</HeaderTitle>
                {cafeInfo.heartCnt && <>{Ddabong} n% (계산해야함 + 디자인)</>}
              </TitleWrapper>
              <SubTitle>{cafeInfo.address.fullAddress}</SubTitle>
            </CafeInfoHeader>
            <OpenInfoWrapper>
              <ClockIcon>{/* <Image src="/public/images/" /> */}</ClockIcon>
              <Description>
                <StrongSpan>{isRunning ? '영업 중' : '영업 종료'}</StrongSpan>
                오후 11:30에 영업 종료
              </Description>
            </OpenInfoWrapper>
          </>
        )}
        <HomeTitle>나는 바보</HomeTitle>
      </>
    )
  }

  return MapContent
}

MapPage.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

const ImageWrappers = styled.div`
  display: grid;
  width: 680px;
  height: 284px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 392px 1fr 1fr;
  grid-gap: 4px;

  span:nth-child(1) {
    grid-row: 1 / 3;
  }
`

const CafeInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 30px 24px;
`

const TitleWrapper = styled.div`
  display: flex;
`

const HeaderTitle = styled.h1`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
`

const SubTitle = styled.h2`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  margin-top: 10px;
`

const OpenInfoWrapper = styled.div`
  display: flex;
`

const ClockIcon = styled.span`
  width: 20px;
  height: 20px;
`

const Description = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

const StrongSpan = styled.span`
  color: ${(props) => props.theme.colors.orange500};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

export default MapPage
