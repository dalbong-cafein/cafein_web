import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { ParsedUrlQuery } from 'querystring'

import { cafeInfoAtom, IStore, mapMarkerList, searchInputAtom } from 'store'

import CafeInfoSection from '@components/MapsParams/CafeInfoSection'
import ImageSection from '@components/MapsParams/ImageSection'
import RecommendSection from '@components/MapsParams/RecommendSection'
import AnnounceSection from '@components/MapsParams/AnnounceSection'

import { CafeInfoInterface, CafeRewviewPointInterface, INearCafe } from 'store'
import CafePointsSection from '@components/MapsParams/CafePointsSection'
import CongestionSection from '@components/MapsParams/CongestionSection'
import NearCafeSection from '@components/MapsParams/NearCafeSection'
import Footer from '@components/Home/Footer'

import Ic_clear from '@public/ic_clear.svg'

import MapLayout from '@components/Maps/MapLayout'
import { NextPageWithLayout } from 'pages/_app'
import { CafeWrapper } from '@components/MapsParams/styles/styles'
import { CloseImage } from '@components/common/CloseButton'
import { useAtomValue, useSetAtom } from 'jotai'
import useSWR from 'swr'
import { fetchCafeInfo, fetchCafeNears } from 'apis/apis'
import useWindowSize from 'hooks/useWindowSize'

const DetailStorePage: NextPageWithLayout = ({
  store,
  reviewStore,
  nearStores
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [cafeReviewPercent, setCafeReviewPercent] = useState<null | number>(
    null
  )
  const { data: n_store } = useSWR<CafeInfoInterface>(
    `stores/${store.storeId}`,
    fetchCafeInfo
  )
  const { data: n_nearStores } = useSWR<INearCafe[]>(
    `${store.storeId}/near-stores`,
    fetchCafeNears
  )
  const WrapperRef = useRef<HTMLDivElement>(null)
  const markers = useAtomValue(mapMarkerList)
  const setCafeInfo = useSetAtom(cafeInfoAtom)
  const setSearchInput = useSetAtom(searchInputAtom)
  const { width, height } = useWindowSize()

  useEffect(() => {
    WrapperRef.current?.scrollTo(0, 0)
    markers.forEach((marker) => {
      marker.setMap(null)
    })
    setCafeInfo(store)
    setSearchInput(store.storeName)
  }, [store])

  const isSingle = true

  return (
    <>
      <Head>
        <title>카페인 | {store.storeName}</title>
      </Head>
      <CafeWrapper ref={WrapperRef} isSingle={isSingle}>
        {store.storeImageList.length > 0 ? <ImageSection store={store} /> : ''}
        {n_store ? (
          <CafeInfoSection store={n_store as CafeInfoInterface} />
        ) : (
          <CafeInfoSection store={store} />
        )}

        <CafePointsSection
          reviewStore={reviewStore}
          cafeReviewPercent={cafeReviewPercent}
        />

        <RecommendSection
          store={store}
          setCafeReviewPercent={setCafeReviewPercent}
        />

        <CongestionSection />
        {n_nearStores && n_store ? (
          <NearCafeSection
            store={n_store as CafeInfoInterface}
            nearStores={n_nearStores as INearCafe[]}
          />
        ) : (
          <NearCafeSection store={store} nearStores={nearStores} />
        )}

        <AnnounceSection />

        <Footer isHome={false} />
      </CafeWrapper>
      {(width as number) <= 900 ? (
        ''
      ) : (
        <Link
          href={{
            pathname: '/maps'
          }}
        >
          <CloseImage isSingle={isSingle}>
            <Ic_clear />
          </CloseImage>
        </Link>
      )}
    </>
  )
}

DetailStorePage.getLayout = function getLayout(
  page: ReactElement,
  pageProps: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <MapLayout
      store={pageProps.store}
      reviewStore={pageProps.reviewStore}
      nearStores={pageProps.nearStores}
    >
      {page}
    </MapLayout>
  )
}

interface IextendedParams extends ParsedUrlQuery {
  storeId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { data: stores }
  } = await axios.get(`${process.env.API_DOMAIN}/web/stores?`)
  const paths = (stores as IStore[]).map((store: IStore) => ({
    params: { storeId: store.storeId.toString() }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { storeId } = params as IextendedParams
  const {
    data: { data: storeData }
  } = await axios.get(`${process.env.API_DOMAIN}/stores/${storeId}`)

  const {
    data: { data: storeReviewData }
  } = await axios.get(
    `${process.env.API_DOMAIN}/stores/${storeId}/detail-review-score`
  )

  const {
    data: { data: nearData }
  } = await axios.get(
    `${process.env.API_DOMAIN}/web/stores/${storeId}/near-stores`
  )

  const store: CafeInfoInterface = storeData
  const reviewStore: CafeRewviewPointInterface = storeReviewData
  const nearStores: INearCafe[] = nearData

  return {
    props: { store, reviewStore, nearStores }
  }
}

export default DetailStorePage
