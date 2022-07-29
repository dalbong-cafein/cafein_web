import { atom } from 'jotai'

interface UserIpAtom {
  ip: string
  lati: number
  longi: number
}
interface ImageListInterface {
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
    onMon: {
      open: string
      closed: string
    }
    onTue: {
      open: string
      closed: string
    }
    onWed: {
      open: string
      closed: string
    }
    onThu: {
      open: string
      closed: string
    }
    onFri: {
      open: string
      closed: string
    }
    onSat: {
      open: string
      closed: string
    }
    onSun: null
    etcTime: string
  }
  lngX: number
  latY: number
  reviewImageList: ImageListInterface[]
  storeImageList: ImageListInterface[]
}

export const userIpAtom = atom<UserIpAtom | null>(null)

export const cafeInfoAtom = atom<CafeInfoInterface | null>(null)
