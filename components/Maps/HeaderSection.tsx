import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useAtom } from 'jotai'
import { IStore, searchListsAtom } from '../../store'

import { Logo } from '../common/Common'
import Search from '../Home/Search'

import {
  FilterItem,
  FilterWrapper,
  Wrapper
} from './styles/HeaderSectionStyles'

const HeaderSection = ({ hasFilter }: { hasFilter: boolean }) => {
  const [cafes, setCafes] = useAtom(searchListsAtom)
  const [sortMode, setSortMode] = useState(0)

  const sortByOnAir = () => {
    setSortMode(1)
    if (cafes) {
      const f_cafes: IStore[] = cafes?.filter((cafe) =>
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
      const Cafes = cafes
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
    if (cafes) {
      console.log(cafes)
      const Cafes = cafes
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
  return (
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
      {hasFilter ? (
        <FilterWrapper>
          <FilterItem onClick={sortByOnAir}>영업중</FilterItem>
          <FilterItem onClick={sortByClosest}>가까운순</FilterItem>
          <FilterItem onClick={sortByRecommend}>추천순</FilterItem>
        </FilterWrapper>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

export default HeaderSection
