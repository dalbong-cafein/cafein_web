import { useEffect } from 'react'
import { IStore } from '../../store'
import { getMapCenterByInputs } from '../../utils/MapUtils'
import { MapBox } from './styles/styles'

const Map = () => {
  return <MapBox id="map"></MapBox>
}

export default Map
