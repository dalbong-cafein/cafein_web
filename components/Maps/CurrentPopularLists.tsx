import Link from 'next/link'
import { Ddabong } from '../common/Common'
import {
  CurrentPopularItem,
  CurrentPopularItemImage,
  CurrentPopularItemLocation,
  CurrentPopularItemRegion,
  CurrentPopularItemTitle,
  CurrentPopularList,
  CurrentPopularTitle,
  CurrentPopularWrapper,
  DdabongWrap,
  OnAirBadge,
  OnAirWrapper,
  OpeningTime
} from './styles/styles'

export default function CurrentPopularLists() {
  return (
    <CurrentPopularWrapper>
      <CurrentPopularTitle>최근 인기 있는 카페</CurrentPopularTitle>
      <CurrentPopularList>
        <Link href="/maps">
          <CurrentPopularItem>
            <CurrentPopularItemImage
              src={'https://nextjs.org/static/images/learn.png'}
              width={200}
              height={160}
              layout="fixed"
            />
            <CurrentPopularItemRegion>서대문구</CurrentPopularItemRegion>
            <CurrentPopularItemTitle>
              투썸 플레이스 올림픽공원투썸 플레이스 올림픽공원투썸 플레이스
              올림픽공원
            </CurrentPopularItemTitle>
            <CurrentPopularItemLocation>
              이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔
              지역이 들어가
            </CurrentPopularItemLocation>
            <OnAirWrapper>
              <OnAirBadge>영업중</OnAirBadge>
              <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
            </OnAirWrapper>
            <DdabongWrap>{Ddabong}</DdabongWrap>
          </CurrentPopularItem>
        </Link>
      </CurrentPopularList>
    </CurrentPopularWrapper>
  )
}
