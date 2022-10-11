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
  const [isOnButton, setIsOnButton] = useState<
    'BAD' | 'NORMAL' | 'GOOD' | undefined
  >()
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)
  const [countOfTypes, setCountOfTypes] = useState([0, 0, 0])
  const setIsDimmed = useSetAtom(isDimmedAtom)
  const router = useRouter()
  const { search, sggNm, type } = router.query
  const { mutate } = useSWRConfig()
  const url = `sggNm=${encodeURI(sggNm as string)}&type=${encodeURI(
    type as string
  )}`

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
      const {
        countByRecommendTypeResDto,
        recommendPercentOfStore,
        regRecommendation
      } = data
      setCafeReviewPercent(recommendPercentOfStore)
      setCountOfTypes([
        countByRecommendTypeResDto['bad'],
        countByRecommendTypeResDto['normal'],
        countByRecommendTypeResDto['good']
      ])
      mutate(search)
      sggNm ? mutate(url) : ''
      setIsOnButton(regRecommendation)
    } catch (error) {
      console.error(`Cafe Recommend data Get error : ${error}`)
    }
  }

  const recommendOnClickHandler = async (
    recommendation: 'BAD' | 'NORMAL' | 'GOOD',
    storeId: number
  ) => {
    const dimmed_obj: IDimmed =
      isOnButton === recommendation
        ? {
            title: `만족도를 삭제하시겠습니까?`,
            body: `${store.storeName}에 등록한 만족도를\n정말로 취소하시겠습니까?`,
            type: 'confirm',
            callback: deleteRecommend
          }
        : isOnButton
        ? {
            title: `만족도를 수정하시겠습니까?`,
            body: `${store.storeName}에 등록한 만족도를\n수정합니다.`,
            type: 'confirm',
            callback: updateRecommend
          }
        : {
            title: `만족도를 등록하시겠습니까?`,
            body: `${store.storeName}에 대한 만족도는\n하루에 한 번만 등록할 수 있습니다.`,
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

    function deleteRecommend() {
      try {
        axios
          .delete(`/api/web/stores/${store.storeId}/recommendations`)
          .then(() => getRecommendation())
      } catch (error) {
        console.error(
          `카페 추천 데이터 취소 실패 : ${error} of ${recommendation} cancel`
        )
      }
    }

    function updateRecommend() {
      try {
        axios
          .delete(`/api/web/stores/${store.storeId}/recommendations`)
          .then(() =>
            axios.post(`/api/web/recommendations`, {
              recommendation,
              storeId
            })
          )
          .then(() => getRecommendation())
      } catch (error) {
        console.error(
          `카페 추천 데이터 변경 실패: ${error} of ${recommendation} update`
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
      <WrapperTitle>카공 만족도</WrapperTitle>
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
            {isHovering_1 || isOnButton === 'BAD' ? <Ic_badOn /> : <Ic_bad />}
            <ButtonDesc isOnButton={isOnButton === 'BAD'}>
              별로예요{countOfTypes[0] ? <span>{countOfTypes[0]}</span> : ''}
            </ButtonDesc>
          </ButtonWrapper>
          <ButtonWrapper
            onMouseEnter={() => setIsHovering_2(true)}
            onMouseLeave={() => setIsHovering_2(false)}
            onClick={() => recommendOnClickHandler('NORMAL', store.storeId)}
          >
            {isHovering_2 || isOnButton === 'NORMAL' ? (
              <Ic_sosoOn />
            ) : (
              <Ic_soso />
            )}
            <ButtonDesc isOnButton={isOnButton === 'NORMAL'}>
              그저그래요{countOfTypes[1] ? <span>{countOfTypes[1]}</span> : ''}
            </ButtonDesc>
          </ButtonWrapper>
          <ButtonWrapper
            onMouseEnter={() => setIsHovering_3(true)}
            onMouseLeave={() => setIsHovering_3(false)}
            onClick={() => recommendOnClickHandler('GOOD', store.storeId)}
          >
            {isHovering_3 || isOnButton === 'GOOD' ? (
              <Ic_goodOn />
            ) : (
              <Ic_good />
            )}
            <ButtonDesc isOnButton={isOnButton === 'GOOD'}>
              추천해요{countOfTypes[2] ? <span>{countOfTypes[2]}</span> : ''}
            </ButtonDesc>
          </ButtonWrapper>
        </ButtonInnerWrapper>
      </ButtonOutterWrapper>
    </CafeInfoWrapper>
  )
}

export default RecommendSection
