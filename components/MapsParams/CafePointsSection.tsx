import { CafeRewviewPointInterface } from 'store'

import Ic_plug from '@public/plug.svg'
import Ic_restroom from '@public/restroom.svg'
import Ic_table from '@public/table.svg'
import Ic_wifi from '@public/wifi.svg'
import Ic_running from '@public/running_img.svg'

import {
  CafeInfoItemDesc,
  CafeInfoItemDescsWrapper,
  CafeInfoItemDescWrapper,
  CafeInfoItemTitle,
  CafeInfoItemWrapper,
  CafeInfoList,
  CafeInfoWrapper,
  Dimmed,
  PercentBadge,
  PointTitleWrapper,
  WrapperTitle
} from './styles/styles'
import { getStars } from '@utils/CafePoint/getStars'
import {
  getSocketPhrase,
  getWifiPhrase,
  getRestroomPhrase,
  getTablePhrase
} from '@utils/CafeInfo/getPhrases'

interface ICafePoninProps {
  reviewStore: CafeRewviewPointInterface
  cafeReviewPercent: number | null
}

const CafePointsSection = ({
  reviewStore,
  cafeReviewPercent
}: ICafePoninProps) => {
  console.log(reviewStore, 'haha')
  return (
    <CafeInfoWrapper>
      <PointTitleWrapper>
        <WrapperTitle>카공 정보</WrapperTitle>
        {cafeReviewPercent ? (
          cafeReviewPercent < 37.5 ? (
            <PercentBadge color="#515151" backgroundColor="#EFEFEF">
              아쉬워요
            </PercentBadge>
          ) : cafeReviewPercent < 75.1 ? (
            <PercentBadge color="#FF9800" backgroundColor="#FFF3E0">
              무난해요
            </PercentBadge>
          ) : (
            <PercentBadge color="#26ba6a" backgroundColor="#dff5e8">
              추천해요
            </PercentBadge>
          )
        ) : (
          ''
        )}
      </PointTitleWrapper>
      <CafeInfoList>
        {!reviewStore.restroomCnt && (
          <Dimmed>
            <Ic_running width={66} height={60} viewBox={'0 0 88 80'} />
            <p>
              카공 정보를 수집하는 중이에요
              <br />
              빠른 시일 내에 등록해 둘게요
            </p>
          </Dimmed>
        )}
        <CafeInfoItemWrapper>
          <Ic_plug />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>콘센트</CafeInfoItemTitle>
              {getStars(reviewStore.socket)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>
              {getSocketPhrase(reviewStore.socket as '1' | '2' | '3' | '4')}
            </CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
        <CafeInfoItemWrapper>
          <Ic_restroom />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>화장실</CafeInfoItemTitle>
              {getStars(reviewStore.restroom)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>
              {getRestroomPhrase(reviewStore.restroom as '1' | '2' | '3' | '4')}
            </CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
        <CafeInfoItemWrapper>
          <Ic_table />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>테이블</CafeInfoItemTitle>
              {getStars(reviewStore.tableSize)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>
              {getTablePhrase(reviewStore.tableSize as '1' | '2' | '3' | '4')}
            </CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
        <CafeInfoItemWrapper>
          <Ic_wifi />
          <CafeInfoItemDescsWrapper>
            <CafeInfoItemDescWrapper>
              <CafeInfoItemTitle>와이파이</CafeInfoItemTitle>
              {getStars(reviewStore.wifi)}
            </CafeInfoItemDescWrapper>
            <CafeInfoItemDesc>
              {getWifiPhrase(reviewStore.wifi as '1' | '2' | '3' | '4')}
            </CafeInfoItemDesc>
          </CafeInfoItemDescsWrapper>
        </CafeInfoItemWrapper>
      </CafeInfoList>
    </CafeInfoWrapper>
  )
}

export default CafePointsSection
