import React, { ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import { ParsedUrlQuery } from 'querystring'

import { IStore } from 'store'

import CafeInfoSection from '@components/MapsParams/CafeInfoSection'
import ImageSection from '@components/MapsParams/ImageSection'
import RecommendSection from '@components/MapsParams/RecommendSection'

import { CafeInfoInterface, CafeRewviewPointInterface, INearCafe } from 'store'
import CafePointsSection from '@components/MapsParams/CafePointsSection'
import CongestionSection from '@components/MapsParams/CongestionSection'
import NearCafeSection from '@components/MapsParams/NearCafeSection'
import Footer from '@components/Home/Footer'

import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper
} from '@components/Home/styles/AddOnStyles'
import MapLayout from '@components/Maps/MapLayout'
import { NextPageWithLayout } from 'pages/_app'

const DetailStorePage: NextPageWithLayout = ({
  store,
  reviewStore,
  nearStores
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [cafeReviewPercent, setCafeReviewPercent] = useState<null | number>(
    null
  )

  const isSingle = true

  return (
    <>
      <Head>
        <title>카페인 | {store.storeName}</title>
      </Head>
      <CafeWrapper isSingle={isSingle}>
        {store.storeImageList.length > 0 ? <ImageSection store={store} /> : ''}

        <CafeInfoSection store={store} cafeReviewPercent={cafeReviewPercent} />

        <CafePointsSection reviewStore={reviewStore} />

        <RecommendSection
          store={store}
          setCafeReviewPercent={setCafeReviewPercent}
        />

        <CongestionSection />

        <NearCafeSection store={store} nearStores={nearStores} />

        <AddWrapper2>
          <AddLink2>
            <AddLinkText2>추천하고 싶은 카페가 있다면 알려주세요</AddLinkText2>
            <Link href="/">
              <AddButton2>카페 등록하기</AddButton2>
            </Link>
          </AddLink2>
        </AddWrapper2>
        <Footer isHome={false} />
      </CafeWrapper>
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

const CafeWrapper = styled.div<{ isSingle: boolean }>`
  height: ${(props) => (props.isSingle ? `calc(100vh - 140px)` : '100vh')};
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

const AddWrapper2 = styled(AddWrapper)`
  border-radius: 16px;
  height: 120px;
  width: 360px;
  margin: 16px auto 0;
  background-size: 142px 80px;
  background-position: right 14px top 22px;
  padding: 19px 20px;
`

const AddLink2 = styled(AddLink)`
  gap: 8px;
`

const AddLinkText2 = styled(AddLinkText)`
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
  width: 133px;
`

const AddButton2 = styled(AddButton)`
  border-radius: 8px;
  padding: 7px 12px;
  background-color: ${(props) => props.theme.colors.grey500};
  width: 101px;
  height: 28px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  align-self: flex-start;
`

export default DetailStorePage
