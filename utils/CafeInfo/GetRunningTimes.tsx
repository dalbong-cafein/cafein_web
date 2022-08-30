import {
  DailyTimeWrapper,
  Day,
  DayTimeWrapper,
  Time
} from '@components/MapsParams/styles/CafeInfoSectionStyle'
import getIsToday from './getIsToday'

export const GetRunningTimes = (
  weekRunningTimes: null | object,
  isRunning: boolean
) =>
  weekRunningTimes ? (
    <DailyTimeWrapper>
      {Object.entries(weekRunningTimes).map(([day, times], idx) => {
        const isToday = getIsToday(idx)
        return (
          <DayTimeWrapper key={day}>
            <Day isRunning={isRunning} isToday={isToday}>
              {day}
            </Day>
            <Time isRunning={isRunning} isToday={isToday}>
              {times}
            </Time>
          </DayTimeWrapper>
        )
      })}
    </DailyTimeWrapper>
  ) : (
    ''
  )
