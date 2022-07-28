import { useEffect } from 'react'
import { atom, useAtom, useAtomValue } from 'jotai'
import { userIpAtom } from '../../../store'
import { MapBox } from './styles'

const Map = () => {
  console.log('Hrrloo')
  //   const userIp = useAtomValue(userIpAtom)
  //   console.log(userIp)
  useEffect(() => {
    // if (userIp != null) {
    const initMap = () => {
      const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.566, 126.9784),
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.BOTTOM_RIGHT
        },
        scaleControl: true,
        scaleControlOptions: {
          position: naver.maps.Position.RIGHT_CENTER
        },
        logoControl: true,
        logoControlOptions: {
          position: naver.maps.Position.TOP_LEFT
        }
      })
      console.log(map)
    }
    initMap()
    // }
  }, [])
  return <MapBox id="map"></MapBox>
}

export default Map
