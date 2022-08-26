import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useAtom, useSetAtom } from 'jotai'

import axios from 'axios'

import { IStore, mapAtom, mapMarkerList, searchInputAtom } from '../../store'

import MapLayout from '../../components/Maps/MapLayout'
import ErrorComponent from '../../components/common/ErrorComponent'
import HeaderSection from '../../components/Maps/HeaderSection'
import ShortCafeItem from '../../components/Maps/ShortCafeItem'

import { CafeList } from '../../components/Maps/styles/styles'

import initMap from '../../utils/initMap'
import { getMapItems } from '../../utils/MapUtils'

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

  console.log(cafeDatas, '서버에서 찾아왔다')

  useEffect(() => {
    if (!inputs && search) setInputs(search as string)

    if (!map && search) setMap(initMap.init(search as string))
    else if (!map) setMap(initMap.init(''))
  }, [])

  useEffect(() => {
    if (map) {
      setMarkers(
        getMapItems(
          map,
          cafeDatas?.slice(0, 15) as IStore[],
          Number(storeId) as number,
          router
        )
      )
      setCafes(cafeDatas)
    }
    return () => {
      markers.forEach((marker) => marker.setMap(null))
    }
  }, [router, map])
  return (
    <>
      <HeaderSection hasFilter={true} />
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

Maps.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.search) {
    const { search } = query
    console.log(search, 'search')
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
