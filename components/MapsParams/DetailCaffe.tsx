import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import useSWR from 'swr'
import axios from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import styled from 'styled-components'

import {
  cafeInfoAtom,
  CafeInfoInterface,
  CafeRecommendInterface,
  CafeRewviewPointInterface,
  INearCafe,
  moreAtom
} from 'store'
import CafePointsSection from '@components/MapsParams/CafePointsSection'
import CongestionSection from '@components/MapsParams/CongestionSection'
import NearCafeSection from '@components/MapsParams/NearCafeSection'
import Footer from '@components/Home/Footer'
import CafeInfoSection from '@components/MapsParams/CafeInfoSection'
import ImageSection from '@components/MapsParams/ImageSection'
import RecommendSection from '@components/MapsParams/RecommendSection'

import Ic_clear from '@public/ic_clear.svg'

import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper
} from '@components/Home/styles/AddOnStyles'
import { OnAirBadge } from '@components/Maps/styles/ShortCafeStyles'
import { CafeInfoWrapper, CafeWrapper, WrapperTitle } from './styles/styles'
import madeURL from '@utils/blurDataURL'
import { fetchCafeInfo, fetchCafeNears, fetchCafeStarPoint } from 'apis/apis'
import AnnounceSection from './AnnounceSection'
import { CloseImage } from '@components/common/CloseButton'
import Loading from '@components/common/Loading'

interface DetailCafeProps {
  storeId: string
}

const DetailCafe = ({ storeId }: DetailCafeProps) => {
  const [cafeReviewPercent, setCafeReviewPercent] = useState<null | number>(
    null
  )
  const WrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)

  const { data: store } = useSWR<CafeInfoInterface>(
    { key: 'store', storeId: storeId as string },
    fetchCafeInfo
  )
  const { data: reviewStore } = useSWR<CafeRewviewPointInterface>(
    { key: 'reviewStore', storeId: storeId as string },
    fetchCafeStarPoint
  )
  const { data: nearStores } = useSWR<INearCafe[]>(
    { key: 'nearStores', storeId: storeId as string },
    fetchCafeNears
  )

  useEffect(() => {
    if (store) setCafeInfo(store)
  }, [store])

  const handleAnchor = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    Router.back()
  }

  const isSingle = false

  return (
    <>
      {store && reviewStore && nearStores ? (
        <>
          <Head>
            <title>카페인 | {store.storeName}</title>
          </Head>
          <CafeWrapper ref={WrapperRef} isSingle={isSingle}>
            {store.storeImageList.length > 0 ? (
              <ImageSection store={store} />
            ) : (
              ''
            )}

            <CafeInfoSection
              store={store}
              cafeReviewPercent={cafeReviewPercent}
            />

            <CafePointsSection reviewStore={reviewStore} />

            <RecommendSection
              store={store}
              setCafeReviewPercent={setCafeReviewPercent}
            />

            <CongestionSection />

            <NearCafeSection store={store} nearStores={nearStores} />

            <AnnounceSection />

            <Footer isHome={false} />
          </CafeWrapper>
          {/* <Link href={`/maps/search/${router.query.search}`}> */}
            <CloseImage isSingle={isSingle} onClick={handleAnchor}>
              <Ic_clear />
            </CloseImage>
          {/* </Link> */}
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default DetailCafe
