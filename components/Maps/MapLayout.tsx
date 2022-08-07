import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { Logo } from '../common/Common'
import Map from './Map'
import { MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: ReactNode
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const cafeId =
    router.route !== '/maps' ? (router.query.params as string[]) : ''

  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      <MainWrapper isDetail={cafeId ? true : false}>
        {cafeId ? (
          ''
        ) : (
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
        )}
        {children}
      </MainWrapper>
      <Map />
    </>
  )
}

export default MapLayout
