import axios from 'axios'
import { useAtom, useSetAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  cafeInfoAtom,
  CafeInfoInterface,
  cafeReviewPercentAtom,
  cafeReviewPonitAtom,
  CafeRewviewPointInterface,
  IStore
} from '../../store'
import CafeInfoSection from '../MapsParams/CafeInfoSection'
import CafePOintsSection from '../MapsParams/CafePointsSection'
import ImageSection from '../MapsParams/ImageSection'
import { CafeInfoWrapper } from '../MapsParams/styles/CafeInfoSectionStyle'
import RecommendSection from '../MapsParams/RecommendSection'
import { WrapperTitle } from '../MapsParams/styles/CafePointsSectionStyle'
import { DetailWrapper, OnAirBadge } from './styles/styles'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  AddButton,
  AddLink,
  AddLinkText,
  AddWrapper
} from '../Home/styles/AddOnStyles'
import Footer from '../Home/Footer'

const DetailStore = () => {
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  const [cafePoints, setCafePoints] = useAtom(cafeReviewPonitAtom)
  const setCafeReviewPercent = useSetAtom(cafeReviewPercentAtom)
  const [isHovering_1, setIsHovering_1] = useState(false)
  const [isHovering_2, setIsHovering_2] = useState(false)
  const [isHovering_3, setIsHovering_3] = useState(false)
  const [isBadQuery, setIsBadQuery] = useState(false)
  const router = useRouter()
  const { storeId } = router.query

  useEffect(() => {
    console.log('hello Funk')
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
        console.log(res.data)
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
        console.log(data, '데이터를 보여줘!!')
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
        console.error
      }
    }
    if (storeId && isNaN(+storeId)) {
      setIsBadQuery(true)
    }
    if (storeId !== cafeInfo?.storeId) {
      Promise.all([getDetailStore(), getCafePoints(), getRecommendation()])
    }
  }, [storeId])

  return (
    <DetailWrapper isDetail={storeId ? true : false}>
      <Head>
        <title>
          카페인 |{' '}
          {router.query.storeName
            ? router.query.storeName
            : cafeInfo?.storeName}
        </title>
      </Head>
      {cafeInfo && cafePoints && (
        <>
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
              <Select isOpened={false}>
                월요일
                <Image src="/images/down_arrow.svg" width={16} height={16} />
              </Select>
              <CongestionBtn>혼잡도 알려주기</CongestionBtn>
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
            <ScrollWrapper>
              <CardItem>
                <CardImgWrapper>
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                </CardImgWrapper>
                <CardDescWrapper>
                  <CardTitle>엔젤리너스 L7홍대점</CardTitle>
                  <CardTextWrapper>
                    <OnAirBadge>영업중</OnAirBadge>
                    <GreenLight>여유</GreenLight>
                  </CardTextWrapper>
                  <CardTextWrapper>
                    <CardEmojiWrapper>
                      <Image
                        src="/images/navigation.svg"
                        width={16}
                        height={16}
                      />
                      <NormalText>150m</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/ddabong.svg" width={16} height={16} />
                      <NormalText>79%</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/heart.svg" width={16} height={16} />
                      <NormalText>12</NormalText>
                    </CardEmojiWrapper>
                  </CardTextWrapper>
                </CardDescWrapper>
              </CardItem>
              <CardItem>
                <CardImgWrapper>
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                </CardImgWrapper>
                <CardDescWrapper>
                  <CardTitle>엔젤리너스 L7홍대점</CardTitle>
                  <CardTextWrapper>
                    <OnAirBadge>영업중</OnAirBadge>
                    <GreenLight>여유</GreenLight>
                  </CardTextWrapper>
                  <CardTextWrapper>
                    <CardEmojiWrapper>
                      <Image
                        src="/images/navigation.svg"
                        width={16}
                        height={16}
                      />
                      <NormalText>150m</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/ddabong.svg" width={16} height={16} />
                      <NormalText>79%</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/heart.svg" width={16} height={16} />
                      <NormalText>12</NormalText>
                    </CardEmojiWrapper>
                  </CardTextWrapper>
                </CardDescWrapper>
              </CardItem>
              <CardItem>
                <CardImgWrapper>
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                </CardImgWrapper>
                <CardDescWrapper>
                  <CardTitle>엔젤리너스 L7홍대점</CardTitle>
                  <CardTextWrapper>
                    <OnAirBadge>영업중</OnAirBadge>
                    <GreenLight>여유</GreenLight>
                  </CardTextWrapper>
                  <CardTextWrapper>
                    <CardEmojiWrapper>
                      <Image
                        src="/images/navigation.svg"
                        width={16}
                        height={16}
                      />
                      <NormalText>150m</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/ddabong.svg" width={16} height={16} />
                      <NormalText>79%</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/heart.svg" width={16} height={16} />
                      <NormalText>12</NormalText>
                    </CardEmojiWrapper>
                  </CardTextWrapper>
                </CardDescWrapper>
              </CardItem>
              <CardItem>
                <CardImgWrapper>
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                  <Image src="/images/temp_img.png" width={70} height={70} />
                </CardImgWrapper>
                <CardDescWrapper>
                  <CardTitle>엔젤리너스 L7홍대점</CardTitle>
                  <CardTextWrapper>
                    <OnAirBadge>영업중</OnAirBadge>
                    <GreenLight>여유</GreenLight>
                  </CardTextWrapper>
                  <CardTextWrapper>
                    <CardEmojiWrapper>
                      <Image
                        src="/images/navigation.svg"
                        width={16}
                        height={16}
                      />
                      <NormalText>150m</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/ddabong.svg" width={16} height={16} />
                      <NormalText>79%</NormalText>
                    </CardEmojiWrapper>
                    <CardEmojiWrapper>
                      <Image src="/images/heart.svg" width={16} height={16} />
                      <NormalText>12</NormalText>
                    </CardEmojiWrapper>
                  </CardTextWrapper>
                </CardDescWrapper>
              </CardItem>
              
            </ScrollWrapper>
          </CafeInfoWrapper>
          <AddWrapper2>
            <AddLink2>
              <AddLinkText2>
                추천하고 싶은 카페가 있다면 알려주세요
              </AddLinkText2>
              <Link href="/">
                <AddButton2>카페 등록하기</AddButton2>
              </Link>
            </AddLink2>
          </AddWrapper2>
          <Footer isHome={false} />
        </>
      )}
    </DetailWrapper>
  )
}

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
  display: flex;
  margin: 0 -34px 0 -20px;
  padding: 16px 0;
  gap: 12px;
  background-color: ${(props) => props.theme.colors.white};
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;

  &::after, &::before {
    content: '';
    width: 20px;
    display: block;
  }

  ${(props) => props.theme.mixins.scroll_x}

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
`

export default DetailStore
