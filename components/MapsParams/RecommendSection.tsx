import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { useAtomValue, useSetAtom } from 'jotai'

import { cafeInfoAtom, CafeInfoInterface, cafeReviewPercentAtom } from 'store'
import Ic_badOn from '@public/bad_on.svg'
import Ic_bad from '@public/bad.svg'
import Ic_sosoOn from '@public/soso_on.svg'
import Ic_soso from '@public/soso.svg'
import Ic_goodOn from '@public/good_on.svg'
import Ic_good from '@public/good.svg'

import {
  ButtonDesc,
  ButtonInnerWrapper,
  ButtonOutterWrapper,
  ButtonWrapper,
  CafeInfoWrapper,
  StrongWrapperTitle,
  WordsWrapper,
  WordsWrapperText,
  WrapperTitle
} from './styles/styles'

const RecommendSection = ({ store }: { store: CafeInfoInterface }) => {
  const [, setCafeReviewPercent] = useState<null | number>(null)
  const [isOnButton, setIsOnButton] = useState(0)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)

  useEffect(() => {
    getRecommendation()
  }, [])

  const getRecommendation = async () => {
    try {
      const response = await axios.get(
        `/api/web/stores/${store.storeId}/recommendations`
      )
      const { data } = response.data
      const { recommendPercentOfStore, recommendation } = data
      console.log(recommendation)
      setCafeReviewPercent(recommendPercentOfStore)
      if (recommendation === 'BAD') {
        setIsOnButton(1)
      } else if (recommendation === 'NORMAL') {
        setIsOnButton(2)
      } else if (recommendation === 'GOOD') {
        setIsOnButton(3)
      }
    } catch (error) {
      console.error(`Cafe Recommend data Get error : ${error}`)
    }
  }

  const recommendOnClickHandler = async (
    recommendation: string,
    storeId: number
  ) => {
    try {
      axios
        .post(`/api/web/recommendations`, {
          recommendation,
          storeId
        })
        .then(() => getRecommendation())
    } catch (error) {
      console.error(
        `카페 추천 데이터 등록 에러 : ${error} of "${recommendation}"`
      )
    }
  }

  return (
    <CafeInfoWrapper>
      <WrapperTitle>리뷰</WrapperTitle>
      <WordsWrapper>
        <StrongWrapperTitle>{store.storeName}</StrongWrapperTitle>
        <WordsWrapperText>카공 카페로 어떤가요?</WordsWrapperText>
      </WordsWrapper>
      <ButtonOutterWrapper>
        <ButtonInnerWrapper>
          <ButtonWrapper
            onMouseEnter={() => setIsHovering_1(true)}
            onMouseLeave={() => setIsHovering_1(false)}
            onClick={() => recommendOnClickHandler('BAD', store.storeId)}
          >
            {isHovering_1 || isOnButton === 1 ? <Ic_badOn /> : <Ic_bad />}
            <ButtonDesc isHovering={isHovering_1} isOnButton={isOnButton === 1}>
              별로예요
            </ButtonDesc>
          </ButtonWrapper>
          <ButtonWrapper
            onMouseEnter={() => setIsHovering_2(true)}
            onMouseLeave={() => setIsHovering_2(false)}
            onClick={() => recommendOnClickHandler('NORMAL', store.storeId)}
          >
            {isHovering_2 || isOnButton === 2 ? <Ic_sosoOn /> : <Ic_soso />}
            <ButtonDesc isHovering={isHovering_2} isOnButton={isOnButton === 2}>
              그저그래요
            </ButtonDesc>
          </ButtonWrapper>
          <ButtonWrapper
            onMouseEnter={() => setIsHovering_3(true)}
            onMouseLeave={() => setIsHovering_3(false)}
            onClick={() => recommendOnClickHandler('GOOD', store.storeId)}
          >
            {isHovering_3 || isOnButton === 3 ? <Ic_goodOn /> : <Ic_good />}
            <ButtonDesc isHovering={isHovering_3} isOnButton={isOnButton === 3}>
              추천해요
            </ButtonDesc>
          </ButtonWrapper>
        </ButtonInnerWrapper>
      </ButtonOutterWrapper>
    </CafeInfoWrapper>
  )
}

export default RecommendSection
