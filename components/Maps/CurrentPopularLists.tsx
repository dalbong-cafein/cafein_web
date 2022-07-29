import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

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

const CurrentPopularWrapper = styled.div`
  margin-top: 30px;
`

const CurrentPopularTitle = styled.h2`
  font-size: ${(props) => props.theme.fontsizes.font19}rem;
`

const CurrentPopularList = styled.ul`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
`

const CurrentPopularItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  max-width: 200px;
`

const CurrentPopularItemImage = styled(Image)`
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const CurrentPopularItemRegion = styled.p`
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  background-color: ${(props) => props.theme.colors.grey50};
  position: absolute;
  left: 16px;
  top: 16px;
  padding: 8px 10px;
`

const CurrentPopularItemTitle = styled.p`
  ${(props) => props.theme.mixins.ellipse}
  margin-top: 12px;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

const CurrentPopularItemLocation = styled.p`
  ${(props) => props.theme.mixins.ellipse}
  margin-top: 8px;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey600};
`

const OnAirWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

const OnAirBadge = styled.span`
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.orange500};
  font-weight: 400;
  border-radius: ${(props) => props.theme.borderRadius.border4}px;
  border: 0.8px solid ${(props) => props.theme.colors.orange500};
  padding: 3px 4px;
`

const OpeningTime = styled.span`
  margin-left: 8px;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey800};
`

const DdabongWrap = styled.span`
  margin-top: 8px;
`
