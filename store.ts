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

export const userIpAtom = atom<UserIpAtom | null>(null)

export const cafeInfoAtom = atom<CafeInfoInterface | null>(null)

export const is_running_atom = atom((get) => {
  const today = new Date()
  const totalBusinessHoursResDto = get(cafeInfoAtom)?.totalBusinessHoursResDto
  if (totalBusinessHoursResDto) {
    const totalBusinessHoursResDto_array = Object.keys(totalBusinessHoursResDto)
    let day = today.getDay() - 1
    if (day < 0) day += 6
    const onDay = totalBusinessHoursResDto_array[day]
    console.log(totalBusinessHoursResDto_array, onDay)
    const { open, cloesd } = totalBusinessHoursResDto[onDay]
    console.log(open, cloesd)
    let time
    if (cloesd) {
      time = cloesd.split(':').slice(2)
      console.log(time)
    }
    if (!open) return [false, closed]
    if (open && cloesd && open < today.getHours() && today.getHours() < cloesd)
      return [true, closed]
    else return [false, closed]
  }
  return [false, null]
})
