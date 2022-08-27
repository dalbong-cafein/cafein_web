import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { useAtom, useAtomValue } from 'jotai'
import styled from 'styled-components'
import {
  cafeInfoAtom,
  ImageListInterface,
  mapAtom,
  moreAtom
} from '../../store'

import { DimmedWrapper } from '../common/Common'

import { MapBox } from './styles/styles'

const Map = ({ isSingle }: { isSingle: boolean }) => {
  const [more, setMore] = useAtom(moreAtom)
  const cafeInfo = useAtomValue(cafeInfoAtom)
  const [imageId, setImageId] = useState(0)
  const router = useRouter()
  const mapRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  const map = useAtomValue(mapAtom)

  useEffect(() => {
    setMore(false)
  }, [router])

  useEffect(() => {
    console.log('맵이 있냐??')
    console.log(mapRef)
    console.log(map)
  }, [mapRef])

  const handleClick = () => {
    setMore(false)
    setImageId(0)
  }

  const handleRight = () => {
    if (
      imageId <
      (cafeInfo?.storeImageList as ImageListInterface[]).length - 1
    ) {
      setImageId((cur) => cur + 1)
      slideRef.current?.scrollBy({ left: 100 })
    }
  }
  const handleLeft = () => {
    if (imageId > 0) {
      setImageId((cur) => cur - 1)
      slideRef.current?.scrollBy({ left: -100 })
    }
  }
  console.log(imageId, slideRef.current?.scrollLeft)
  return (
    <>
      {more &&
      cafeInfo?.storeImageList &&
      cafeInfo?.storeImageList.length > 0 ? (
        <>
          <DimmedWrapper isAll={false} isSearch={isSingle}>
            <Escape onClick={handleClick}>
              <Image src={'/images/close.svg'} width={40} height={40} />
            </Escape>
            <MainImage>
              <Image
                src={`${cafeInfo?.storeImageList[imageId].imageUrl}`}
                width={480}
                height={480}
              />
            </MainImage>
            <ImageLists>
              <ArrowBtn onClick={handleLeft}>
                <Image
                  src={'/images/left_arrow_img.svg'}
                  width={40}
                  height={40}
                />
              </ArrowBtn>
              <ImagesWrapper ref={slideRef}>
                <ImageWrapper isActive={false} />
                <ImageWrapper isActive={false} />
                {cafeInfo?.storeImageList.map((storeImage, idx) => (
                  <ImageWrapper
                    isActive={imageId === idx}
                    key={storeImage.imageId}
                  >
                    <Image src={storeImage.imageUrl} width={100} height={100} />
                  </ImageWrapper>
                ))}
                <ImageWrapper isActive={false} />
                <ImageWrapper isActive={false} />
              </ImagesWrapper>
              <ArrowBtn onClick={handleRight}>
                <Image
                  src={'/images/right_arrow_img.svg'}
                  width={40}
                  height={40}
                />
              </ArrowBtn>
            </ImageLists>
            <NumOfCount>
              {imageId + 1}/{cafeInfo.storeImageList.length}
            </NumOfCount>
          </DimmedWrapper>
        </>
      ) : (
        ''
      )}
      <MapBox ref={mapRef} id="map" />
    </>
  )
}

const Escape = styled.div`
  display: flex;
  position: absolute;
  right: 36.6px;
  top: 36.6px;

  &:hover {
    cursor: pointer;
  }
`

const MainImage = styled.div`
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 106px;
  width: 480px;
  height: 480px;
`

const ImageLists = styled.ul`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  top: 646px;
`

const ArrowBtn = styled.div`
  width: 80px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`

const ImagesWrapper = styled.div`
  display: flex;
  gap: 10px;
  max-width: 540px;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  ${(props) => props.theme.mixins.scroll_x}
`

const ImageWrapper = styled.div<{ isActive: boolean }>`
  box-sizing: content-box;
  width: 100px;
  height: 100px;
  flex: 0 0 100px;
  border: ${(props) => (props.isActive ? '1.6px solid white' : '')};
  scroll-snap-align: center;
`

const NumOfCount = styled.div`
  position: absolute;
  top: 770px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: white;
  font-weight: 500;
`

export default Map
