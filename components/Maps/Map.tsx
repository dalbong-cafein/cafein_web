import { useEffect } from 'react'
import { IStore } from '../../store'
import { MapBox } from './styles/styles'

const Map = ({
  search,
  cafeDatas
}: {
  search?: string
  cafeDatas?: IStore[]
}) => {
  useEffect(() => {
    const initMap = () => {
      const map = new naver.maps.Map('map', {
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
          position: naver.maps.Position.BOTTOM_LEFT
        }
      })
      const searchAddressToCoordinate = (address: string) =>
        naver.maps.Service.geocode(
          {
            query: address
          },
          (status, response) => {
            if (status === naver.maps.Service.Status.ERROR) {
              if (!address) {
                return alert('Geocode Error, Please Check address')
              }
              return alert('Geocode Error, address: ' + address)
            }
            if (response.v2.meta.totalCount === 0) {
              return alert('No result.') // ➡️ 검색 결과가 없으니 Not Found 404 페이지로 ㄱㄱ
            }
            const item = response.v2.addresses[0]
            const point = new naver.maps.Point(Number(item.x), Number(item.y))
            map.setCenter(point)
          }
        )
      if (search) {
        searchAddressToCoordinate(search)
      }
      if (cafeDatas) {
        cafeDatas.forEach((cafeData) => {
          const marker = new naver.maps.Marker({
            map: map,
            position: new naver.maps.LatLng(cafeData.latY, cafeData.lngX),
            icon: { content: `<div class='marker'>${cafeData.storeName}</div>` }
          })
          console.log(marker)
        })
      }
    }
    initMap()
  }, [])
  return <MapBox id="map"></MapBox>
}

export default Map
