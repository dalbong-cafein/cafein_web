import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import useSWR from 'swr'
import { useAtom } from 'jotai'

import {
  cafeInfoAtom,
  CafeInfoInterface,
  CafeRewviewPointInterface,
  INearCafe
} from 'store'
import CafePointsSection from '@components/MapsParams/CafePointsSection'
import CongestionSection from '@components/MapsParams/CongestionSection'
import NearCafeSection from '@components/MapsParams/NearCafeSection'
import Footer from '@components/Home/Footer'
import CafeInfoSection from '@components/MapsParams/CafeInfoSection'
import ImageSection from '@components/MapsParams/ImageSection'
import RecommendSection from '@components/MapsParams/RecommendSection'

import Ic_clear from '@public/ic_clear.svg'

import { CafeWrapper } from './styles/styles'
import { fetchCafeInfo, fetchCafeNears, fetchCafeStarPoint } from 'apis/apis'
import AnnounceSection from './AnnounceSection'
import { CloseImage } from '@components/common/CloseButton'
import Loading from '@components/common/Loading'
import Link from 'next/link'

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
    `stores/${storeId}`,
    fetchCafeInfo
  )
  const { data: reviewStore } = useSWR<CafeRewviewPointInterface>(
    `${storeId}/detail-review-score`,
    fetchCafeStarPoint
  )
  const { data: nearStores } = useSWR<INearCafe[]>(
    `${storeId}/near-stores`,
    fetchCafeNears
  )

  useEffect(() => {
    WrapperRef.current?.scrollTo(0, 0)
    if (store) {
      setCafeInfo(store)
    }
  }, [store])

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

            <CafeInfoSection store={store} />

            <CafePointsSection reviewStore={reviewStore} />

            <RecommendSection
              store={store}
              cafeReviewPercent={cafeReviewPercent}
              setCafeReviewPercent={setCafeReviewPercent}
            />

            <CongestionSection />

            <NearCafeSection store={store} nearStores={nearStores} />

            <AnnounceSection />

            <Footer isHome={false} />
          </CafeWrapper>
          <Link
            href={{
              pathname: router.pathname,
              query: {
                ...router.query,
                storeId: null
              }
            }}
          >
            <CloseImage isSingle={isSingle}>
              <Ic_clear />
            </CloseImage>
          </Link>
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default DetailCafe
