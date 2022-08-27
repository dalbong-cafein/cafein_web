import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import axios from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import styled from 'styled-components'
import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  CafeRewviewPointInterface,
  INearCafe,
  isDimmedAtom,
  mapAtom,
  mapMarkerList,
  searchInputAtom
} from '../../store'

import initMap from '../../utils/initMap'
import Footer from '../Home/Footer'
import CafeInfoSection from './CafeInfoSection'
import CafePOintsSection from './CafePointsSection'
import ImageSection from './ImageSection'
import RecommendSection from './RecommendSection'

import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper
} from '../Home/styles/AddOnStyles'
import { OnAirBadge } from '../Maps/styles/ShortCafeStyles'
import { CafeInfoWrapper, WrapperTitle } from './styles/styles'

interface DetailCafeProps {
  isSingle: boolean
}

const DetailCafe = ({ isSingle }: DetailCafeProps) => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const [map, setMap] = useAtom(mapAtom)
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)
  const [cafePoints, setCafePoints] = useAtom(cafeReviewPonitAtom)
  const setCafeReviewPercent = useSetAtom(cafeReviewPercentAtom)
  const [isBadQuery, setIsBadQuery] = useState(false)
  const [curScrollId, setCurScrollId] = useState(0)
  const [isLeftActive, setIsLeftActive] = useState(false)
  const [isRightActive, setIsRightActive] = useState(true)
  const [nearCafes, setNearCafes] = useState<INearCafe[]>()
  const setIsDimmed = useSetAtom(isDimmedAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const autoRef = useRef<HTMLUListElement>(null)
  const router = useRouter()
  const { search, storeId } = router.query

  const handleLeft = () => {
    autoRef.current?.scrollTo({
      left: autoRef.current?.scrollLeft - 246,
      behavior: 'smooth'
    })
    setCurScrollId((cur) => cur - 1)
  }

  const handleRight = () => {
    console.log(curScrollId)
    autoRef.current?.scrollTo({
      left: autoRef.current?.scrollLeft + 246,
      behavior: 'smooth'
    })
    setCurScrollId((cur) => cur + 1)
  }

  const notYet = () => {
    setIsDimmed(true)
  }

  useEffect(() => {
    if (!inputs || inputs !== search) setInputs(search as string)
    if (!map && cafeInfo) {
      setMap(
        initMap.init('', [cafeInfo.latY as number, cafeInfo.lngX as number])
      )
    } else if (map && cafeInfo) {
      const center = new naver.maps.LatLng(cafeInfo.latY, cafeInfo.lngX)
      map.setCenter(center)
    }
    let marker: naver.maps.Marker
    if (map && cafeInfo)
      marker = new naver.maps.Marker({
        map: map as naver.maps.Map,
        position: new naver.maps.LatLng(cafeInfo.latY, cafeInfo.lngX),
        icon: {
          content: `<div class="marker active">${cafeInfo.storeName}</div>`
        }
      })
    return () => {
      if (marker) marker.setMap(null)
    }
  }, [map])

  useEffect(() => {
    setCurScrollId(0)
    autoRef.current?.scrollTo({
      left: autoRef.current?.scrollLeft * 0,
      behavior: 'smooth'
    })
    console.log(autoRef.current?.scrollLeft, storeId, '가게 번호')
    async function getDetailStore() {
      try {
        const response = await axios.get(`/api/stores/${storeId}`)

        const data: CafeInfoInterface = response.data.data
        setCafeInfo(data)
      } catch (error) {
        console.error(`Cafe Info data GET 요청 에러 : ${error}`)
      }
    }
    async function getCafePoints() {
      try {
        const res = await axios.get(
          `/api/stores/${storeId}/detail-review-score`
        )
        const data: CafeRewviewPointInterface = res.data.data
        setCafePoints(data)
      } catch (error) {
        console.error(`Cafe Points data GET 요청 에러 : ${error}`)
      }
    }
    async function getRecommendation() {
      try {
        const response = await axios.get(
          `/api/web/stores/${storeId}/recommendations`
        )
        const { data } = response.data
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
    async function getNearStores() {
      try {
        const response = await axios.get(
          `/api/web/stores/${storeId}/near-stores`
        )
        setNearCafes(response.data.data)
      } catch (error) {
        console.error(error)
      }
    }
    if (storeId && isNaN(+storeId)) {
      setIsBadQuery(true)
    }
    if (storeId !== cafeInfo?.storeId) {
      Promise.all([
        getDetailStore(),
        getCafePoints(),
        getRecommendation(),
        getNearStores()
      ])
    }
  }, [storeId])
  return (
    <>
      <CafeWrapper isSingle={isSingle}>
        <Head>
          <title>카페인 | {cafeInfo?.storeName}</title>
        </Head>
        <ImageSection />
        <CafeInfoSection />
        <CafePOintsSection />
        <RecommendSection
          isHovering_1={isHovering_1}
          setIsHovering_1={setIsHovering_1}
          isHovering_2={isHovering_2}
          setIsHovering_2={setIsHovering_2}
          isHovering_3={isHovering_3}
          setIsHovering_3={setIsHovering_3}
        />
        <CafeInfoWrapper>
          <WrapperTitle>혼잡도</WrapperTitle>
          <ButtonWrapper>
            <Select isOpened={false} onClick={notYet}>
              월요일
              <Image src="/images/down_arrow.svg" width={16} height={16} />
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
          {curScrollId !== 0 ? (
            <LeftArrowBtn onClick={handleLeft}>
              <Image
                src="/images/left_arrow_off.svg"
                width={36}
                height={36}
                alt="왼쪽버튼"
              />
            </LeftArrowBtn>
          ) : (
            ''
          )}

          {curScrollId !== (nearCafes?.length as number) - 1 ? (
            <RightArrowBtn onClick={handleRight}>
              <Image
                src="/images/right_arrow_off.svg"
                width={36}
                height={36}
                alt="오른쪽버튼"
              />
            </RightArrowBtn>
          ) : (
            ''
          )}

          <ScrollWrapper ref={autoRef}>
            {nearCafes &&
              nearCafes.map((nearCafe) => (
                <CardItem key={String(nearCafe.storeId) + storeId}>
                  <CardImgWrapper>
                    {nearCafe.storeImageDtoList.length ? (
                      nearCafe.storeImageDtoList.map((storeImage) => (
                        <Image
                          src={storeImage.imageUrl}
                          width={70}
                          height={70}
                          alt="카페 섬네일 이미지"
                          key={storeImage.imageId}
                        />
                      ))
                    ) : (
                      <>
                        <Image
                          src="/images/temp_img.png"
                          width={70}
                          height={70}
                          alt="기본 이미지"
                        />
                        <Image
                          src="/images/temp_img.png"
                          width={70}
                          height={70}
                          alt="기본 이미지"
                        />
                        <Image
                          src="/images/temp_img.png"
                          width={70}
                          height={70}
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
                        <Image
                          src="/images/navigation.svg"
                          width={16}
                          height={16}
                          alt="네비게이션 이모지"
                        />
                        <NormalText>
                          {Math.floor(nearCafe.distance)}m
                        </NormalText>
                      </CardEmojiWrapper>
                      <CardEmojiWrapper>
                        <Image
                          src="/images/ddabong.svg"
                          width={16}
                          height={16}
                          alt="따봉 이모지"
                        />
                        <NormalText>
                          {nearCafe.recommendPercent
                            ? Math.floor(nearCafe.recommendPercent) + '%'
                            : 0}
                        </NormalText>
                      </CardEmojiWrapper>
                      <CardEmojiWrapper>
                        <Image
                          src="/images/heart.svg"
                          width={16}
                          height={16}
                          alt="하트 이모지"
                        />
                        <NormalText>{nearCafe.heartCnt}</NormalText>
                      </CardEmojiWrapper>
                    </CardTextWrapper>
                  </CardDescWrapper>
                </CardItem>
              ))}
          </ScrollWrapper>
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

export default DetailCafe
