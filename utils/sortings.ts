import { IStore } from 'store'

export const filterCallback = (cafe: IStore, sortMode: 0 | 1 | 2 | 3) => {
  if (sortMode === 1) {
    return cafe.businessHoursInfoDto.isOpen
  }
  return true
}

export const sortCallback = (
  a: IStore,
  b: IStore,
  sortMode: 0 | 1 | 2 | 3,
  userLocation: {
    latY: number
    lngX: number
  } | null
) => {
  if (sortMode === 3) {
    if (a.recommendPercent && b.recommendPercent) {
      return b.recommendPercent - a.recommendPercent
    } else if (a.recommendPercent) {
      return -1
    } else if (b.recommendPercent) {
      return 1
    }
    return 0
  } else if (sortMode === 2) {
    if (a.latY && b.latY) {
      const totalA = a.latY + a.lngX
      const totalB = b.latY + b.lngX
      const totalUser =
        (userLocation?.latY as number) + (userLocation?.lngX as number)
      return Math.abs(totalA - totalUser) - Math.abs(totalB - totalUser)
    } else if (a.latY) {
      return -1
    } else if (b.latY) {
      return 1
    }
    return 0
  }
  return 0
}
