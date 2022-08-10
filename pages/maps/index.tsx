import { useAtom } from 'jotai'
import { Props } from 'next/script'
import { ReactElement, useEffect, useState } from 'react'
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
  onEnterPress,
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
import { GetServerSideProps } from 'next'
import axios from 'axios'
import getHours from '../../utils/getHours'
import { useRouter } from 'next/router'

interface CafeListsProps {
  storeId: number
  storeName: string
  fullAddress: string
  recommendPercent: null | number
  businessHoursInfoDto: {
    isOpen: boolean
    closed: string
    tmrOpen: string
  }
  lngX: number
  latY: number
  storeImageDto: {
    imageId: number
    imageUrl: string
  }
}

const Maps: NextPageWithLayout<{
  search?: string
  cafeDatas?: CafeListsProps[]
}> = ({ search, cafeDatas }) => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [isClicked, setIsClicked] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout>()
  const [searchLists, setSearchLists] = useAtom(searchListsAtom)
  const router = useRouter()

  useEffect(() => {
    if (!inputs && search) {
      setInputs(search)
    }
  }, [])
  return (
    <>
      <SearchListInputWrapper>
        <InputWrapper>
          <SearchListInput
            placeholder="카페 이름이나 지하철역을 검색해보세요"
            value={inputs}
            onChange={(e) => {
              useHandleInputs({ e, setInputs, timer, setTimer, setSearchLists })
              if (!isClicked) setIsClicked(true)
            }}
            onFocus={() => setIsClicked(true)}
            onBlur={() => setIsClicked(false)}
            onKeyDown={(e) => {
              onEnterPress(e, inputs, router)
              setIsClicked(false)
            }}
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
      <FilterWrapper>
        <FilterItem>영업중</FilterItem>
        <FilterItem>가까운순</FilterItem>
        <FilterItem>추천순</FilterItem>
      </FilterWrapper>
      <CafeListWrapper>
        <CafeList>
          {cafeDatas
            ? cafeDatas.map((cafe) => (
                <CurrentPopularItem>
                  <Link
                    href={{ pathname: 'maps', query: { cafeId: cafe.storeId } }}
                    as={`/maps/${cafe.storeName}`}
                  >
                    <a>
                      <CurrentPopularItemTitle>
                        {cafe.storeName}
                      </CurrentPopularItemTitle>
                      <CurrentPopularItemLocation>
                        {cafe.fullAddress}
                      </CurrentPopularItemLocation>
                      <OnAirWrapper>
                        <OnAirBadge>
                          {cafe.businessHoursInfoDto.isOpen
                            ? '영업중'
                            : '영업종료'}
                        </OnAirBadge>
                        <OpeningTime>
                          {cafe.businessHoursInfoDto.closed
                            ? getHours(cafe.businessHoursInfoDto.closed) +
                              '에 영업 종료'
                            : '정보 없음'}
                        </OpeningTime>
                      </OnAirWrapper>
                      {cafe.recommendPercent ? (
                        <DdabongWrap>
                          {Ddabong} {cafe.recommendPercent + '%'}
                        </DdabongWrap>
                      ) : (
                        ''
                      )}
                    </a>
                  </Link>
                </CurrentPopularItem>
              ))
            : ''}
        </CafeList>
      </CafeListWrapper>
    </>
  )
}

const FilterWrapper = styled.ul`
  display: flex;
  gap: 6px;
  padding: 10px 24px;
  margin-top: 6px;
`

const FilterItem = styled.li`
  border: 1px solid ${(props) => props.theme.colors.grey200};
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey800};
  padding: 8px 12px;
`

const CafeListWrapper = styled.div`
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.search) {
    const { search } = query
    try {
      const res = await axios(
        `${process.env.API_DOMAIN}/web/stores?keyword=${encodeURI(
          search as string
        )}`
      )
      const data: CafeListsProps[] = res.data.data
      return {
        props: {
          search,
          cafeDatas: data
        }
      }
    } catch (error) {
      console.error('또 실패다!', error)
      return {
        props: { search }
      }
    }
  }
  return {
    props: {}
  }
}

export default Maps
