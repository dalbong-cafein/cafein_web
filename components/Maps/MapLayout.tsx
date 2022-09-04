import initMap from '@utils/initMap'
import { getMapItems } from '@utils/MapUtils'
import { useAtom, useAtomValue } from 'jotai'
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
  searchInputAtom,
  toastAtom,
  userLocationAtom
} from 'store'

import DimmedAlert from '../common/DimmedAlert'

import HeaderSection from './HeaderSection'
import Map from './Map'
import { MainWrapper, SubWrapper } from './styles/styles'
import DetailCafe from '@components/MapsParams/DetailCaffe'
import Toast from '@components/common/Toast'
import useSWR from 'swr'
import getIpAddress from '@utils/getIpIddress'
import axios from 'axios'

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
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const isToasted = useAtomValue(toastAtom)
  const { search, storeId } = router.query
  const isDetail = router.route === '/maps/storeId/[storeId]'
  const isSuggestion = router.query.sggNm

  const [userLocation, setUserLocation] = useAtom(userLocationAtom)

  const { data: ip } = useSWR('ip', getIpAddress)

  useEffect(() => {
    if (ip && !userLocation) {
      const fetch = async () => {
        const location = await axios({
          url: '/api/getGeolocation',
          method: 'GET',
          params: { ip }
        })
        setUserLocation(() => {
          return { latY: location.data.data.lat, lngX: location.data.data.long }
        })
      }
      fetch()
    }
  }, [ip])

  useEffect(() => {
    if (userLocation && !map) {
      setMap(
        initMap.init(
          userLocation as {
            latY: number
            lngX: number
          }
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation])

  useEffect(() => {
    markers.forEach((marker) => {
      marker.setMap(null)
    })
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
          {isToasted ? <Toast /> : ''}
          {isSuggestion ? '' : <HeaderSection hasFilter={!isDetail} />}
          {children}
        </MainWrapper>
        <SubWrapper isDisplay={storeId && !isDetail ? true : false}>
          {storeId && !isDetail ? (
            <DetailCafe storeId={storeId as string} />
          ) : (
            ''
          )}
        </SubWrapper>
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
