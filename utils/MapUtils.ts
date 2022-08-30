import { NextRouter } from 'next/router'
import { CafeInfoInterface, IStore } from '../store'

const getMapCenterByInputs = (
  map: naver.maps.Map,
  address: string
): Promise<boolean> => {
  return new Promise((res, rej) => {
    naver.maps.Service.geocode(
      {
        query: address
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          if (!address) {
            return rej(false)
          }
          return rej(false)
        }
        if (response.v2.meta.totalCount === 0) {
          return rej(false) // ➡️ 검색 결과가 없으니 Not Found 404 페이지로 ㄱㄱ
        }
        const item = response.v2.addresses[0]
        const point = new naver.maps.Point(Number(item.x), Number(item.y))
        map.setCenter(point)
        res(true)
      }
    )
  })
}

const getClickHandler = (
  cafe: IStore | CafeInfoInterface,
  router: NextRouter
) => {
  const { search } = router.query
  return () => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        storeId: cafe.storeId
      }
    })
  }
}

const getMapItems = (
  map: naver.maps.Map,
  cafes: IStore[] | CafeInfoInterface[],
  storeId: number,
  router: NextRouter
) => {
  const markers: naver.maps.Marker[] = []
  cafes?.forEach((cafe) => {
    if (cafe.storeId === storeId) {
      map.setCenter(new naver.maps.LatLng(cafe.latY, cafe.lngX))
    }
    const marker = new naver.maps.Marker({
      map: map as naver.maps.Map,
      position: new naver.maps.LatLng(cafe.latY, cafe.lngX),
      icon: {
        content:
          cafe.storeId === storeId
            ? `<div class="marker active">${cafe.storeName}</div>`
            : `<div class='marker'>${cafe.storeName}</div>`
      }
    })
    naver.maps.Event.addListener(marker, 'click', getClickHandler(cafe, router))
    cafe.marker = marker
    markers.push(marker)
  })
  return markers
}

export { getMapCenterByInputs, getMapItems }
