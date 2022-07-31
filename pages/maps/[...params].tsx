import axios from 'axios'
import { useAtom, useAtomValue } from 'jotai'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { MouseEvent, ReactElement, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Ddabong } from '../../components/common/Common'
import MapLayout from '../../components/Maps/MapLayout'
import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPonitAtom,
  CafeRewviewPointInterface,
  isRunningAtom
} from '../../store'
import { NextPageWithLayout } from '../_app'

const DetailMaps: NextPageWithLayout<{ params: string[] }> = ({ params }) => {
  const storeId = Number(params[0])
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const [isRunning, closeTime] = useAtomValue(isRunningAtom)
  const [cafePoints, setCafePoints] = useAtom(cafeReviewPonitAtom)
  const [isOpened, setIsOpened] = useState(false)

  const getStars = (cnt: string) => {
    return (
      <StartWrapper>
        {[1, 2, 3, 4].map((num) => {
          if (num <= +cnt) {
            return (
              <Image
                key={num}
                src={'/images/star.svg'}
                width={16}
                height={16}
                alt="star icon"
              />
            )
          }
          return (
            <Image
              key={num}
              src={'/images/empty_star.svg'}
              width={16}
              height={16}
              alt="star icon"
            />
          )
        })}
      </StartWrapper>
    )
  }

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpened((cur) => !cur)
  }

  useEffect(() => {
    async function getDetailStore() {
      try {
        const response = await axios.get(`/api/stores/${storeId}`)
        const data: CafeInfoInterface = response.data.data
        setCafeInfo(data)
      } catch (error) {
        console.log(`Cafe Info data GET 요청 에러 : ${error}`)
      }
    }
    async function getCafePoints() {
      try {
        const res = await axios.get(
          `/api/stores/${storeId}/detail-review-score`
        )
        console.log(res)
        const data: CafeRewviewPointInterface = res.data.data
        setCafePoints(data)
      } catch (error) {
        console.log(`Cafe Points data GET 요청 에러 : ${error}`)
      }
    }
    if (storeId !== cafeInfo?.storeId) {
      Promise.all([getDetailStore(), getCafePoints()])
    }
  }, [storeId, cafeInfo, setCafeInfo, setCafePoints])

  return (
    <>
      <Head>
        <title>카페인| 지도 {storeId}</title>
      </Head>
      {cafeInfo && cafePoints && (
        <>
          <ImageWrappers>
            {cafeInfo.storeImageList.slice(0, 5).map((imgData, idx) => (
              <Image
                src={imgData.imageUrl}
                alt="카페 사진"
                key={cafeInfo.storeId + idx}
                width={392}
                height={284}
              />
            ))}
          </ImageWrappers>
          <CafeInfoWrapper>
            <TitleWrapper>
              <HeaderTitle>{cafeInfo.storeName}</HeaderTitle>
              {cafePoints.reviewCnt > 0 && (
                <>
                  <DDabongWrapper>
                    {Ddabong}
                    <DDabongPoints>
                      {cafePoints.recommendPercent}%
                    </DDabongPoints>
                  </DDabongWrapper>
                </>
              )}
            </TitleWrapper>
            <SubTitle>{cafeInfo.address.fullAddress}</SubTitle>
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
                <StrongSpan>{isRunning ? '영업 중' : '영업 종료'}</StrongSpan>
                <Description>{closeTime}에 영업 종료</Description>
                <ArrowButton isOpened={isOpened} onClick={onClickHandler} />
              </DescWrapper>
            </OpenInfoWrapper>
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
            <EditInfoWrapper>
              <EditInfoButton>정보수정</EditInfoButton>
              <EditDesc>잘못된 정보가 있다면 알려주세요</EditDesc>
              <EditDateDesc>마지막 수정일 </EditDateDesc>
            </EditInfoWrapper>
          </CafeInfoWrapper>
          <CafeInfoWrapper>
            <WrapperTitle>카공 정보</WrapperTitle>
            <CafeInfoList>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/plug.svg'}
                  width={40}
                  height={40}
                  alt="plug badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>콘센트</CafeInfoItemTitle>
                    {getStars(cafePoints.socket)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>바닥을 기어봐도 없어요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/restroom.svg'}
                  width={40}
                  height={40}
                  alt="restroom badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>화장실</CafeInfoItemTitle>
                    {getStars(cafePoints.restroom)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>다시 가고싶지 않아요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/table.svg'}
                  width={40}
                  height={40}
                  alt="table badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>테이블</CafeInfoItemTitle>
                    {getStars(cafePoints.tableSize)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>매우 편하게 사용 가능해요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
              <CafeInfoItemWrapper>
                <Image
                  src={'/images/wifi.svg'}
                  width={40}
                  height={40}
                  alt="wifi badge"
                />
                <CafeInfoItemDescsWrapper>
                  <CafeInfoItemDescWrapper>
                    <CafeInfoItemTitle>와이파이</CafeInfoItemTitle>
                    {getStars(cafePoints.wifi)}
                  </CafeInfoItemDescWrapper>
                  <CafeInfoItemDesc>자주 끊겨서 화나요</CafeInfoItemDesc>
                </CafeInfoItemDescsWrapper>
              </CafeInfoItemWrapper>
            </CafeInfoList>
          </CafeInfoWrapper>
          <CafeInfoWrapper>
            <WrapperTitle>
              <StrongWrapperTitle>{cafeInfo.storeName}</StrongWrapperTitle>
              카공 카페로 어떤가요?
            </WrapperTitle>
            <ButtonOutterWrapper>
              <ButtonInnerWrapper>
                <Image
                  src={'/images/bad.svg'}
                  width={60}
                  height={82}
                  alt="bad badge"
                />
                <Image
                  src={'/images/soso.svg'}
                  width={60}
                  height={82}
                  alt="soso badge"
                />
                <Image
                  src={'/images/good.svg'}
                  width={60}
                  height={82}
                  alt="good badge"
                />
              </ButtonInnerWrapper>
            </ButtonOutterWrapper>
          </CafeInfoWrapper>
          <CafeInfoWrapper>
            <WrapperTitle>혼잡도</WrapperTitle>
          </CafeInfoWrapper>
        </>
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { params } = query
  return {
    props: { params }
  }
}

DetailMaps.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

const ImageWrappers = styled.div`
  display: grid;
  max-width: 680px;
  height: 284px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 2.8fr 1fr 1fr;
  grid-gap: 4px;

  span:nth-child(1) {
    grid-row: 1 / 3;
  }
`

const CafeInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 30px 24px;
  position: relative;

  &:not(first-child) {
    &::before {
      content: '';
      height: 2px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: ${(props) => props.theme.colors.grey100};
    }
  }
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const HeaderTitle = styled.h1`
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
`

const DDabongWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`

const DDabongPoints = styled.span`
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey600};
  font-weight: 400;
`

const SubTitle = styled.h2`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  margin-top: 10px;
`

const OpenInfoWrapper = styled.div`
  display: flex;
  margin-top: 12px;
  align-items: center;
  gap: 8px;
`

const ClockIcon = styled.span`
  width: 20px;
  height: 20px;
`

const DescWrapper = styled.div`
  display: flex;
  gap: 4px;
`

const Description = styled.p`
  display: flex;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: ${(props) => props.theme.colors.grey800};
  font-weight: 400;
`

const ArrowButton = styled.button<{ isOpened: boolean }>`
  background-image: url('/images/down_arrow.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 16px;
  height: 16px;
  margin-left: 6px;
  transition: all ease 0.4s;
  transform: ${(props) => (props.isOpened ? 'rotate(180deg)' : '')};
`

const CallDescription = styled.a`
  color: ${(props) => props.theme.colors.blue};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
`

const URLDescription = styled(CallDescription)`
  color: ${(props) => props.theme.colors.grey800};
`

const StrongSpan = styled.span`
  color: ${(props) => props.theme.colors.orange500};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

const EditInfoWrapper = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  margin-top: 12px;
`

const EditInfoButton = styled.button`
  width: 74px;
  height: 30px;
  border: 1px solid ${(props) => props.theme.colors.grey400};
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  font-weight: 500;
  background-color: transparent;
`

const EditDesc = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  margin-left: 14px;
  font-weight: 400;
`

const EditDateDesc = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey500};
  opacity: 0.4;
  margin-left: 12px;
  font-weight: 400;
`

const WrapperTitle = styled(Description)`
  font-weight: 600;
  margin-left: 0;
  & span {
    margin-right: 6px;
  }
`

const CafeInfoList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  gap: 16px;
  margin-top: 20px;
`

const CafeInfoItemWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const CafeInfoItemDescsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const CafeInfoItemDescWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

const CafeInfoItemTitle = styled.p`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey600};
`

const StartWrapper = styled.div`
  display: flex;
`

const CafeInfoItemDesc = styled(CafeInfoItemTitle)`
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey800};
`

const StrongWrapperTitle = styled(StrongSpan)`
  margin-left: 0;
`

const ButtonOutterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const ButtonInnerWrapper = styled.div`
  display: flex;
  width: 340px;
  justify-content: space-between;
`

export default DetailMaps
