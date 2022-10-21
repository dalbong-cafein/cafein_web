import {
  Escape,
  MainImage,
  ImageLists,
  ArrowBtn,
  ImagesWrapper,
  ImageWrapper,
  NumOfCount,
  ImageOutterWrapper,
  ImageInnerWrapper
} from './styles/styles'

import Ic_close from '@public/close.svg'
import Ic_left_arrow from '@public/left_arrow_img.svg'
import Ic_right_arrow from '@public/right_arrow_img.svg'
import Ic_water from '@public/water.svg'
import Image, { ImageProps } from 'next/image'
import { useAtom, useAtomValue } from 'jotai'
import { cafeInfoAtom, ImageListInterface, moreAtom } from 'store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import madeURL from '@utils/blurDataURL'
import useWindowSize from 'hooks/useWindowSize'
import preventDefault from '@utils/preventDefault'
import { DimmedDetailImageWrapper } from '@components/common/Common'

interface IDetailImageSection {
  isSingle: boolean
}

const DetailImageSection = ({ isSingle }: IDetailImageSection) => {
  const [more, setMore] = useAtom(moreAtom)
  const [imageId, setImageId] = useState(0)
  const router = useRouter()
  const slideRef = useRef<HTMLDivElement>(null)
  const store = useAtomValue(cafeInfoAtom)
  const { width, height } = useWindowSize()
  useEffect(() => {
    setMore(false)
    return () => setImageId(0)
  }, [router])

  const handleClick = useCallback(() => {
    setMore(false)
    setImageId(0)
  }, [router])

  const handleRight = useCallback(() => {
    if (imageId < (store?.storeImageList as ImageListInterface[]).length - 1) {
      setImageId((cur) => cur + 1)
      slideRef.current?.scrollBy({ left: 100 })
    }
  }, [router])

  const handleLeft = useCallback(() => {
    if (imageId > 0) {
      setImageId((cur) => cur - 1)
      slideRef.current?.scrollBy({ left: -100 })
    }
  }, [router])
  return (
    <>
      {more && store?.storeImageList && store?.storeImageList.length > 0 ? (
        <>
          <DimmedDetailImageWrapper
            isSearch={isSingle}
            isMobile={(width as number) <= 900}
            onContextMenu={preventDefault}
          >
            <Escape onClick={handleClick}>
              <Ic_close />
            </Escape>
            <ImageOutterWrapper>
              {store.storeImageList.map((img, idx) => (
                <MainImage key={img.imageId} isActive={idx === imageId}>
                  <Image
                    src={`${img.imageUrl}`}
                    width={480}
                    height={480}
                    // layout={'responsive'}
                    alt={'카페 사진'}
                    placeholder="blur"
                    blurDataURL={madeURL(480, 480)}
                    priority={true}
                  />
                  <Ic_water />
                </MainImage>
              ))}
              <ImageInnerWrapper>
                <ImageLists>
                  <ArrowBtn onClick={handleLeft}>
                    <Ic_left_arrow />
                  </ArrowBtn>
                  <ImagesWrapper ref={slideRef}>
                    {store?.storeImageList.map((storeImage, idx) => (
                      <ImageWrapper
                        isActive={imageId === idx}
                        key={storeImage.imageId}
                        isImage={true}
                      >
                        <Image
                          priority={true}
                          src={storeImage.imageUrl}
                          width={100}
                          height={100}
                          // layout={'responsive'}
                          alt={'카페 이미지'}
                          placeholder="blur"
                          blurDataURL={madeURL(100, 100)}
                          // unoptimized={true}
                          onClick={() => {
                            setImageId(idx)
                            slideRef.current?.scrollTo(idx * 110, 0)
                          }}
                        />
                      </ImageWrapper>
                    ))}
                  </ImagesWrapper>
                  <ArrowBtn onClick={handleRight}>
                    <Ic_right_arrow />
                  </ArrowBtn>
                </ImageLists>
                <NumOfCount>
                  {imageId + 1}/{store.storeImageList.length}
                </NumOfCount>
              </ImageInnerWrapper>
            </ImageOutterWrapper>
          </DimmedDetailImageWrapper>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default DetailImageSection
