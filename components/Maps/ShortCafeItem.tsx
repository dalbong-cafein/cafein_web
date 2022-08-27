import Link from 'next/link'
import { NextRouter } from 'next/router'

import { IStore } from '../../store'

import common from '@components/common/Common'

import getHours from '../../utils/getHours'
import {
  handleMouseOut,
  handleMouseOver
} from '../../utils/ShortCafeItem/handleMouse'
import {
  ShortCafeItemList,
  ShortCafeItemLocation,
  ShortCafeItemTitle,
  DdabongWrap,
  OnAirBadge,
  OnAirWrapper,
  OpeningTime
} from './styles/ShortCafeStyles'

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
        // as={`maps?search=${search}&storeId=${cafe.storeId}`}
      >
        <a>
          <ShortCafeItemTitle>{cafe.storeName}</ShortCafeItemTitle>
          <ShortCafeItemLocation>{cafe.fullAddress}</ShortCafeItemLocation>
          <OnAirWrapper>
            <OnAirBadge>
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
              {common.Ic_like} {Math.floor(cafe.recommendPercent) + '%'}
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
