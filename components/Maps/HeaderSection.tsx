import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { useAtom } from 'jotai'
import { IStore, searchListsAtom } from 'store'

import Search from '@components/Home/Search'
import Ic_Logo from '@public/logo_black.svg'

import {
  FilterItem,
  FilterWrapper,
  Wrapper
} from './styles/HeaderSectionStyles'
import { Logo } from '@components/common/Common'
import styled from 'styled-components'

const HeaderSection = ({ hasFilter }: { hasFilter: boolean }) => {
  const [cafes, setCafes] = useAtom(searchListsAtom)
  const [, setSortMode] = useState(0)

  const sortByOnAir = () => {
    setSortMode(1)
    if (cafes) {
      const f_cafes: IStore[] = cafes?.filter((cafe) =>
        cafe.businessHoursInfoDto.isOpen ? true : false
      )
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
      setCafes(Cafes)
    }

    function error() {
      alert('Sorry, no position available.')
    }
    const watchId = navigator.geolocation.watchPosition(success, error, options)
  }
  const sortByRecommend = () => {
    setSortMode(3)
    if (cafes) {
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
      setCafes(Cafes)
    }
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <Link href="/">
          <a>
            <Ic_Logo />
          </a>
        </Link>
        <SendOpinion href="/" target="_blank">
          의견 보내기
        </SendOpinion>
      </HeaderWrapper>
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

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SendOpinion = styled.a`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey700};
`

export default HeaderSection
