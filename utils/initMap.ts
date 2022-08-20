const init = () => {
  const mapOptions = {
    zoomControl: true,
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
    mapDataControl: false
  }
  const map = new naver.maps.Map('map', mapOptions)
  return map
}

const initMap = {
  init
}

export default initMap
