import { MouseEvent, useState } from 'react'

import { useAtomValue } from 'jotai'
import {
  cafeInfoAtom,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  getRunningTimesAtom,
  isRunningAtom
} from 'store'

import common from '@components/common/Common'
import getIsToday from '@utils/getIsToday'
import Ic_copy from '@public/copy.svg'
import Ic_clock from '@public/clock.svg'
import Ic_call from '@public/call.svg'
import Ic_url from '@public/url.svg'

import {
  ArrowButton,
  CafeInfoWrapper,
  CallDescription,
  DailyTimeWrapper,
  Day,
  DayTimeWrapper,
  DDabongPoints,
  DDabongWrapper,
  Description,
  DescWrapper,
  HeaderTitle,
  OpenInfoWrapper,
  StrongSpan,
  SubTitle,
  SubTitleWrapper,
  Time,
  TitleWrapper,
  URLDescription
} from './styles/styles'

const CafeInfoSection = () => {
  const cafeInfo = useAtomValue(cafeInfoAtom)
  const [isRunning, runningTime] = useAtomValue(isRunningAtom)
  const cafePoints = useAtomValue(cafeReviewPonitAtom)
  const cafeReviewPercent = useAtomValue(cafeReviewPercentAtom)
  const [isOpened, setIsOpened] = useState(false)
  const getRunningTimes = useAtomValue(getRunningTimesAtom)

  const GetRunningTimes = getRunningTimes ? (
    <DailyTimeWrapper>
      {Object.entries(getRunningTimes).map(([day, times], idx) => {
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
  const arrowOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpened((cur) => !cur)
  }
  return (
    <>
      {cafeInfo && cafePoints && (
        <>
          <CafeInfoWrapper isFirst={true}>
            <TitleWrapper>
              <HeaderTitle>{cafeInfo.storeName}</HeaderTitle>
              {cafeReviewPercent > 0 && (
                <>
                  <DDabongWrapper>
                    {<common.Ic_like />}
                    <DDabongPoints>
                      {Math.floor(cafeReviewPercent)}%
                    </DDabongPoints>
                  </DDabongWrapper>
                </>
              )}
            </TitleWrapper>
            <SubTitleWrapper>
              <SubTitle>{cafeInfo.address.fullAddress}</SubTitle>
              <Ic_copy />
            </SubTitleWrapper>
            <OpenInfoWrapper>
              <Ic_clock />
              <DescWrapper>
                <StrongSpan isRunning={isRunning}>
                  {isRunning ? '영업 중' : '영업 종료'}
                </StrongSpan>
                <Description>
                  {runningTime}
                  <span>에 영업 {isRunning ? '종료' : '시작'}</span>
                </Description>
                <ArrowButton
                  isOpened={isOpened}
                  onClick={arrowOnClickHandler}
                />
              </DescWrapper>
            </OpenInfoWrapper>
            {isOpened && getRunningTimes ? GetRunningTimes : ''}
            <OpenInfoWrapper>
              <Ic_call />
              <CallDescription href={`tel:010`}>
                02-123-456 전화번호가 없음
              </CallDescription>
            </OpenInfoWrapper>
            <OpenInfoWrapper>
              <Ic_url />
              <URLDescription href={`/`}>http;eiofjoasjfj</URLDescription>
            </OpenInfoWrapper>
          </CafeInfoWrapper>
        </>
      )}
    </>
  )
}

export default CafeInfoSection
