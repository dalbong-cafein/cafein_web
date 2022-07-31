import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import {
  ButtonsWrapper,
  NavWrapper,
  WhiteLink,
  WhiteLinkWrapper
} from '../Home/styles/NavStyles'
import Map from './Map'
import { MainWrapper, SearchDetailInput } from './styles/styles'

interface MapLayoutProps {
  children: ReactNode
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const { cafeId } = router.query

  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      <NavWrapper>
        <Link href="/">
          <a>
            <Image
              src={'/images/logo_black.svg'}
              alt="카페인 로고"
              width={80}
              height={21.5}
            />
          </a>
        </Link>
        {cafeId && (
          <SearchDetailInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
        )}
        <ButtonsWrapper>
          <WhiteLinkWrapper>
            <Link href="/">
              <WhiteLink>의견 보내기</WhiteLink>
            </Link>
          </WhiteLinkWrapper>
        </ButtonsWrapper>
      </NavWrapper>
      <MainWrapper>{children}</MainWrapper>
      <Map />
    </>
  )
}

export default MapLayout
