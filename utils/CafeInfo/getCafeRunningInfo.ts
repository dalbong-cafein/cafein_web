import { CafeInfoInterface } from 'store'
import getHours from './getHours'

export const getIsRunning = (
  store: CafeInfoInterface
): [boolean, string | null] => {
  const { businessHoursInfoDto } = store
  if (businessHoursInfoDto) {
    const { isOpen, closed, tmrOpen } = businessHoursInfoDto
    let hour: string | number
    if (closed === tmrOpen) return [true, '24']
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
}

export const getRunningTimes = (store: CafeInfoInterface) => {
  const { totalBusinessHoursResDto } = store
  if (
    totalBusinessHoursResDto &&
    Object.values(totalBusinessHoursResDto).filter((idx) => idx === null)
      .length !== 7
  ) {
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
      } else {
        obj[days[idx]] = '휴무'
      }
    })
    return obj
  }
  return null
}
