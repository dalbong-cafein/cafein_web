/* eslint-disable react-hooks/exhaustive-deps */
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

interface MapLayoutProps {
  children: JSX.Element
  store: CafeInfoInterface
  reviewStore: CafeRewviewPointInterface
  nearStores: INearCafe[]
}

const MapLayout = ({ children, store }: MapLayoutProps) => {
  const router = useRouter()
  const [isDimmed, setIsDimmed] = useAtom(isDimmedAtom)
  const [map, setMap] = useAtom(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const { search } = router.query
  const [inputs, setInputs] = useAtom(searchInputAtom)

  console.log(children.props, 'hello', router.query)

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
      } else {
        // setMarkers(
        //   getMapItems(
        //     map,
        //     cafeDatas?.slice(0, 15) as IStore[],
        //     Number(storeId) as number,
        //     router
        //   )
        // )
      }
      // setCafes(cafeDatas)
    }
    if ((!inputs && search) || inputs !== search) {
      if (store) {
        setInputs(store.storeName)
      } else {
        setInputs(search as string)
      }
    }
    return () => {
      markers.forEach((marker) => marker.setMap(null))
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
          <HeaderSection hasFilter={false} />
          {children}
        </MainWrapper>
        {/* {storeId ? (
        <>
          <DetailWrapper>
            <DetailCafe isSingle={false} />
          </DetailWrapper>
          <Link href={{ pathname: 'maps', query: { search } }} shallow>
            <FlexA>
              <CloseButton isSingle={false} />
            </FlexA>
          </Link>
        </>
      ) : (
        ''
      )} */}
        <Map isSingle={true} store={store} />
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
