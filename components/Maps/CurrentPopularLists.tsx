import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
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
  const ddabong = '/images/ddabong.svg'
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
            <DdabongWrap>
              <Image
                src={ddabong}
                width={16}
                height={16}
                alt="엄지척뱃지"
                layout="fixed"
              />
            </DdabongWrap>
          </CurrentPopularItem>
        </Link>
      </CurrentPopularList>
    </CurrentPopularWrapper>
  )
}
