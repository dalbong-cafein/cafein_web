import Head from 'next/head'
import React, { ReactNode } from 'react'
import Map from './Map'
import { MainWrapper } from './styles/styles'

interface MayLayoutInterface {
  children: ReactNode
}

const MapLayout = ({ children }: MayLayoutInterface) => {
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
