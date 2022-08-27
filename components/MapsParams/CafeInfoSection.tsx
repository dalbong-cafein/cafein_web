import Image from 'next/image'
import { MouseEvent, useState } from 'react'

import { useAtomValue } from 'jotai'
import {
  cafeInfoAtom,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  getRunningTimesAtom,
  isRunningAtom
} from '../../store'

import { Ddabong } from '../common/Common'
import getIsToday from '../../utils/getIsToday'

import {
  ArrowButton,
  CafeInfoWrapper,
  CallDescription,
  ClockIcon,
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
                    {Ddabong}
                    <DDabongPoints>
                      {Math.floor(cafeReviewPercent)}%
                    </DDabongPoints>
                  </DDabongWrapper>
                </>
              )}
            </TitleWrapper>
            <SubTitleWrapper>
              <SubTitle>{cafeInfo.address.fullAddress}</SubTitle>
              <Image src={'/images/copy.svg'} width={18} height={18} />
            </SubTitleWrapper>
            <OpenInfoWrapper>
              <ClockIcon>
                <Image
                  src="/images/clock.svg"
                  width={20}
                  height={20}
                  alt="시계 이모지"
                />
              </ClockIcon>
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
              <Image
                src="/images/call.svg"
                width={20}
                height={20}
                alt="전화 이모지"
              />
              <CallDescription href={`tel:010`}>
                02-123-456 전화번호가 없음
              </CallDescription>
            </OpenInfoWrapper>
            <OpenInfoWrapper>
              <Image
                src="/images/url.svg"
                width={20}
                height={20}
                alt="인터넷 이모지"
              />
              <URLDescription href={`/`}>http;eiofjoasjfj</URLDescription>
            </OpenInfoWrapper>
            {/* <EditInfoWrapper>
              <EditInfoButton>정보수정</EditInfoButton>
              <EditDesc>잘못된 정보가 있다면 알려주세요</EditDesc>
              <EditDateDesc>마지막 수정일 </EditDateDesc>
            </EditInfoWrapper> */}
          </CafeInfoWrapper>
        </>
      )}
    </>
  )
}

export default CafeInfoSection
