import { CafeRewviewPointInterface } from 'store'

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
  WrapperTitle
} from './styles/styles'
import { getStars } from '@utils/CafePoint/getStars'

const CafePointsSection = ({
  reviewStore
}: {
  reviewStore: CafeRewviewPointInterface
}) => {
  return (
    <CafeInfoWrapper>
      <WrapperTitle>카공 정보</WrapperTitle>
      <CafeInfoList>
        <CafeInfoItemWrapper>
          <Ic_plug />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>콘센트</CafeInfoItemTitle>
              {getStars(reviewStore.socket)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>바닥을 기어봐도 없어요</CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
        <CafeInfoItemWrapper>
          <Ic_restroom />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>화장실</CafeInfoItemTitle>
              {getStars(reviewStore.restroom)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>다시 가고싶지 않아요</CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
        <CafeInfoItemWrapper>
          <Ic_table />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>테이블</CafeInfoItemTitle>
              {getStars(reviewStore.tableSize)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>매우 편하게 사용 가능해요</CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
        <CafeInfoItemWrapper>
          <Ic_wifi />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>와이파이</CafeInfoItemTitle>
              {getStars(reviewStore.wifi)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>자주 끊겨서 화나요</CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
      </CafeInfoList>
    </CafeInfoWrapper>
  )
}

export default CafePointsSection
