import { OnAirBadge } from '@components/Maps/styles/ShortCafeStyles'
import Image from 'next/image'
import styled from 'styled-components'
import { CafeInfoWrapper } from './styles/CafeInfoSectionStyle'
import { PercentBadge, WrapperTitle } from './styles/CafePointsSectionStyle'

import Ic_navigation from '@public/navigation.svg'
import Ic_heart from '@public/heart.svg'
import Ic_like from '@public/ddabong.svg'
import Ic_left_arrow_off from '@public/left_arrow_off.svg'
import Ic_right_arrow_off from '@public/right_arrow_off.svg'
import temp_img from '@public/no_img.png'
import { CafeInfoInterface, INearCafe } from 'store'
import madeURL from '@utils/blurDataURL'
import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import customLoader from '@utils/customLoader'

const NearCafeSection = ({
  store,
  nearStores
}: {
  store: CafeInfoInterface
  nearStores: INearCafe[]
}) => {
  const scrollRef = useRef<HTMLUListElement>(null)
  const router = useRouter()
  const [curScrollId, setCurScrollId] = useState(0)
  let timer: NodeJS.Timeout | undefined

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [store])

  const onClickRight = () => {
    handleScroll()
    scrollRef.current?.scrollBy({ left: 250, behavior: 'smooth' })
  }
  const onClickLeft = () => {
    handleScroll()
    scrollRef.current?.scrollBy({ left: -250, behavior: 'smooth' })
  }

  const debounceScroll = () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(handleScroll, 100)
  }

  const handleScroll = () => {
    if (
      (scrollRef.current as HTMLUListElement).scrollLeft + 450 >
      (scrollRef.current as HTMLUListElement).scrollWidth
    ) {
      setCurScrollId(nearStores.length - 1)
    } else if (scrollRef.current?.scrollLeft === 0) {
      setCurScrollId(0)
    } else {
      setCurScrollId(1)
    }
  }

  const handleNearCafe = (
    nearCafe: INearCafe,
    evt: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>
  ) => {
    // const marker = new naver.maps.Marker(nearCafe.latY, nearCafe.lngX)
  }

  return (
    <CafeInfoWrapper>
      <WrapperTitle>근처에 있는 카공 카페를 찾아봤어요</WrapperTitle>
      {curScrollId !== 0 ? (
        <LeftArrowBtn>
          <Ic_left_arrow_off onClick={onClickLeft} />
        </LeftArrowBtn>
      ) : (
        ''
      )}

      {curScrollId !== nearStores.length - 1 ? (
        <RightArrowBtn onClick={onClickRight}>
          <Ic_right_arrow_off />
        </RightArrowBtn>
      ) : (
        ''
      )}

      {
        <ScrollWrapper ref={scrollRef} onScroll={debounceScroll}>
          {nearStores.map((nearCafe) => (
            <CardItem key={String(nearCafe.storeId) + store.storeId}>
              <Link
                href={{
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    storeId: nearCafe.storeId
                  }
                }}
              >
                <CardItemLink onClick={(evt) => handleNearCafe(nearCafe, evt)}>
                  <CardImgWrapper>
                    {nearCafe.storeImageDtoList.length ? (
                      nearCafe.storeImageDtoList.map((storeImage) => (
                        <Image
                          priority={true}
                          src={storeImage.imageUrl}
                          width={70}
                          height={70}
                          loader={customLoader}
                          alt="카페 섬네일 이미지"
                          key={storeImage.imageId}
                          placeholder="blur"
                          blurDataURL={madeURL(70, 70)}
                        />
                      ))
                    ) : (
                      <>
                        <Image
                          priority={true}
                          src={temp_img}
                          width={70}
                          height={70}
                          loader={customLoader}
                          placeholder="blur"
                          alt="기본 이미지"
                        />
                        <Image
                          priority={true}
                          src={temp_img}
                          width={70}
                          height={70}
                          loader={customLoader}
                          placeholder="blur"
                          alt="기본 이미지"
                        />
                        <Image
                          priority={true}
                          src={temp_img}
                          width={70}
                          height={70}
                          loader={customLoader}
                          placeholder="blur"
                          alt="기본 이미지"
                        />
                      </>
                    )}
                  </CardImgWrapper>
                  <CardDescWrapper>
                    <CardTitle>{nearCafe.storeName}</CardTitle>
                    {nearCafe.businessHoursInfoDto.closed ||
                    nearCafe.recommendPercent ? (
                      <CardTextWrapper>
                        {nearCafe.businessHoursInfoDto.closed && (
                          <OnAirBadge
                            isOpen={
                              nearCafe.businessHoursInfoDto.isOpen
                                ? true
                                : false
                            }
                          >
                            {nearCafe.businessHoursInfoDto.isOpen
                              ? '영업중'
                              : '영업종료'}
                          </OnAirBadge>
                        )}
                        {nearCafe.recommendPercent ? (
                          nearCafe.recommendPercent < 37.5 ? (
                            <PercentBadge
                              color="#515151"
                              backgroundColor="#EFEFEF"
                            >
                              아쉬움
                            </PercentBadge>
                          ) : nearCafe.recommendPercent < 75.1 ? (
                            <PercentBadge
                              color="#FF9800"
                              backgroundColor="#FFF3E0"
                            >
                              무난
                            </PercentBadge>
                          ) : (
                            <PercentBadge
                              color="#26ba6a"
                              backgroundColor="#dff5e8"
                            >
                              추천
                            </PercentBadge>
                          )
                        ) : (
                          ''
                        )}
                      </CardTextWrapper>
                    ) : (
                      ''
                    )}
                    <CardTextWrapper>
                      <CardEmojiWrapper>
                        <Ic_navigation />
                        <NormalText>
                          {Math.floor(nearCafe.distance)}m
                        </NormalText>
                      </CardEmojiWrapper>
                    </CardTextWrapper>
                  </CardDescWrapper>
                </CardItemLink>
              </Link>
            </CardItem>
          ))}
        </ScrollWrapper>
      }
    </CafeInfoWrapper>
  )
}

export default NearCafeSection

const ScrollWrapper = styled.ul`
  position: relative;
  display: flex;
  margin: 0 -34px 0 -20px;
  padding: 16px 8px;
  gap: 12px;
  background-color: ${(props) => props.theme.colors.white};
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  z-index: 0;

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
  box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.1);
  scroll-snap-align: center;
`

const CardItemLink = styled.a`
  box-sizing: border-box;
  display: flex;
  padding: 12px;
  flex: 0 0 246px;
  flex-direction: column;
  gap: 10px;
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
