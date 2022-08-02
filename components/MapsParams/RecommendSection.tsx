import axios from 'axios'
import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { useState } from 'react'
import { cafeInfoAtom } from '../../store'
import {
  ButtonDesc,
  ButtonInnerWrapper,
  ButtonOutterWrapper,
  ButtonWrapper,
  CafeInfoWrapper,
  StrongWrapperTitle,
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
  const [isOnButton, setIsOnButton] = useState(0)
  const recommendOnClickHandler = async (
    recommendation: string,
    storeId: number
  ) => {
    try {
      await axios.post(`/api/web/recommendations`, {
        storeId,
        recommendation
      })
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
            <WrapperTitle>
              <StrongWrapperTitle>{cafeInfo.storeName}</StrongWrapperTitle>
              카공 카페로 어떤가요?
            </WrapperTitle>
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
                    />
                  ) : (
                    <Image
                      src={'/images/bad.svg'}
                      width={60}
                      height={82}
                      alt="bad badge"
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
                    />
                  ) : (
                    <Image
                      src={'/images/soso.svg'}
                      width={60}
                      height={82}
                      alt="soso badge"
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
                    />
                  ) : (
                    <Image
                      src={'/images/good.svg'}
                      width={60}
                      height={82}
                      alt="good badge"
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
