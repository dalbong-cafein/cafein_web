import { useAtom, useAtomValue } from 'jotai'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { cafeInfoAtom, moreAtom } from '../../store'
import { DimmedWrapper } from '../common/Common'
import { MapBox } from './styles/styles'

const Map = ({ isSingle }: { isSingle: boolean }) => {
  const [more, setMore] = useAtom(moreAtom)
  const cafeInfo = useAtomValue(cafeInfoAtom)
  const [imageId, setImageId] = useState(0)
  const router = useRouter()
  useEffect(() => {
    setMore(false)
  }, [router])

  const handleClick = () => {
    setMore(false)
  }
  return (
    <>
      {more &&
      cafeInfo?.storeImageList &&
      cafeInfo?.storeImageList.length > 0 ? (
        <>
          <DimmedWrapper isSearch={isSingle}>
            <Escape onClick={handleClick}>
              <Image src={'/images/close.svg'} width={40} height={40} />
            </Escape>
            <MainImage>
              <Image
                src={`${cafeInfo?.storeImageList[0].imageUrl}`}
                width={480}
                height={480}
              />
            </MainImage>
            <ImageLists>
              <ArrowBtn>
                <Image
                  src={'/images/left_arrow_img.svg'}
                  width={40}
                  height={40}
                />
              </ArrowBtn>
              <ImagesWrapper>
                {cafeInfo?.storeImageList.slice(0, 3).map((storeImage, idx) => (
                  <ImageWrapper isActive={imageId === idx}>
                    <Image src={storeImage.imageUrl} width={100} height={100} />
                  </ImageWrapper>
                ))}
              </ImagesWrapper>
              <ArrowBtn>
                <Image
                  src={'/images/right_arrow_img.svg'}
                  width={40}
                  height={40}
                />
              </ArrowBtn>
            </ImageLists>
          </DimmedWrapper>
        </>
      ) : (
        ''
      )}
      <MapBox id="map" />
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
  width: 100px;
  height: 100px;
  flex: 0 0 100px;
  border: ${(props) => (props.isActive ? '1.6px solid white' : '')};
  scroll-snap-align: center;
`

export default Map
