import { DimmedWrapper } from '@components/common/Common'
import {
  Escape,
  MainImage,
  ImageLists,
  ArrowBtn,
  ImagesWrapper,
  ImageWrapper,
  NumOfCount
} from './styles/styles'

import Ic_close from '@public/close.svg'
import Ic_left_arrow from '@public/left_arrow_img.svg'
import Ic_right_arrow from '@public/right_arrow_img.svg'
import Ic_water from '@public/water.svg'
import Image from 'next/image'
import { useAtom, useAtomValue } from 'jotai'
import { cafeInfoAtom, ImageListInterface, moreAtom } from 'store'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import madeURL from '@utils/blurDataURL'

interface ImageProps {
  isSingle: boolean
}

const DetailImageSection = ({ isSingle }: ImageProps) => {
  const [more, setMore] = useAtom(moreAtom)
  const [imageId, setImageId] = useState(0)
  const router = useRouter()
  const slideRef = useRef<HTMLDivElement>(null)
  const store = useAtomValue(cafeInfoAtom)
  useEffect(() => {
    setMore(false)
    return () => setImageId(0)
  }, [router])
  const handleClick = () => {
    setMore(false)
    setImageId(0)
  }

  const handleRight = () => {
    if (imageId < (store?.storeImageList as ImageListInterface[]).length - 1) {
      setImageId((cur) => cur + 1)
      console.log(slideRef.current?.scrollLeft)
      slideRef.current?.scrollBy({ left: 100 })
    }
  }
  const handleLeft = () => {
    if (imageId > 0) {
      setImageId((cur) => cur - 1)
      console.log(slideRef.current?.scrollLeft)
      slideRef.current?.scrollBy({ left: -100 })
    }
  }
  return (
    <>
      {more && store?.storeImageList && store?.storeImageList.length > 0 ? (
        <>
          <DimmedWrapper isSearch={isSingle}>
            <Escape onClick={handleClick}>
              <Ic_close />
            </Escape>
            <MainImage>
              <Image
                src={`${store?.storeImageList[imageId].imageUrl}`}
                width={480}
                height={480}
                alt={'카페 사진'}
                placeholder="blur"
                blurDataURL={madeURL(480, 480)}
              />
              <Ic_water />
            </MainImage>
            <ImageLists>
              <ArrowBtn onClick={handleLeft}>
                <Ic_left_arrow />
              </ArrowBtn>
              <ImagesWrapper ref={slideRef}>
                <ImageWrapper isActive={false} isImage={false} />
                <ImageWrapper isActive={false} isImage={false} />
                {store?.storeImageList.map((storeImage, idx) => (
                  <ImageWrapper
                    isActive={imageId === idx}
                    key={storeImage.imageId}
                    isImage={true}
                  >
                    <Image
                      src={storeImage.imageUrl}
                      width={100}
                      height={100}
                      alt={'카페 이미지'}
                      priority
                      placeholder="blur"
                      blurDataURL={madeURL(100, 100)}
                      onClick={() => {
                        setImageId(idx)
                        slideRef.current?.scrollBy({
                          left: (idx - imageId) * 100
                        })
                      }}
                    />
                  </ImageWrapper>
                ))}
                <ImageWrapper isActive={false} isImage={false} />
                <ImageWrapper isActive={false} isImage={false} />
              </ImagesWrapper>
              <ArrowBtn onClick={handleRight}>
                <Ic_right_arrow />
              </ArrowBtn>
            </ImageLists>
            <NumOfCount>
              {imageId + 1}/{store.storeImageList.length}
            </NumOfCount>
          </DimmedWrapper>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default DetailImageSection
