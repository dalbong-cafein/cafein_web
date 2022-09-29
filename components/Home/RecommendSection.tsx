import { useRouter } from 'next/router'

import RecommendItems from './RecommendItems'
import TabList from './TabList'

import { SearchButton } from './styles/FormStyles'
import {
  RecommendHeadWrapper,
  RecommendSubWrapper,
  RecommendTitle,
  RecommendWrapper
} from './styles/RecommendStyles'
import { useEffect, useRef } from 'react'

const RecommendSection = () => {
  const router = useRouter()
  const recoRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (router.query.recommend) {
      recoRef.current?.scrollIntoView()
    }
  }, [router])
  const mapHandler = () => {
    router.push('/maps')
  }
  return (
    <RecommendWrapper ref={recoRef}>
      <RecommendSubWrapper>
        <RecommendHeadWrapper>
          <RecommendTitle>지역별 카페 추천</RecommendTitle>
          <TabList />
        </RecommendHeadWrapper>
        <SearchButton onClick={mapHandler}>지도에서 카페 찾기</SearchButton>
      </RecommendSubWrapper>
      <RecommendItems />
    </RecommendWrapper>
  )
}

export default RecommendSection
