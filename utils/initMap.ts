import { getMapCenterByInputs } from './MapUtils'

const init = (search: string) => {
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
  getMapCenterByInputs(map, search)
    .then((result: boolean) => {
      console.log('wow', result)
    })
    .catch((err: boolean) => {
      console.error('wow', err)
    })
  return map
}

const initMap = {
  init
}

export default initMap
