import { atom } from 'jotai'
import { focusAtom } from 'jotai/optics'
import getHours from './utils/getHours'

export interface ImageListInterface {
  imageId: number
  imageUrl: string
}
export interface CafeInfoInterface {
  storeId: number
  storeName: string
  nicknameOfModMember: string
  memberImageDto: {
    imageId: number
    imageUrl: string
  }
  address: {
    siNm: string
    sggNm: string
    detail: string
    fullAddress: string
    rnum: string
    rnm: string
  }
  wifiPassword: string
  heartCnt: number
  isHeart: false
  businessHoursInfoDto: {
    isOpen: false
    closed: string
    tmrOpen: string
  }
  totalBusinessHoursResDto: {
    onMon: null | {
      open: string
      closed: string
    }
    onTue: null | {
      open: string
      closed: string
    }
    onWed: null | {
      open: string
      closed: string
    }
    onThu: null | {
      open: string
      closed: string
    }
    onFri: null | {
      open: string
      closed: string
    }
    onSat: null | {
      open: string
      closed: string
    }
    onSun: null | { open: string; closed: string }
    etcTime: string
    [key: string]: any
  }
  lngX: number
  latY: number
  reviewImageList: ImageListInterface[]
  storeImageList: ImageListInterface[]
}

export interface CafeRewviewPointInterface {
  reviewCnt: number
  recommendPercent: number
  socket: string
  socketCnt: number
  wifi: string
  wifiCnt: number
  restroom: string
  restroomCnt: number
  tableSize: string
  tableCnt: number
}

type isRunningInterface = [boolean, null | string]

export interface IStore {
  businessHoursInfoDto: {
    isOpen: false | null
    closed: string | null
    tmrOpen: string | null
  }
  fullAddress: string
  latY: number
  lngX: number
  recommendPercent: null | number
  storeId: number
  storeImageDto: null | ImageListInterface[]
  storeName: string
  marker: naver.maps.Marker | null
}

export interface INearCafe {
  businessHoursInfoDto: { isOpen: null; closed: null; tmrOpen: null }
  congestionScoreAvg: null | number
  distance: number
  heartCnt: number
  latY: number
  lngX: number
  recommendPercent: null | number
  storeId: number
  storeImageDtoList: ImageListInterface[]
  storeName: string
}

export const cafeInfoAtom = atom<CafeInfoInterface | null>(null)

export const isRunningAtom = atom<isRunningInterface>((get) => {
  const businessHoursInfoDto = get(cafeInfoAtom)?.businessHoursInfoDto
  if (businessHoursInfoDto) {
    const { isOpen, closed, tmrOpen } = businessHoursInfoDto
    let hour: string | number
    if (isOpen) {
      if (closed) {
        hour = getHours(closed)
        return [isOpen, hour]
      }
    } else {
      if (tmrOpen) {
        hour = getHours(tmrOpen)
        return [isOpen, hour]
      }
    }
  }
  return [false, null]
})

export const getRunningTimesAtom = atom((get) => {
  const totalBusinessHoursResDto = get(cafeInfoAtom)?.totalBusinessHoursResDto
  if (totalBusinessHoursResDto?.onMon) {
    const day_keys = Object.keys(totalBusinessHoursResDto as object).slice(
      0,
      -1
    )
    const days = <string[]>[
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일'
    ]
    const obj = <{ [key: string]: string }>{}
    day_keys.map((d, idx) => {
      if (totalBusinessHoursResDto[d]) {
        const times =
          getHours(totalBusinessHoursResDto[d].open) +
          ' ~ ' +
          getHours(totalBusinessHoursResDto[d].closed)
        obj[days[idx]] = times
      }
    })
    return obj
  }
  return null
})

export const cafeReviewPonitAtom = atom<CafeRewviewPointInterface | null>(null)

export const cafeReviewPercentAtom = atom<number>(0)

export const searchInputAtom = atom('')

export const split_searchInputAtom = atom<string[]>((get) => {
  const split_inputs = get(searchInputAtom).split('')
  return split_inputs
})

export const searchListsAtom = atom<IStore[]>([])

export const mapAtom = atom<naver.maps.Map | null>(null)
export const mapMarkerList = atom<naver.maps.Marker[]>([])

export const isDimmedAtom = atom<boolean>(false)
export const moreAtom = atom<boolean>(false)
