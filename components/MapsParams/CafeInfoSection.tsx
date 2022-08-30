import { MouseEvent, useState } from 'react'

import { useAtomValue } from 'jotai'
import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  getRunningTimesAtom,
  isRunningAtom
} from 'store'

import getIsToday from '@utils/getIsToday'
import Ic_copy from '@public/copy.svg'
import Ic_clock from '@public/clock.svg'
import Ic_call from '@public/call.svg'
import Ic_url from '@public/url.svg'
import Ic_like from '@public/ddabong.svg'

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
import { getIsRunning, getRunningTimes } from '@utils/getCafeRunningInfo'

interface CafeInfoSectionProps {
  store: CafeInfoInterface
  cafeReviewPercent: number | null
}

const CafeInfoSection = ({
  store,
  cafeReviewPercent
}: CafeInfoSectionProps) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isRunning, runningTime] = getIsRunning(store)
  const weekRunningTimes = getRunningTimes(store)
  const GetRunningTimes = weekRunningTimes ? (
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

  const arrowOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpened((cur) => !cur)
  }
  return (
    <CafeInfoWrapper isFirst={true}>
      <TitleWrapper>
        <HeaderTitle>{store.storeName}</HeaderTitle>
        {cafeReviewPercent && (
          <DDabongWrapper>
            <Ic_like />
            <DDabongPoints>{Math.floor(cafeReviewPercent)}%</DDabongPoints>
          </DDabongWrapper>
        )}
      </TitleWrapper>
      <SubTitleWrapper>
        <SubTitle>{store.address.fullAddress}</SubTitle>
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
          <ArrowButton isOpened={isOpened} onClick={arrowOnClickHandler} />
        </DescWrapper>
      </OpenInfoWrapper>
      {isOpened && weekRunningTimes ? GetRunningTimes : ''}
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
  )
}

export default CafeInfoSection
