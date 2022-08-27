import { useAtomValue } from 'jotai'

import { cafeReviewPonitAtom } from 'store'

import Ic_star from '@public/star.svg'
import Ic_empty_star from '@public/empty_star.svg'
import Ic_plug from '@public/plug.svg'
import Ic_restroom from '@public/restroom.svg'
import Ic_table from '@public/table.svg'
import Ic_wifi from '@public/wifi.svg'

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
        {[1, 2, 3, 4].map((num, idx) => {
          if (num <= +cnt) {
            return <Ic_star key={idx} />
          }
          return <Ic_empty_star key={idx} />
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
                <Ic_plug />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>콘센트</CafeInfoItemTitle>
                    {getStars(cafePoints.socket)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>바닥을 기어봐도 없어요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Ic_restroom />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>화장실</CafeInfoItemTitle>
                    {getStars(cafePoints.restroom)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>다시 가고싶지 않아요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Ic_table />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>테이블</CafeInfoItemTitle>
                    {getStars(cafePoints.tableSize)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>매우 편하게 사용 가능해요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Ic_wifi />
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
