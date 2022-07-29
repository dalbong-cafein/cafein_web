import Head from 'next/head'
import React, { ReactNode } from 'react'
import { CafeInfoInterface } from '../../store'
import Map from './Map'
import { MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: ReactNode
}

const MapLayout = ({ children }: MapLayoutProps) => {
  return (
    <>
      <Head>
        <title>카페인| 지도</title>
      </Head>
      <MainWrapper>{children}</MainWrapper>
      <Map />
    </>
  )
}

export default MapLayout
