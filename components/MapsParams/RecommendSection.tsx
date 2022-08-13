import axios from 'axios'
import { useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { cafeInfoAtom, cafeReviewPercentAtom } from '../../store'
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

interface propTypes {
  isHovering_1: boolean
  setIsHovering_1: (b: boolean) => void
  isHovering_2: boolean
  setIsHovering_2: (b: boolean) => void
  isHovering_3: boolean
  setIsHovering_3: (b: boolean) => void
}

const RecommendSection = ({
  isHovering_1,
  setIsHovering_1,
  isHovering_2,
  setIsHovering_2,
  isHovering_3,
  setIsHovering_3
}: propTypes) => {
  const cafeInfo = useAtomValue(cafeInfoAtom)
  const setCafeReviewPercent = useSetAtom(cafeReviewPercentAtom)
  const [isOnButton, setIsOnButton] = useState(0)
  const router = useRouter()
  const { storeId } = router.query

  useEffect(() => {
    setIsOnButton(0)
  }, [storeId])

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

      if (recommendation === 'BAD') {
        setIsOnButton(1)
      } else if (recommendation === 'NORMAL') {
        setIsOnButton(2)
      } else if (recommendation === 'GOOD') {
        setIsOnButton(3)
      }
    } catch (error) {
      console.error(
        `카페 추천 데이터 등록 에러 : ${error} of "${recommendation}"`
      )
    }
  }
  return (
    <>
      {cafeInfo && (
        <>
          <CafeInfoWrapper>
            <WrapperTitle>리뷰</WrapperTitle>
            <WordsWrapper>
              <StrongWrapperTitle>{cafeInfo.storeName}</StrongWrapperTitle>
              <WordsWrapperText>카공 카페로 어떤가요?</WordsWrapperText>
            </WordsWrapper>
            <ButtonOutterWrapper>
              <ButtonInnerWrapper>
                <ButtonWrapper
                  onMouseEnter={() => setIsHovering_1(true)}
                  onMouseLeave={() => setIsHovering_1(false)}
                  onClick={() =>
                    recommendOnClickHandler('BAD', cafeInfo.storeId)
                  }
                >
                  {isHovering_1 || isOnButton === 1 ? (
                    <Image
                      src={'/images/bad_on.svg'}
                      width={60}
                      height={82}
                      alt="bad_on badge"
                      priority={true}
                    />
                  ) : (
                    <Image
                      src={'/images/bad.svg'}
                      width={60}
                      height={82}
                      alt="bad badge"
                      priority={true}
                    />
                  )}
                  <ButtonDesc
                    isHovering={isHovering_1}
                    isOnButton={isOnButton === 1}
                  >
                    별로예요
                  </ButtonDesc>
                </ButtonWrapper>
                <ButtonWrapper
                  onMouseEnter={() => setIsHovering_2(true)}
                  onMouseLeave={() => setIsHovering_2(false)}
                  onClick={() =>
                    recommendOnClickHandler('NORMAL', cafeInfo.storeId)
                  }
                >
                  {isHovering_2 || isOnButton === 2 ? (
                    <Image
                      src={'/images/soso_on.svg'}
                      width={60}
                      height={82}
                      alt="soso_on badge"
                      priority={true}
                    />
                  ) : (
                    <Image
                      src={'/images/soso.svg'}
                      width={60}
                      height={82}
                      alt="soso badge"
                      priority={true}
                    />
                  )}
                  <ButtonDesc
                    isHovering={isHovering_2}
                    isOnButton={isOnButton === 2}
                  >
                    그저그래요
                  </ButtonDesc>
                </ButtonWrapper>
                <ButtonWrapper
                  onMouseEnter={() => setIsHovering_3(true)}
                  onMouseLeave={() => setIsHovering_3(false)}
                  onClick={() =>
                    recommendOnClickHandler('GOOD', cafeInfo.storeId)
                  }
                >
                  {isHovering_3 || isOnButton === 3 ? (
                    <Image
                      src={'/images/good_on.svg'}
                      width={60}
                      height={82}
                      alt="good_on badge"
                      priority={true}
                    />
                  ) : (
                    <Image
                      src={'/images/good.svg'}
                      width={60}
                      height={82}
                      alt="good badge"
                      priority={true}
                    />
                  )}
                  <ButtonDesc
                    isHovering={isHovering_3}
                    isOnButton={isOnButton === 3}
                  >
                    추천해요
                  </ButtonDesc>
                </ButtonWrapper>
              </ButtonInnerWrapper>
            </ButtonOutterWrapper>
          </CafeInfoWrapper>
        </>
      )}
    </>
  )
}

export default RecommendSection
