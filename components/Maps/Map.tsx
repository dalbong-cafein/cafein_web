import { useRef } from 'react'

import { MapBox } from './styles/styles'
import DetailImageSection from './DetailImageSection'
import useWindowSize from 'hooks/useWindowSize'

interface MapProps {
  isSingle: boolean
}

const Map = ({ isSingle }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWindowSize()

  return (
    <>
      <DetailImageSection isSingle={isSingle} />
      <MapBox ref={mapRef} id="map" width={width as number} />
    </>
  )
}

export default Map
