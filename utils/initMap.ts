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
