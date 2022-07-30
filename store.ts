import { atom } from 'jotai'

interface UserIpInterface {
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

export const userIpAtom = atom<UserIpInterface | null>(null)

export const cafeInfoAtom = atom<CafeInfoInterface | null>(null)

export const is_running_atom = atom((get) => {
  const businessHoursInfoDto = get(cafeInfoAtom)?.businessHoursInfoDto
  if (businessHoursInfoDto) {
    const { isOpen, closed } = businessHoursInfoDto
    if (closed) {
      const times = closed.split(':')
      let hour: string | number = Number(times[0])
      if (hour >= 12) {
        if (hour > 12) {
          hour -= 12
          hour = '0' + String(hour)
        } else {
          hour = String(hour)
        }
        return [isOpen, '오후 ' + hour + ':' + times[1]]
      }
    }
  }
  return [false, null]
})

export const cafeReviewPonitAtom = atom<CafeRewviewPointInterface | null>(null)
