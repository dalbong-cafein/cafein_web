import { useAtom } from 'jotai'
import { ReactElement, useEffect, useState } from 'react'
import MapLayout from '../../components/Maps/MapLayout'
import {
  isDimmedAtom,
  IStore,
  mapAtom,
  mapMarkerList,
  searchInputAtom,
  searchListsAtom
} from '../../store'
import { NextPageWithLayout } from '../_app'
import styled from 'styled-components'
import Link from 'next/link'
import {
  CurrentPopularItem,
  CurrentPopularItemLocation,
  CurrentPopularItemTitle,
  DdabongWrap,
  OnAirBadge,
  OnAirWrapper,
  OpeningTime
} from '../../components/Maps/styles/CurrentPopularStyles'
import { Ddabong, Logo } from '../../components/common/Common'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import getHours from '../../utils/getHours'
import { useRouter } from 'next/router'
import Search from '../../components/Home/Search'
import Image from 'next/image'
import { getMapCenterByInputs, getMapItems } from '../../utils/MapUtils'
import initMap from '../../utils/initMap'
import ErrorComponent from '../../components/common/ErrorComponent'

const Maps: NextPageWithLayout<{
  search?: string
  cafeDatas?: IStore[]
}> = ({ search, cafeDatas }) => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [map, setMap] = useAtom(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const router = useRouter()
  const { storeId } = router.query
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  const [sortMode, setSortMode] = useState(0)
  const [cafes, setCafes] = useState<IStore[] | undefined>(cafeDatas)
  console.log(router.query, '야 신기한거 보여줌', cafeDatas)

  const sortByOnAir = () => {
    setSortMode(1)
    if (cafeDatas) {
      const f_cafes: IStore[] = cafeDatas?.filter((cafe) =>
        cafe.businessHoursInfoDto.isOpen ? true : false
      )
      console.log(f_cafes, '얘넨 영업중이래')
    }
  }
  const sortByClosest = () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    }

    function success(position: GeolocationPosition) {
      const Cafes = cafeDatas
      Cafes?.sort((a, b) => {
        const totA =
          a.latY - position.coords.latitude + a.lngX - position.coords.longitude
        const totB =
          b.latY - position.coords.latitude + b.lngX - position.coords.longitude
        return totA - totB
      })
      console.log(Cafes, '위치순 정렬이다 이것들아!')
      setCafes(Cafes)
    }

    function error() {
      alert('Sorry, no position available.')
    }
    const watchId = navigator.geolocation.watchPosition(success, error, options)
    console.log(watchId)
  }
  const sortByRecommend = () => {
    setSortMode(3)
    if (cafeDatas) {
      const Cafes = cafeDatas
      Cafes?.sort((a, b) => {
        if (a.recommendPercent && b.recommendPercent) {
          return b.recommendPercent - a.recommendPercent
        } else if (a.recommendPercent) {
          return -1
        } else if (b.recommendPercent) {
          return 1
        }
        return 0
      })
      console.log(Cafes, '추천순 정렬이다 이것들아!!')
      setCafes(Cafes)
    }
  }

  useEffect(() => {
    if (!inputs && search) setInputs(search as string)
    if (!map && search) setMap(initMap.init(search as string))
    else if (!map) setMap(initMap.init(''))
  }, [])

  useEffect(() => {
    console.log(search, inputs, '뭐야 ??')
    if (map) {
      console.log('하이 그;얌둥이 카페들', cafeDatas)
      if (cafeDatas) {
        setMarkers(
          getMapItems(
            map,
            cafeDatas as IStore[],
            Number(storeId) as number,
            router
          )
        )
        console.log(cafeDatas, '변경 끝!')
      }
    }
  }, [router, map])
  return (
    <>
      <Wrapper>
        <Link href="/">
          <Logo>
            <Image
              src="/images/logo_black.svg"
              width={103}
              height={22}
              alt="로고"
            />
          </Logo>
        </Link>
        <Search />
        <FilterWrapper>
          <FilterItem onClick={sortByOnAir}>영업중</FilterItem>
          <FilterItem onClick={sortByClosest}>가까운순</FilterItem>
          <FilterItem onClick={sortByRecommend}>추천순</FilterItem>
        </FilterWrapper>
      </Wrapper>
      <CafeList>
        {cafes ? (
          cafes.length === 0 ? (
            <ErrorComponent storeName={search} />
          ) : (
            cafes.slice(0, 15).map((cafe) => (
              <CurrentPopularItem
                key={cafe.storeId}
                onClick={() => setIsOpenDetail(true)}
                isClicked={
                  storeId && (storeId as string) === String(cafe.storeId)
                    ? true
                    : false
                }
                onMouseOver={() => {
                  if (
                    (cafe.marker?.getIcon() as { content: string }).content ===
                    `<div class="marker active">${cafe.storeName}</div>`
                  )
                    return
                  cafe.marker?.setIcon({
                    content: `<div class="marker over">${cafe.storeName}</div>`
                  })
                }}
                onMouseOut={() => {
                  if (
                    (cafe.marker?.getIcon() as { content: string }).content ===
                    `<div class="marker active">${cafe.storeName}</div>`
                  )
                    return
                  cafe.marker?.setIcon({
                    content: `<div class="marker">${cafe.storeName}</div>`
                  })
                }}
              >
                <Link
                  href={{
                    pathname: 'maps',
                    query: {
                      search,
                      storeId: cafe.storeId,
                      storeName: cafe.storeName
                    }
                  }}
                  as={`maps?search=${search}&storeId=${cafe.storeId}`}
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
                        {Ddabong} {Math.floor(cafe.recommendPercent) + '%'}
                      </DdabongWrap>
                    ) : (
                      ''
                    )}
                  </a>
                </Link>
              </CurrentPopularItem>
            ))
          )
        ) : (
          <ErrorComponent />
        )}
      </CafeList>
    </>
  )
}

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
`

const FilterWrapper = styled.ul`
  display: flex;
  gap: 6px;
  padding: 0 24px 16px;
`

const FilterItem = styled.li`
  border: 1px solid ${(props) => props.theme.colors.grey200};
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey800};
  padding: 8px 12px;
  cursor: pointer;
`

const CafeList = styled.ul`
  border-top: 1px solid ${(props) => props.theme.colors.grey100};
  display: flex;
  flex-direction: column;
  height: calc(100vh - 185.03px);
  overflow-y: auto;

  & li:not(:first-child)::after {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    top: 0;
    border-top: 1px solid ${(props) => props.theme.colors.grey100};
  }
  & li {
    padding: 20px 24px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
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
      const data: IStore[] = res.data.data
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
