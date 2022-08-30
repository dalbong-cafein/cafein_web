import Footer from '@components/Home/Footer'
import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper
} from '@components/Home/styles/AddOnStyles'
import { OnAirBadge } from '@components/Maps/styles/ShortCafeStyles'
import CafeInfoSection from '@components/MapsParams/CafeInfoSection'
import CafePOintsSection from '@components/MapsParams/CafePointsSection'
import ImageSection from '@components/MapsParams/ImageSection'
import RecommendSection from '@components/MapsParams/RecommendSection'
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
} from '@components/MapsParams/styles/CafeInfoSectionStyle'
import {
  CafeInfoItemDesc,
  CafeInfoItemDescsWrapper,
  CafeInfoItemDescWrapper,
  CafeInfoItemTitle,
  CafeInfoItemWrapper,
  CafeInfoList,
  StartWrapper,
  WrapperTitle
} from '@components/MapsParams/styles/CafePointsSectionStyle'
import axios from 'axios'
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType
} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { ParsedUrlQuery } from 'querystring'
import { CafeRecommendInterface, IStore } from 'store'
import styled from 'styled-components'

import getIsToday from '@utils/getIsToday'
import Ic_down_arrow from '@public/down_arrow.svg'
import Ic_left_arrow_off from '@public/left_arrow_off.svg'
import Ic_right_arrow_off from '@public/right_arrow_off.svg'
import Ic_navigation from '@public/navigation.svg'
import Ic_heart from '@public/heart.svg'
import Ic_copy from '@public/copy.svg'
import Ic_clock from '@public/clock.svg'
import Ic_call from '@public/call.svg'
import Ic_url from '@public/url.svg'
import Ic_like from '@public/ddabong.svg'
import Ic_star from '@public/star.svg'
import Ic_empty_star from '@public/empty_star.svg'
import Ic_plug from '@public/plug.svg'
import Ic_restroom from '@public/restroom.svg'
import Ic_table from '@public/table.svg'
import Ic_wifi from '@public/wifi.svg'
import Ic_badOn from '@public/bad_on.svg'
import Ic_bad from '@public/bad.svg'
import Ic_sosoOn from '@public/soso_on.svg'
import Ic_soso from '@public/soso.svg'
import Ic_goodOn from '@public/good_on.svg'
import Ic_good from '@public/good.svg'
import temp_img from '@public/temp_img.png'
import { useAtom, useSetAtom } from 'jotai'

import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  CafeRewviewPointInterface,
  INearCafe,
  isDimmedAtom,
  mapAtom,
  searchInputAtom,
  moreAtom
} from 'store'
import React, { MouseEvent, useEffect, useState } from 'react'
import madeURL from '@utils/blurDataURL'
import {
  ImageLink,
  ImageWrappers,
  ShowMore
} from '@components/MapsParams/styles/ImageSectionStyles'
import {
  ButtonDesc,
  ButtonInnerWrapper,
  ButtonOutterWrapper,
  ButtonWrapper,
  StrongWrapperTitle,
  WordsWrapper,
  WordsWrapperText
} from '@components/MapsParams/styles/RecommendSectionStyle'
import CafePointsSection from '@components/MapsParams/CafePointsSection'

const DetailStorePage = ({
  store,
  reviewStore,
  nearStores
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [cafeReviewPercent, setCafeReviewPercent] = useState<null | number>(
    null
  )
  const setMore = useSetAtom(moreAtom)
  const [isOnButton, setIsOnButton] = useState(0)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)

  const onMoreHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMore(true)
  }

  const getRecommendation = async () => {
    try {
      const response = await axios.get(
        `/api/web/stores/${store.storeId}/recommendations`
      )
      const { data } = response.data
      console.log(data)
      const { recommendPercentOfStore, recommendation } = data
      setCafeReviewPercent(recommendPercentOfStore)
      if (recommendation === 'BAD') {
        setIsHovering_1(true)
        setIsHovering_2(false)
        setIsHovering_3(false)
      } else if (recommendation === 'NORMAL') {
        setIsHovering_1(false)
        setIsHovering_2(true)
        setIsHovering_3(false)
      } else if (recommendation === 'GOOD') {
        setIsHovering_1(false)
        setIsHovering_2(false)
        setIsHovering_3(true)
      } else {
        setIsHovering_1(false)
        setIsHovering_2(false)
        setIsHovering_3(false)
      }
    } catch (error) {
      console.error(`Cafe Recommend data Get error : ${error}`)
    }
  }

  useEffect(() => {
    getRecommendation()
  }, [])

  const isSingle = true

  const setIsDimmed = useSetAtom(isDimmedAtom)
  const notYet = () => {
    setIsDimmed(true)
  }

  const getStars = (cnt: string) => {
    return (
      <StartWrapper>
        {[1, 2, 3, 4].map((num, idx) => {
          if (num <= +cnt) {
            return <Ic_star key={idx} />
          }
          return <Ic_empty_star key={idx} />
        })}
      </StartWrapper>
    )
  }

  const recommendOnClickHandler = async (
    recommendation: string,
    storeId: number
  ) => {
    try {
      axios
        .post(`/api/web/recommendations`, {
          recommendation,
          storeId
        })
        .then(() => getRecommendation())

      if (recommendation === 'BAD') {
        setIsOnButton(1)
      } else if (recommendation === 'NORMAL') {
        setIsOnButton(2)
      } else if (recommendation === 'GOOD') {
        setIsOnButton(3)
      }
    } catch (error) {
      console.error(
        `카페 추천 데이터 등록 에러 : ${error} of "${recommendation}"`
      )
    }
  }

  console.log(cafeReviewPercent, 'not null')

  return (
    <>
      <Head>
        <title>카페인 | {store.storeName}</title>
      </Head>
      <CafeWrapper isSingle={isSingle}>
        {store.storeImageList.length > 0 ? <ImageSection store={store} /> : ''}

        <CafeInfoSection store={store} cafeReviewPercent={cafeReviewPercent} />

        <CafePointsSection reviewStore={reviewStore} />

        <CafeInfoWrapper>
          <WrapperTitle>리뷰</WrapperTitle>
          <WordsWrapper>
            <StrongWrapperTitle>{store.storeName}</StrongWrapperTitle>
            <WordsWrapperText>카공 카페로 어떤가요?</WordsWrapperText>
          </WordsWrapper>
          <ButtonOutterWrapper>
            <ButtonInnerWrapper>
              <ButtonWrapper
                onMouseEnter={() => setIsHovering_1(true)}
                onMouseLeave={() => setIsHovering_1(false)}
                onClick={() => recommendOnClickHandler('BAD', store.storeId)}
              >
                {isHovering_1 || isOnButton === 1 ? <Ic_badOn /> : <Ic_bad />}
                <ButtonDesc
                  isHovering={isHovering_1}
                  isOnButton={isOnButton === 1}
                >
                  별로예요
                </ButtonDesc>
              </ButtonWrapper>
              <ButtonWrapper
                onMouseEnter={() => setIsHovering_2(true)}
                onMouseLeave={() => setIsHovering_2(false)}
                onClick={() => recommendOnClickHandler('NORMAL', store.storeId)}
              >
                {isHovering_2 || isOnButton === 2 ? <Ic_sosoOn /> : <Ic_soso />}
                <ButtonDesc
                  isHovering={isHovering_2}
                  isOnButton={isOnButton === 2}
                >
                  그저그래요
                </ButtonDesc>
              </ButtonWrapper>
              <ButtonWrapper
                onMouseEnter={() => setIsHovering_3(true)}
                onMouseLeave={() => setIsHovering_3(false)}
                onClick={() => recommendOnClickHandler('GOOD', store.storeId)}
              >
                {isHovering_3 || isOnButton === 3 ? <Ic_goodOn /> : <Ic_good />}
                <ButtonDesc
                  isHovering={isHovering_3}
                  isOnButton={isOnButton === 3}
                >
                  추천해요
                </ButtonDesc>
              </ButtonWrapper>
            </ButtonInnerWrapper>
          </ButtonOutterWrapper>
        </CafeInfoWrapper>
        <CafeInfoWrapper>
          <WrapperTitle>혼잡도</WrapperTitle>
          <AlarmButtonWrapper>
            <Select isOpened={false} onClick={notYet}>
              월요일
              <Ic_down_arrow />
            </Select>
            <CongestionBtn onClick={notYet}>혼잡도 알려주기</CongestionBtn>
          </AlarmButtonWrapper>
          <CongestionWrapper>
            <CongestionItem>
              <GreenCircle>여유</GreenCircle>
              <CongestionSubWrapper>
                <CongestionTitle>
                  <CongestionUser>달봉</CongestionUser>님의 제보
                </CongestionTitle>
                <CongestionDescWrapper>
                  <CongestionDesc>30분전</CongestionDesc>
                  <CongestionLates>·</CongestionLates>
                  <CongestionLates>가장 최근에 공유했어요</CongestionLates>
                </CongestionDescWrapper>
              </CongestionSubWrapper>
            </CongestionItem>
            <CongestionItem>
              <GreyCircle>여유</GreyCircle>
              <CongestionSubWrapper>
                <CongestionTitle>
                  <CongestionUser>달봉</CongestionUser>님의 제보
                </CongestionTitle>
                <CongestionDesc>30분전</CongestionDesc>
              </CongestionSubWrapper>
            </CongestionItem>
          </CongestionWrapper>
        </CafeInfoWrapper>
        <CafeInfoWrapper>
          <WrapperTitle>근처에 있는 카공 카페를 찾아봤어요</WrapperTitle>
          {/* {curScrollId !== 0 ? (
            <LeftArrowBtn onClick={handleLeft}>
              <Ic_left_arrow_off />
            </LeftArrowBtn>
          ) : (
            ''
          )}

          {curScrollId !== (nearCafes?.length as number) - 1 ? (
            <RightArrowBtn onClick={handleRight}>
              <Ic_right_arrow_off />
            </RightArrowBtn>
          ) : (
            ''
          )} */}

          {
            <ScrollWrapper>
              {nearStores.map((nearCafe) => (
                <CardItem key={String(nearCafe.storeId) + store.storeId}>
                  <CardImgWrapper>
                    {nearCafe.storeImageDtoList.length ? (
                      nearCafe.storeImageDtoList.map((storeImage) => (
                        <Image
                          src={storeImage.imageUrl}
                          width={70}
                          height={70}
                          alt="카페 섬네일 이미지"
                          key={storeImage.imageId}
                          placeholder="blur"
                          blurDataURL={madeURL(70, 70)}
                        />
                      ))
                    ) : (
                      <>
                        <Image
                          src={temp_img}
                          width={70}
                          height={70}
                          placeholder="blur"
                          alt="기본 이미지"
                        />
                        <Image
                          src={temp_img}
                          width={70}
                          height={70}
                          placeholder="blur"
                          alt="기본 이미지"
                        />
                        <Image
                          src={temp_img}
                          width={70}
                          height={70}
                          placeholder="blur"
                          alt="기본 이미지"
                        />
                      </>
                    )}
                  </CardImgWrapper>
                  <CardDescWrapper>
                    <CardTitle>{nearCafe.storeName}</CardTitle>
                    <CardTextWrapper>
                      <OnAirBadge>
                        {nearCafe.businessHoursInfoDto.isOpen
                          ? '영업중'
                          : '영업종료'}
                      </OnAirBadge>
                      <GreenLight>여유</GreenLight>
                    </CardTextWrapper>
                    <CardTextWrapper>
                      <CardEmojiWrapper>
                        <Ic_navigation />
                        <NormalText>
                          {Math.floor(nearCafe.distance)}m
                        </NormalText>
                      </CardEmojiWrapper>
                      <CardEmojiWrapper>
                        <Ic_like />
                        <NormalText>
                          {nearCafe.recommendPercent
                            ? Math.floor(nearCafe.recommendPercent) + '%'
                            : 0}
                        </NormalText>
                      </CardEmojiWrapper>
                      <CardEmojiWrapper>
                        <Ic_heart />
                        <NormalText>{nearCafe.heartCnt}</NormalText>
                      </CardEmojiWrapper>
                    </CardTextWrapper>
                  </CardDescWrapper>
                </CardItem>
              ))}
            </ScrollWrapper>
          }
        </CafeInfoWrapper>
        <AddWrapper2>
          <AddLink2>
            <AddLinkText2>추천하고 싶은 카페가 있다면 알려주세요</AddLinkText2>
            <Link href="/">
              <AddButton2>카페 등록하기</AddButton2>
            </Link>
          </AddLink2>
        </AddWrapper2>
        <Footer isHome={false} />
      </CafeWrapper>
    </>
  )
}

export default DetailStorePage

interface IextendedParams extends ParsedUrlQuery {
  storeId: string
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { data: stores }
  } = await axios.get(`${process.env.API_DOMAIN}/web/stores?`)
  const paths = (stores as IStore[]).map((store: IStore) => ({
    params: { storeId: store.storeId.toString() }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { storeId } = params as IextendedParams
  const {
    data: { data: storeData }
  } = await axios.get(`${process.env.API_DOMAIN}/stores/${storeId}`)

  const {
    data: { data: storeReviewData }
  } = await axios.get(
    `${process.env.API_DOMAIN}/stores/${storeId}/detail-review-score`
  )

  const {
    data: { data: nearData }
  } = await axios.get(
    `${process.env.API_DOMAIN}/web/stores/${storeId}/near-stores`
  )

  const store: CafeInfoInterface = storeData
  const reviewStore: CafeRewviewPointInterface = storeReviewData
  const nearStores: INearCafe[] = nearData

  return {
    props: { store, reviewStore, nearStores }
  }
}

const CafeWrapper = styled.div<{ isSingle: boolean }>`
  height: ${(props) => (props.isSingle ? `calc(100vh - 88px)` : '100vh')};
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

const AlarmButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`

const Select = styled.a<{ isOpened: boolean }>`
  box-sizing: border-box;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 34px;
  padding: 10px 12px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 10px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 500;

  & span {
    left: 4px;
    transition: all ease 0.4s;
    transform: ${(props) => (props.isOpened ? 'rotate(180deg)' : '')};
  }
`

const CongestionBtn = styled.button`
  height: 34px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.orange400};
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 500;
  padding: 10px 12px;
`

const CongestionWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 20px;
`

const CongestionItem = styled.li`
  display: flex;
  gap: 10px;
`

const GreenCircle = styled.p`
  padding: 16px 10px;
  background-color: ${(props) => props.theme.colors.green050};
  color: ${(props) => props.theme.colors.green500};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 500;
  border-radius: 50%;
`

const GreyCircle = styled.p`
  padding: 13px 8px;
  background-color: ${(props) => props.theme.colors.grey50};
  color: ${(props) => props.theme.colors.grey400};
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  font-weight: 500;
  border-radius: 50%;
  margin-left: 4px;
`

const CongestionSubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const CongestionTitle = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
`

const CongestionUser = styled.span`
  font-weight: 500;
`

const CongestionDescWrapper = styled.div`
  display: flex;
  gap: 2px;
`

const CongestionDesc = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey600};
`

const CongestionLates = styled(CongestionDesc)`
  color: ${(props) => props.theme.colors.orange500};
`

const ScrollWrapper = styled.ul`
  position: relative;
  display: flex;
  margin: 0 -34px 0 -20px;
  padding: 16px 8px;
  gap: 12px;
  background-color: ${(props) => props.theme.colors.white};
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  &::after,
  &::before {
    content: '';
    width: 20px;
    display: block;
  }

  ${(props) => props.theme.mixins.scroll_x}
`

const ScrollBtn = styled.button`
  position: absolute;
  display: flex;
  top: 50%;
  z-index: 1;
  background-color: transparent;
  padding: 0;
`

const LeftArrowBtn = styled(ScrollBtn)`
  left: 8px;
`

const RightArrowBtn = styled(ScrollBtn)`
  right: 8px;
`

const CardItem = styled.li`
  border-radius: 16px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex: 0 0 246px;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.1);
  scroll-snap-align: center;
`

const CardImgWrapper = styled.div`
  display: flex;
  gap: 6px;
  & img {
    border-radius: 8px;
  }
`

const CardDescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const CardTitle = styled.span`
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 500;
`

const CardTextWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`

const CardEmojiWrapper = styled.div`
  align-items: center;
  display: flex;
  gap: 2px;
`

const GreenLight = styled.p`
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.green050};
  padding: 3px 4px;
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.green500};
`

const NormalText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey600};
`

const AddWrapper2 = styled(AddWrapper)`
  border-radius: 16px;
  height: 120px;
  width: 360px;
  margin: 16px auto 0;
  background-size: 142px 80px;
  background-position: right 14px top 22px;
  padding: 19px 20px;
`

const AddLink2 = styled(AddLink)`
  gap: 8px;
`

const AddLinkText2 = styled(AddLinkText)`
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
  width: 133px;
`

const AddButton2 = styled(AddButton)`
  border-radius: 8px;
  padding: 7px 12px;
  background-color: ${(props) => props.theme.colors.grey500};
  width: 101px;
  height: 28px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  align-self: flex-start;
`