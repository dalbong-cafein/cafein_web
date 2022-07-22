import { useEffect, useRef, useState } from 'react'

const useMap = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('')

  useEffect(() => {
    // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }),
      (err) => setMyLocation({ latitude: 37.564591, longitude: 126.98923 })
    )
  }, [])

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      // 현재 위치 추적
      const currentPosition = [myLocation.latitude, myLocation.longitude]

      // Naver Map 생성
      mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true
      })
    }
  }, [myLocation])

  return {
    myLocation
  }
}

export default useMap
