import { useRef } from 'react'

import { MapBox } from './styles/styles'
import DetailImageSection from './DetailImageSection'

interface MapProps {
  isSingle: boolean
}

const Map = ({ isSingle }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <DetailImageSection isSingle={isSingle} />
      <MapBox ref={mapRef} id="map" />
    </>
  )
}

export default Map
