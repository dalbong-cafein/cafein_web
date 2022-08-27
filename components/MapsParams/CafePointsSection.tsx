import { useAtomValue } from 'jotai'
import Image from 'next/image'

import { cafeReviewPonitAtom } from '../../store'

import {
  CafeInfoItemDesc,
  CafeInfoItemDescsWrapper,
  CafeInfoItemDescWrapper,
  CafeInfoItemTitle,
  CafeInfoItemWrapper,
  CafeInfoList,
  CafeInfoWrapper,
  StartWrapper,
  WrapperTitle
} from './styles/styles'

const CafePOintsSection = () => {
  const cafePoints = useAtomValue(cafeReviewPonitAtom)
  const getStars = (cnt: string) => {
    return (
      <StartWrapper>
        {[1, 2, 3, 4].map((num) => {
          if (num <= +cnt) {
            return (
              <Image
                key={num}
                src={'/images/star.svg'}
                width={16}
                height={16}
                alt="star icon"
              />
            )
          }
          return (
            <Image
              key={num}
              src={'/images/empty_star.svg'}
              width={16}
              height={16}
              alt="star icon"
            />
          )
        })}
      </StartWrapper>
    )
  }
  return (
    <>
      {cafePoints && (
        <>
          <CafeInfoWrapper>
            <WrapperTitle>카공 정보</WrapperTitle>
            <CafeInfoList>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/plug.svg'}
                  width={40}
                  height={40}
                  alt="plug badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>콘센트</CafeInfoItemTitle>
                    {getStars(cafePoints.socket)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>바닥을 기어봐도 없어요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/restroom.svg'}
                  width={40}
                  height={40}
                  alt="restroom badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>화장실</CafeInfoItemTitle>
                    {getStars(cafePoints.restroom)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>다시 가고싶지 않아요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/table.svg'}
                  width={40}
                  height={40}
                  alt="table badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>테이블</CafeInfoItemTitle>
                    {getStars(cafePoints.tableSize)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>매우 편하게 사용 가능해요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/wifi.svg'}
                  width={40}
                  height={40}
                  alt="wifi badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>와이파이</CafeInfoItemTitle>
                    {getStars(cafePoints.wifi)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>자주 끊겨서 화나요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
            </CafeInfoList>
          </CafeInfoWrapper>
        </>
      )}
    </>
  )
}

export default CafePOintsSection
