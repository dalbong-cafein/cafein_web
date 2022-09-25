import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import axios from 'axios'

import { CafeInfoInterface, IDimmed, isDimmedAtom } from 'store'
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
import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { useSetAtom } from 'jotai'

const RecommendSection = ({
  store,
  setCafeReviewPercent
}: {
  store: CafeInfoInterface
  setCafeReviewPercent: Dispatch<SetStateAction<number | null>>
}) => {
  const [isOnButton, setIsOnButton] = useState(0)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)
  const setIsDimmed = useSetAtom(isDimmedAtom)
  const router = useRouter()
  const { search } = router.query
  const { mutate } = useSWRConfig()

  useEffect(() => {
    getRecommendation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store])

  const getRecommendation = async () => {
    try {
      const response = await axios.get(
        `/api/web/stores/${store.storeId}/recommendations`
      )
      const { data } = response.data
      const { recommendPercentOfStore, recommendation } = data
      setCafeReviewPercent(recommendPercentOfStore)
      mutate(search)
      if (recommendation === 'BAD') {
        setIsOnButton(1)
      } else if (recommendation === 'NORMAL') {
        setIsOnButton(2)
      } else if (recommendation === 'GOOD') {
        setIsOnButton(3)
      } else {
        setIsOnButton(0)
      }
    } catch (error) {
      console.error(`Cafe Recommend data Get error : ${error}`)
    }
  }

  const recommendOnClickHandler = async (
    recommendation: 'BAD' | 'NORMAL' | 'GOOD',
    storeId: number
  ) => {
    const dimmed_obj: IDimmed = isOnButton
      ? {
          title: `이런! 이미 리뷰를 등록하셨군요!`,
          body: `내일 다시 등록해주세요`,
          type: 'alert'
        }
      : {
          title: `리뷰를 등록하시겠습니까?`,
          body: `${store.storeName}에 대한 리뷰는\n하루에 한 번만 등록할 수 있습니다.`,
          type: 'confirm',
          callback: postRecommend
        }
    setIsDimmed(dimmed_obj)

    function postRecommend() {
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
  }

  return (
    <CafeInfoWrapper
      onMouseEnter={() => {
        setIsHovering_1(false)
        setIsHovering_2(false)
        setIsHovering_3(false)
      }}
    >
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
            <ButtonDesc isOnButton={isOnButton === 1}>별로예요</ButtonDesc>
          </ButtonWrapper>
          <ButtonWrapper
            onMouseEnter={() => setIsHovering_2(true)}
            onMouseLeave={() => setIsHovering_2(false)}
            onClick={() => recommendOnClickHandler('NORMAL', store.storeId)}
          >
            {isHovering_2 || isOnButton === 2 ? <Ic_sosoOn /> : <Ic_soso />}
            <ButtonDesc isOnButton={isOnButton === 2}>그저그래요</ButtonDesc>
          </ButtonWrapper>
          <ButtonWrapper
            onMouseEnter={() => setIsHovering_3(true)}
            onMouseLeave={() => setIsHovering_3(false)}
            onClick={() => recommendOnClickHandler('GOOD', store.storeId)}
          >
            {isHovering_3 || isOnButton === 3 ? <Ic_goodOn /> : <Ic_good />}
            <ButtonDesc isOnButton={isOnButton === 3}>추천해요</ButtonDesc>
          </ButtonWrapper>
        </ButtonInnerWrapper>
      </ButtonOutterWrapper>
    </CafeInfoWrapper>
  )
}

export default RecommendSection
