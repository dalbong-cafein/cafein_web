import { useEffect, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import { useAtom } from 'jotai'
import axios from 'axios'

import {
  isDimmedAtom,
  IStore,
  mapAtom,
  mapMarkerList,
  searchInputAtom
} from '../../store'

import ErrorComponent from '../../components/common/ErrorComponent'
import HeaderSection from '../../components/Maps/HeaderSection'
import ShortCafeItem from '../../components/Maps/ShortCafeItem'
import DetailCafe from '../../components/MapsParams/DetailCaffe'
import Map from '../../components/Maps/Map'
import DimmedAlert from '../../components/common/DimmedAlert'
import CloseButton from '../../components/common/CloseButton'

import {
  CafeList,
  DetailWrapper,
  MainWrapper
} from '../../components/Maps/styles/styles'

import initMap from '../../utils/initMap'
import { getMapItems } from '../../utils/MapUtils'

const Maps: NextPage = ({
  search,
  cafeDatas
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [map, setMap] = useAtom(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const router = useRouter()
  const { storeId } = router.query
  const [cafes, setCafes] = useState(cafeDatas)
  const [inHoverClose, setInHoverClose] = useState(false)
  const isSingle = cafeDatas?.length === 1 ? true : false
  const [isDimmed, setIsDimmed] = useAtom(isDimmedAtom)
  const isEmpty = cafeDatas?.length === 0 ? true : false

  useEffect(() => {
    if (cafeDatas?.length === 1) {
      router.push({
        pathname: `maps`,
        query: {
          search,
          storeId: (cafeDatas[0] as IStore).storeId
        }
      })
    }

    if (!map && search) setMap(initMap.init(search as string))
    else if (!map) setMap(initMap.init(''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if ((!inputs && search) || inputs !== search) setInputs(search as string)
    return () => {
      markers.forEach((marker) => marker.setMap(null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, map])

  return (
    <>
      {/* {cafeDatas ? (
        <>
          {cafeDatas.length === 1 ? (
            <>
              <MainWrapper>
                <HeaderSection hasFilter={false} />
                <DetailCafe isSingle={true} />
              </MainWrapper>
              <Link href="/maps" passHref>
                <CloseButton
                  inHoverClose={inHoverClose}
                  setInHoverClose={setInHoverClose}
                  isSingle={true}
                />
              </Link>
            </>
          ) : (
            <>
              <MainWrapper>
                <HeaderSection hasFilter={true} />
                <CafeList>
                  {cafes ? (
                    cafes.length === 0 ? (
                      <ErrorComponent storeName={search} />
                    ) : (
                      cafes
                        .slice(0, 15)
                        .map((cafe: IStore) => (
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
              </MainWrapper>
              {storeId ? (
                <>
                  <DetailWrapper>
                    <DetailCafe isSingle={false} />
                  </DetailWrapper>
                  <Link passHref href={{ pathname: 'maps', query: { search } }}>
                    <CloseButton
                      inHoverClose={inHoverClose}
                      setInHoverClose={setInHoverClose}
                      isSingle={false}
                    />
                  </Link>
                </>
              ) : (
                ''
              )}
            </>
          )}
          <Map isSingle={cafeDatas.length === 1 ? true : false} />
        </>
      ) : (
        <>
          <MainWrapper>
            <HeaderSection hasFilter={true} />
            <CafeList>
              {cafes ? (
                cafes.length === 0 ? (
                  <ErrorComponent storeName={search} />
                ) : (
                  cafes
                    .slice(0, 15)
                    .map((cafe: IStore) => (
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
          </MainWrapper>
          <Map isSingle={true} />
        </>
      )} */}
      <Head>
        <title>카페인 | {search ? search : '지도'}</title>
      </Head>
      {isDimmed ? <DimmedAlert setIsDimmed={setIsDimmed} /> : ''}
      <MainWrapper>
        <HeaderSection hasFilter={!isSingle} />
        {isSingle ? (
          <DetailCafe isSingle={isSingle} />
        ) : isEmpty || !cafeDatas ? (
          <ErrorComponent storeName={search} />
        ) : (
          <CafeList>
            {cafes &&
              cafes
                .slice(0, 15)
                .map((cafe: IStore) => (
                  <ShortCafeItem
                    router={router}
                    cafe={cafe}
                    storeId={storeId as string}
                    key={cafe.storeId}
                  />
                ))}
          </CafeList>
        )}
      </MainWrapper>
      {!isSingle && !isEmpty && storeId ? (
        <>
          <DetailWrapper>
            <DetailCafe isSingle={isSingle} />
          </DetailWrapper>
          <Link passHref href={{ pathname: 'maps', query: { search } }}>
            <CloseButton isSingle={isSingle} />
          </Link>
        </>
      ) : (
        ''
      )}
      <Map isSingle={isSingle} />
    </>
  )
}

// Maps.getLayout = function getLayout(page: ReactElement) {
//   return <MapLayout>{page}</MapLayout>
// }

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
