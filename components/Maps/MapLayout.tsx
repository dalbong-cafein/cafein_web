import initMap from '@utils/initMap'
import { getMapItems } from '@utils/MapUtils'
import { useAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  CafeInfoInterface,
  CafeRewviewPointInterface,
  INearCafe,
  isDimmedAtom,
  mapAtom,
  mapMarkerList,
  searchInputAtom
} from 'store'

import DimmedAlert from '../common/DimmedAlert'

import HeaderSection from './HeaderSection'
import Map from './Map'
import { MainWrapper } from './styles/styles'
import DetailCafe from '@components/MapsParams/DetailCaffe'

interface MapLayoutProps {
  children: JSX.Element
  store?: CafeInfoInterface
  reviewStore?: CafeRewviewPointInterface
  nearStores?: INearCafe[]
}

const MapLayout = ({ children, store }: MapLayoutProps) => {
  const router = useRouter()
  const [isDimmed, setIsDimmed] = useAtom(isDimmedAtom)
  const [map, setMap] = useAtom(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const { search, storeId } = router.query
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const isDetail = router.route === '/maps/storeId/[storeId]'
  const isSuggestion = router.query.sggNm

  useEffect(() => {
    if (!map && search) setMap(initMap.init(search as string))
    else if (!map) setMap(initMap.init(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (map) {
      if (store) {
        setMarkers(
          getMapItems(map, [store], Number(store.storeId) as number, router)
        )
      }
    }
    if (search && inputs !== search) {
      if (store) {
        setInputs(store.storeName)
      } else {
        setInputs(search as string)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, map])

  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      {isDimmed ? <DimmedAlert setIsDimmed={setIsDimmed} /> : ''}
      <MapWrapper>
        <MainWrapper>
          {isSuggestion ? '' : <HeaderSection hasFilter={!isDetail} />}
          {children}
        </MainWrapper>
        {storeId && !isDetail ? (
          <MainWrapper>
            <DetailCafe storeId={storeId as string} />
          </MainWrapper>
        ) : (
          ''
        )}
        <Map isSingle={isDetail} />
      </MapWrapper>
    </>
  )
}

const MapWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

export default MapLayout
