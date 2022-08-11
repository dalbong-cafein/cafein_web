import { useAtom } from 'jotai'
import { ReactElement, useEffect, useState } from 'react'
import MapLayout from '../../components/Maps/MapLayout'
import { searchInputAtom, searchListsAtom } from '../../store'
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
import { Ddabong } from '../../components/common/Common'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import getHours from '../../utils/getHours'
import { useRouter } from 'next/router'
import Search from '../../components/Home/Search'

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
  const router = useRouter()
  const [isOpenDetail, setIsOpenDetail] = useState(false)
  useEffect(() => {
    if (search && search !== inputs) {
      setInputs(search)
    }
    console.log(search, inputs, '열렸녀??')
  }, [router])
  return (
    <>
      <Search />
      <FilterWrapper>
        <FilterItem>영업중</FilterItem>
        <FilterItem>가까운순</FilterItem>
        <FilterItem>추천순</FilterItem>
      </FilterWrapper>
      <CafeListWrapper>
        <CafeList>
          {cafeDatas
            ? cafeDatas.map((cafe) => (
                <CurrentPopularItem
                  key={cafe.storeId}
                  onClick={() => setIsOpenDetail(true)}
                >
                  <Link
                    href={{
                      pathname: 'maps',
                      query: { cafeId: cafe.storeId, storeName: cafe.storeName }
                    }}
                    as={`/maps?search=${search}&storeName=${cafe.storeName}`}
                    shallow
                    replace
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
  cursor: pointer;
`

const CafeListWrapper = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.grey100};
`

const CafeList = styled.ul`
  display: flex;
  flex-direction: column;

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
