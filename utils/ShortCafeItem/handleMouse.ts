import { IStore } from '../../store'

export const handleMouseOver = (cafe: IStore) => {
  if (
    (cafe.marker?.getIcon() as naver.maps.HtmlIcon).content ===
    `<div class="marker active">${cafe.storeName}</div>`
  )
    return
  cafe.marker?.setIcon({
    content: `<div class="marker over">${cafe.storeName}</div>`
  })
}
export const handleMouseOut = (cafe: IStore) => {
  if (
    (cafe.marker?.getIcon() as naver.maps.HtmlIcon).content ===
    `<div class="marker active">${cafe.storeName}</div>`
  )
    return
  cafe.marker?.setIcon({
    content: `<div class="marker">${cafe.storeName}</div>`
  })
}
