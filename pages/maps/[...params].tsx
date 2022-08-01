import axios from 'axios'
import { useAtom } from 'jotai'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import MapLayout from '../../components/Maps/MapLayout'
import CafeInfoSection from '../../components/MapsParams/CafeInfoSection'
import CafePOintsSection from '../../components/MapsParams/CafePointsSection'
import ImageSection from '../../components/MapsParams/ImageSection'
import RecommendSection from '../../components/MapsParams/RecommendSection'
import {
  CafeInfoWrapper,
  WrapperTitle
} from '../../components/MapsParams/styles/styles'
import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPonitAtom,
  CafeRewviewPointInterface
} from '../../store'
import { NextPageWithLayout } from '../_app'

const DetailMaps: NextPageWithLayout<{ params: string[] }> = ({ params }) => {
  const storeId = Number(params[0])
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const [cafePoints, setCafePoints] = useAtom(cafeReviewPonitAtom)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)

  useEffect(() => {
    async function getDetailStore() {
      try {
        const response = await axios.get(`/api/stores/${storeId}`)
        const data: CafeInfoInterface = response.data.data
        setCafeInfo(data)
      } catch (error) {
        console.error(`Cafe Info data GET 요청 에러 : ${error}`)
      }
    }
    async function getCafePoints() {
      try {
        const res = await axios.get(
          `/api/stores/${storeId}/detail-review-score`
        )
        const data: CafeRewviewPointInterface = res.data.data
        setCafePoints(data)
      } catch (error) {
        console.error(`Cafe Points data GET 요청 에러 : ${error}`)
      }
    }
    async function getRecommendation() {
      try {
        const response = await axios.get(
          `/api/web/stores/${storeId}/recommendations`
        )
        const { data } = response.data
        if (data === 'BAD') {
          setIsHovering_1(true)
        } else if (data === 'NORMAL') {
          setIsHovering_2(true)
        } else if (data === 'GOOD') {
          setIsHovering_3(true)
        }
      } catch (error) {
        console.error
      }
    }
    if (storeId !== cafeInfo?.storeId) {
      Promise.all([getDetailStore(), getCafePoints(), getRecommendation()])
    }
  }, [storeId, cafeInfo, setCafeInfo, setCafePoints])

  return (
    <>
      <Head>
        <title>카페인| 지도 {storeId}</title>
      </Head>
      {cafeInfo && cafePoints && (
        <>
          <ImageSection />
          <CafeInfoSection />
          <CafePOintsSection />
          <RecommendSection
            isHovering_1={isHovering_1}
            setIsHovering_1={setIsHovering_1}
            isHovering_2={isHovering_2}
            setIsHovering_2={setIsHovering_2}
            isHovering_3={isHovering_3}
            setIsHovering_3={setIsHovering_3}
          />
          <CafeInfoWrapper>
            <WrapperTitle>혼잡도</WrapperTitle>
          </CafeInfoWrapper>
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { params } = query
  return {
    props: { params }
  }
}

DetailMaps.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export default DetailMaps
