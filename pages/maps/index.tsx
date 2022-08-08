import { useAtom } from 'jotai'
import { Props } from 'next/script'
import { ReactElement, useState } from 'react'
import CurrentPopularLists from '../../components/Maps/CurrentPopularLists'
import MapLayout from '../../components/Maps/MapLayout'
import RegionLists from '../../components/Maps/RegionLists'
import {
  HomeSearchLists,
  SearchList,
  SearchListDescs,
  SearchListInput,
  SearchListInputWrapper,
  SearchListPosition,
  SearchListStrong,
  SearchListTitle
} from '../../components/Maps/styles/FormStyles'
import {
  useHandleClearEvent,
  useHandleInputs
} from '../../utils/useSearchHandler'
import { searchInputAtom, searchListsAtom } from '../../store'
import { NextPageWithLayout } from '../_app'
import Image from 'next/image'
import {
  ClearButton,
  InputWrapper
} from '../../components/Home/styles/FormStyles'
import styled from 'styled-components'
import Link from 'next/link'
import {
  CurrentPopularItem,
  CurrentPopularItemImage,
  CurrentPopularItemLocation,
  CurrentPopularItemRegion,
  CurrentPopularItemTitle,
  DdabongWrap,
  OnAirBadge,
  OnAirWrapper,
  OpeningTime
} from '../../components/Maps/styles/CurrentPopularStyles'
import { Ddabong } from '../../components/common/Common'

const Maps: NextPageWithLayout<Props> = () => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [isClicked, setIsClicked] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [searchLists, setSearchLists] = useAtom(searchListsAtom)
  return (
    <>
      <SearchListInputWrapper>
        <InputWrapper>
          <SearchListInput
            placeholder="카페 이름이나 지하철역을 검색해보세요"
            value={inputs}
            onChange={(e) => {
              useHandleInputs({ e, setInputs, timer, setTimer, setSearchLists })
            }}
            onFocus={() => setIsClicked(true)}
            onBlur={() => setIsClicked(false)}
          />
          <ClearButton
            isInput={inputs === '' ? false : true}
            onClick={(e) =>
              useHandleClearEvent({ e, setInputs, setSearchLists })
            }
          />
        </InputWrapper>
        <HomeSearchLists
          isDisplay={searchLists.length !== 0 && isClicked ? true : false}
        >
          {searchLists.map((searchList) => {
            const rest_name = searchList.replace(inputs, '')
            return (
              <>
                <SearchList key={searchList}>
                  <Image
                    src={'/images/location.svg'}
                    width={24}
                    height={24}
                    alt="location IMG"
                  />
                  <SearchListDescs>
                    <SearchListTitle>
                      <SearchListStrong>{inputs}</SearchListStrong>
                      {rest_name}
                    </SearchListTitle>
                    <SearchListPosition>
                      서울특별서 마포구 양학로 45
                    </SearchListPosition>
                  </SearchListDescs>
                </SearchList>
              </>
            )
          })}
        </HomeSearchLists>
      </SearchListInputWrapper>
      <CafeListWrapper>
        <CafeList>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
          <CurrentPopularItem>
            <Link href="/maps">
              <a>
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
                <DdabongWrap>{Ddabong} 79%</DdabongWrap>
              </a>
            </Link>
          </CurrentPopularItem>
        </CafeList>
      </CafeListWrapper>
    </>
  )
}

const CafeListWrapper = styled.div`
  margin-top: 16px;
  border-top: 1px solid ${(props) => props.theme.colors.grey100};
`

const CafeList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 24px;

  & li:not(:first-child) {
    border-top: 1px solid ${(props) => props.theme.colors.grey100};
    padding-top: 20px;
  }
`

Maps.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export default Maps
