import { useEffect } from 'react'
import { IStore } from '../../store'
import { getMapCenterByInputs } from '../../utils/MapUtils'
import { MapBox } from './styles/styles'

const Map = () => {
  useEffect(() => {
    // init()
    // console.log('이젠 내가 Map이다', getMap())
  }, [])
  return <MapBox id="map"></MapBox>
}

export default Map
