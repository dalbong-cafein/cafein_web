import React, { ReactNode } from 'react'
import Map from './Map'

interface MayLayoutInterface {
  children: ReactNode
}

const MapLayout = ({ children }: MayLayoutInterface) => {
  return (
    <>
      {children}
      <Map />
    </>
  )
}

export default MapLayout
