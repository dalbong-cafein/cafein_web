const init = (userLocation: { latY: number; lngX: number }) => {
  const mapOptions: naver.maps.MapOptions = {
    zoomControl: false,
    zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.RIGHT_BOTTOM
    },
    logoControlOptions: {
      position: naver.maps.Position.RIGHT_BOTTOM
    },
    scaleControl: false,
    scaleControlOptions: {
      position: naver.maps.Position.RIGHT_CENTER
    },
    mapDataControl: false,
    center: new naver.maps.LatLng(userLocation.latY, userLocation.lngX)
  }
  const map = new naver.maps.Map('map', mapOptions)
  const locationBtnHtml =
    '<a href="#" class="btn_mylct"><span class="hidden">내 위치로</span></a>'

  naver.maps.Event.once(map, 'init', function () {
    //customControl 객체 이용하기
    const customControl = new naver.maps.CustomControl(locationBtnHtml, {
      position: naver.maps.Position.RIGHT_BOTTOM
    })

    customControl.setMap(map)

    // const onSuceessGeolocation = (position: GeolocationPosition) => {
    //   const location = new naver.maps.LatLng(
    //     position.coords.latitude,
    //     position.coords.longitude
    //   )
    //   console.log('눌렀는데?? 이상하다??', position, map)
    //   map.setCenter(location)
    //   map.setZoom(15)
    // }

    // const onErrorGeolocation = (err: GeolocationPositionError) => {
    //   alert(`Error(${err.code}): 위치 정보 제공에 동의하지 않으셨습니다`)
    // }

    // const checkGeolocation = () => {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(
    //       onSuceessGeolocation,
    //       onErrorGeolocation,
    //       {
    //         enableHighAccuracy: true,
    //         maximumAge: 5000,
    //         timeout: Infinity
    //       }
    //     )
    //   } else {
    //     alert('지원하지 않는 브라우저 입니다. 최신 브라우저를 사용하세요')
    //   }
    // }
    const location = new naver.maps.LatLng(userLocation.latY, userLocation.lngX)
    naver.maps.Event.addDOMListener(customControl.getElement(), 'click', () => {
      map.setCenter(location)
    })
  })

  return map
}

const initMap = {
  init
}

export default initMap
