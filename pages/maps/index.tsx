import { useAtom } from 'jotai'
import { ReactElement, useEffect, useState } from 'react'
import MapLayout from '../../components/Maps/MapLayout'
import {
  IStore,
  mapAtom,
  mapMarkerList,
  searchInputAtom,
  searchListsAtom
} from '../../store'
import { NextPageWithLayout } from '../_app'
import styled from 'styled-components'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import getHours from '../../utils/getHours'
import { useRouter } from 'next/router'
import Search from '../../components/Home/Search'
import Image from 'next/image'
import { getMapCenterByInputs, getMapItems } from '../../utils/MapUtils'
import initMap from '../../utils/initMap'
import ErrorComponent from '../../components/common/ErrorComponent'
import HeaderSection from '../../components/Maps/HeaderSection'
import ShortCafeItem from '../../components/Maps/ShortCafeItem'

const Maps: NextPageWithLayout<{
  search?: string
  cafeDatas?: IStore[]
}> = ({ search, cafeDatas }) => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [map, setMap] = useAtom(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const router = useRouter()
  const { storeId } = router.query
  const [cafes, setCafes] = useState(cafeDatas)
  console.log(router.query, '야 신기한거 보여줌', cafeDatas, cafes)

  useEffect(() => {
    console.log('맵 아톰 잘 있냐??')
    console.log(map?.getElement())
    if (!inputs && search) setInputs(search as string)

    if (!map && search) setMap(initMap.init(search as string))
    else if (!map) setMap(initMap.init(''))
  }, [])

  useEffect(() => {
    if (map) {
      setMarkers(
        getMapItems(
          map,
          cafeDatas as IStore[],
          Number(storeId) as number,
          router
        )
      )
      setCafes(cafeDatas)
    }
  }, [router, map])
  return (
    <>
      <HeaderSection />
      <CafeList>
        {cafes ? (
          cafes.length === 0 ? (
            <ErrorComponent storeName={search} />
          ) : (
            cafes
              .slice(0, 15)
              .map((cafe) => (
                <ShortCafeItem
                  cafe={cafe}
                  storeId={storeId as string}
                  search={search as string}
                  key={cafe.storeId}
                />
              ))
          )
        ) : (
          <ErrorComponent />
        )}
      </CafeList>
    </>
  )
}

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
