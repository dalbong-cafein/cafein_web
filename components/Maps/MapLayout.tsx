import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { Logo } from '../common/Common'
import DetailStore from './DetailStore'
import Map from './Map'
import { DetailWrapper, MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: ReactNode
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const { storeName, cafeId } = router.query
  console.log(storeName)

  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      <MainWrapper>
        <Link href="/">
          <Logo>
            <Image
              src="/images/logo_black.svg"
              width={103}
              height={22}
              alt="로고"
            />
          </Logo>
        </Link>
        {children}
      </MainWrapper>
      {storeName ? (
        <DetailStore
          storeId={Number(cafeId)}
          isDetail={cafeId ? true : false}
        />
      ) : (
        ''
      )}
      <Map />
    </>
  )
}

export default MapLayout
