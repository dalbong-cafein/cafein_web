import axios from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  CafeRewviewPointInterface,
  IStore,
  moreAtom
} from '../../store'
import { DetailWrapper } from './styles/styles'
import { useRouter } from 'next/router'
import DetailCafe from '../MapsParams/DetailCaffe'

interface DetailCafeProps {
  cafe?: IStore
}

const DetailStore = ({ cafe }: DetailCafeProps) => {
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const [cafePoints, setCafePoints] = useAtom(cafeReviewPonitAtom)
  const setCafeReviewPercent = useSetAtom(cafeReviewPercentAtom)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)
  const [isBadQuery, setIsBadQuery] = useState(false)
  const router = useRouter()
  const { storeId } = router.query
  const setMore = useSetAtom(moreAtom)

  useEffect(() => {
    setMore(false)
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
    <DetailWrapper>
      <Head>
        <title>
          카페인 |{' '}
          {router.query.storeName
            ? router.query.storeName
            : cafeInfo?.storeName}
        </title>
      </Head>
      <DetailCafe cafe={cafe} isSingle={false} />
    </DetailWrapper>
  )
}

export default DetailStore
