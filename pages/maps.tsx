import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import useMap from '../common/hooks/useMap'
import ddabong from '../public/images/ddabong.svg'

const MapPage: NextPage = () => {
  useMap()
  return (
    <>
      <MainWrapper>
        <SearchWrapper>
          <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
          <SearchButton>검색</SearchButton>
        </SearchWrapper>
        <RegionWrapper>
          <RegionTitle>지역별 카공하기 좋은 카페</RegionTitle>
          <RegionList role={'tablist'}>
            <Link href="/map">
              <RegionItem role={'tab'}>
                <RegionItemImage
                  src={'https://nextjs.org/static/images/learn.png'}
                  width={220}
                  height={160}
                  layout="fixed"
                  alt="사당"
                />
                <RegionItemTitle>사당</RegionItemTitle>
              </RegionItem>
            </Link>
            <Link href="/map">
              <RegionItem role={'tab'}>
                <RegionItemImage
                  src={'https://nextjs.org/static/images/learn.png'}
                  width={220}
                  height={160}
                  layout="fixed"
                  alt="사당"
                />
                <RegionItemTitle>사당</RegionItemTitle>
              </RegionItem>
            </Link>
            <Link href="/map">
              <RegionItem role={'tab'}>
                <RegionItemImage
                  src={'https://nextjs.org/static/images/learn.png'}
                  width={220}
                  height={160}
                  layout="fixed"
                  alt="사당"
                />
                <RegionItemTitle>사당</RegionItemTitle>
              </RegionItem>
            </Link>
            <Link href="/map">
              <RegionItem role={'tab'}>
                <RegionItemImage
                  src={'https://nextjs.org/static/images/learn.png'}
                  width={220}
                  height={160}
                  layout="fixed"
                  alt="사당"
                />
                <RegionItemTitle>사당</RegionItemTitle>
              </RegionItem>
            </Link>
            <Link href="/map">
              <RegionItem role={'tab'}>
                <RegionItemImage
                  src={'https://nextjs.org/static/images/learn.png'}
                  width={220}
                  height={160}
                  layout="fixed"
                  alt="사당"
                />
                <RegionItemTitle>사당</RegionItemTitle>
              </RegionItem>
            </Link>
          </RegionList>
        </RegionWrapper>
        <CurrentPopularWrapper>
          <CurrentPopularTitle>최근 인기 있는 카페</CurrentPopularTitle>
          <CurrentPopularList>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
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
                이곳엔 지역이 들어가이곳엔 지역이 들어가이곳엔 지역이
                들어가이곳엔 지역이 들어가
              </CurrentPopularItemLocation>
              <OnAirWrapper>
                <OnAirBadge>영업중</OnAirBadge>
                <OpeningTime>오전 11:30 에 영업 종료</OpeningTime>
              </OnAirWrapper>
              <DdabongWrap>
                <Image src={ddabong} alt="엄지척뱃지" layout="fixed" />
              </DdabongWrap>
            </CurrentPopularItem>
          </CurrentPopularList>
        </CurrentPopularWrapper>
      </MainWrapper>
      <MapBox id="map"></MapBox>
    </>
  )
}

const MainWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 117px;
  width: 100%;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.grey50};
  max-width: ${(props) => props.theme.widthes.maxBarList}px;
  min-width: ${(props) => props.theme.widthes.minBarList}px;
  z-index: 9999;
`

const SearchWrapper = styled.form`
  display: flex;
  flex-direction: row;
`

const SearchInput = styled.input`
  width: 530px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey100};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  padding: 0 20px;
`

const SearchButton = styled.button`
  width: 86px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.orange400};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  color: ${(props) => props.theme.colors.white};
  margin-left: 16px;
`
const RegionWrapper = styled.div`
  margin-top: 30px;
`

const RegionTitle = styled.h1`
  font-size: ${(props) => props.theme.fontsizes.font19}rem;
`

const RegionList = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  ${(props) => props.theme.mixins.scroll_x}
`
const RegionItem = styled.a`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 212px;
  margin-bottom: 12px;
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px;
`
const RegionItemImage = styled(Image)`
  border-top-left-radius: ${(props) => props.theme.borderRadius.border12}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const RegionItemTitle = styled.p`
  padding: 16px 20px 20px;
  border-bottom-left-radius: ${(props) => props.theme.borderRadius.border12}px;
  border-bottom-right-radius: ${(props) => props.theme.borderRadius.border12}px;
  background-color: ${(props) => props.theme.colors.white};
`

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

const MapBox = styled.div`
  width: 100vw;
  height: calc(100vh - 117px);
`

export default MapPage
