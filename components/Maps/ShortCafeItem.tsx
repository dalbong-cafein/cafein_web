import Link from 'next/link'
import { NextRouter } from 'next/router'

import { IStore } from 'store'

import {
  handleMouseOut,
  handleMouseOver
} from '@utils/ShortCafeItem/handleMouse'
import {
  ShortCafeItemList,
  ShortCafeItemLocation,
  ShortCafeItemTitle,
  DdabongWrap,
  OnAirBadge,
  OnAirWrapper,
  OpeningTime
} from './styles/ShortCafeStyles'
import getHours from '@utils/CafeInfo/getHours'
import styled from 'styled-components'
import { Ic_Like } from '@components/common/styles/CommonStyles'

interface IShortCafeItem {
  cafe: IStore
  storeId: string
  router: NextRouter
}

const ShortCafeItem = ({ cafe, storeId, router }: IShortCafeItem) => {
  return (
    <ShortCafeItemList
      key={cafe.storeId}
      isClicked={
        storeId && (storeId as string) === String(cafe.storeId) ? true : false
      }
      onMouseOver={() => handleMouseOver(cafe)}
      onMouseOut={() => handleMouseOut(cafe)}
    >
      <Link
        href={{
          pathname: router.pathname,
          query: {
            ...router.query,
            storeId: cafe.storeId
          }
        }}
      >
        <a>
          <ShortCafeItemTitle>{cafe.storeName}</ShortCafeItemTitle>
          <ShortCafeItemLocation>{cafe.fullAddress}</ShortCafeItemLocation>
          <OnAirWrapper>
            <OnAirBadge
              isOpen={cafe.businessHoursInfoDto.isOpen ? true : false}
            >
              {cafe.businessHoursInfoDto.isOpen ? '영업중' : '영업종료'}
            </OnAirBadge>
            <OpeningTime>
              {cafe.businessHoursInfoDto.closed
                ? getHours(cafe.businessHoursInfoDto.closed) + '에 영업 종료'
                : '정보 없음'}
            </OpeningTime>
          </OnAirWrapper>
          {cafe.recommendPercent ? (
            <DdabongWrap>
              {cafe.recommendPercent < 37.5 ? (
                <>
                  <Ic_Like color={'#646464'} />
                  <p style={{ color: '#646464' }}>아쉬워요</p>
                </>
              ) : cafe.recommendPercent < 75.1 ? (
                <>
                  <Ic_Like color={'#ff9800'} />
                  <p style={{ color: '#ff9800' }}>무난해요</p>
                </>
              ) : (
                <>
                  <Ic_Like color={'#26ba6a'} />
                  <p style={{ color: '#26ba6a' }}>추천해요</p>
                </>
              )}
            </DdabongWrap>
          ) : (
            ''
          )}
        </a>
      </Link>
    </ShortCafeItemList>
  )
}

export default ShortCafeItem
