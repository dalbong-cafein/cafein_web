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
import { CafeInfoWrapper } from '@components/MapsParams/styles/CafeInfoSectionStyle'
import { WrapperTitle } from '@components/MapsParams/styles/CafePointsSectionStyle'
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

import Ic_down_arrow from '@public/down_arrow.svg'
import Ic_left_arrow_off from '@public/left_arrow_off.svg'
import Ic_right_arrow_off from '@public/right_arrow_off.svg'
import Ic_navigation from '@public/navigation.svg'
import Ic_like from '@public/ddabong.svg'
import Ic_heart from '@public/heart.svg'
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
  searchInputAtom
} from 'store'
import { useEffect, useState } from 'react'
import madeURL from '@utils/blurDataURL'

const DetailStorePage = ({
  store,
  reviewStore,
  recommendStore,
  nearStores
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const setCafePoints = useSetAtom(cafeReviewPonitAtom)
  const setCafeReviewPercent = useSetAtom(cafeReviewPercentAtom)
  const [nearCafes, setNearCafes] = useState<INearCafe[]>()

  useEffect(() => {
    setCafeInfo(store)
    setCafePoints(reviewStore)
    setNearCafes(nearStores)
  })

  const isSingle = true
  console.log(store, reviewStore, recommendStore, nearStores)

  const setIsDimmed = useSetAtom(isDimmedAtom)
  const notYet = () => {
    setIsDimmed(true)
  }

  return (
    <>
      <Head>
        <title>카페인 | {store.storeName}</title>
      </Head>
      <CafeWrapper isSingle={isSingle}>
        <ImageSection />
        <CafeInfoSection />
        <CafePOintsSection />
        <RecommendSection
          isHovering_1={false}
          setIsHovering_1={() => {}}
          isHovering_2={false}
          setIsHovering_2={() => {}}
          isHovering_3={false}
          setIsHovering_3={() => {}}
        />
        <CafeInfoWrapper>
          <WrapperTitle>혼잡도</WrapperTitle>
          <ButtonWrapper>
            <Select isOpened={false} onClick={notYet}>
              월요일
              <Ic_down_arrow />
            </Select>
            <CongestionBtn onClick={notYet}>혼잡도 알려주기</CongestionBtn>
          </ButtonWrapper>
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
              {nearCafes &&
                nearCafes.map((nearCafe) => (
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
    data: { data: recommendData }
  } = await axios.get(
    `${process.env.API_DOMAIN}/web/stores/${storeId}/recommendations`
  )

  const {
    data: { data: nearData }
  } = await axios.get(
    `${process.env.API_DOMAIN}/web/stores/${storeId}/near-stores`
  )

  const store: CafeInfoInterface = storeData
  const reviewStore: CafeRewviewPointInterface = storeReviewData
  const recommendStore: CafeRecommendInterface = recommendData
  const nearStores: INearCafe[] = nearData

  console.log(store, reviewStore, recommendStore, nearStores)

  return {
    props: { store, reviewStore, recommendStore, nearStores }
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

const ButtonWrapper = styled.div`
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
