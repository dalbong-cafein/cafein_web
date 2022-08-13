import axios from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  CafeRewviewPointInterface,
  IStore
} from '../../store'
import CafeInfoSection from '../MapsParams/CafeInfoSection'
import CafePOintsSection from '../MapsParams/CafePointsSection'
import ImageSection from '../MapsParams/ImageSection'
import { CafeInfoWrapper } from '../MapsParams/styles/CafeInfoSectionStyle'
import RecommendSection from '../MapsParams/RecommendSection'
import { WrapperTitle } from '../MapsParams/styles/CafePointsSectionStyle'
import { DetailWrapper } from './styles/styles'
import { useRouter } from 'next/router'

const DetailStore = () => {
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const [cafePoints, setCafePoints] = useAtom(cafeReviewPonitAtom)
  const setCafeReviewPercent = useSetAtom(cafeReviewPercentAtom)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)
  const [isBadQuery, setIsBadQuery] = useState(false)
  const router = useRouter()
  const { storeId } = router.query

  useEffect(() => {
    console.log('hello Funk')
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
        console.log(res.data)
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
        console.log(data, '데이터를 보여줘!!')
        const { recommendPercentOfStore, recommendation } = data
        setCafeReviewPercent(recommendPercentOfStore)
        if (recommendation === 'BAD') {
          setIsHovering_1(true)
          setIsHovering_2(false)
          setIsHovering_3(false)
        } else if (recommendation === 'NORMAL') {
          setIsHovering_1(false)
          setIsHovering_2(true)
          setIsHovering_3(false)
        } else if (recommendation === 'GOOD') {
          setIsHovering_1(false)
          setIsHovering_2(false)
          setIsHovering_3(true)
        } else {
          setIsHovering_1(false)
          setIsHovering_2(false)
          setIsHovering_3(false)

        }
      } catch (error) {
        console.error
      }
    }
    if (storeId && isNaN(+storeId)) {
      setIsBadQuery(true)
    }
    if (storeId !== cafeInfo?.storeId) {
      Promise.all([getDetailStore(), getCafePoints(), getRecommendation()])
    }
  }, [storeId])

  return (
    <DetailWrapper isDetail={storeId ? true : false}>
      <Head>
        <title>
          카페인 |{' '}
          {router.query.storeName
            ? router.query.storeName
            : cafeInfo?.storeName}
        </title>
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
    </DetailWrapper>
  )
}

export default DetailStore
