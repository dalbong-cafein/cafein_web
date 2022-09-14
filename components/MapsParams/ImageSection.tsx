import Image from 'next/image'
import React, { MouseEvent } from 'react'

import { useSetAtom } from 'jotai'
import { CafeInfoInterface, moreAtom } from 'store'

import Ic_camera from '@public/ic_camera.svg'

import {
  ImageLink,
  ImageWrappers,
  ImageWrappersLess,
  ShowMore,
  ShowMoreWrapper
} from './styles/styles'
import madeURL from 'utils/blurDataURL'

const ImageSection = ({ store }: { store: CafeInfoInterface }) => {
  const setMore = useSetAtom(moreAtom)
  const onMoreHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMore(true)
  }
  return store.storeImageList.length >= 3 ? (
    <ImageWrappers>
      {store.storeImageList.slice(0, 3).map((imgData, idx) =>
        idx === 2 ? (
          <React.Fragment key={imgData.imageId}>
            <ImageLink onClick={onMoreHandler}>
              <Image
                src={imgData.imageUrl}
                alt="카페 사진"
                key={store.storeId + idx}
                width={392}
                height={284}
                placeholder="blur"
                blurDataURL={madeURL(392, 284)}
              />
              <ShowMoreWrapper>
                <Ic_camera />
                <ShowMore>{store.storeImageList.length - 3}개 더보기</ShowMore>
              </ShowMoreWrapper>
            </ImageLink>
          </React.Fragment>
        ) : (
          <React.Fragment key={imgData.imageId}>
            <Image
              src={imgData.imageUrl}
              alt="카페 사진"
              key={idx}
              width={392}
              height={284}
              placeholder="blur"
              blurDataURL={madeURL(392, 284)}
            />
          </React.Fragment>
        )
      )}
    </ImageWrappers>
  ) : (
    <ImageWrappersLess>
      {store.storeImageList.map((imgData, idx) => (
        <React.Fragment key={imgData.imageId}>
          <Image
            src={imgData.imageUrl}
            alt="카페 사진"
            key={idx}
            width={392}
            height={284}
            placeholder="blur"
            blurDataURL={madeURL(392, 284)}
          />
        </React.Fragment>
      ))}
    </ImageWrappersLess>
  )
}

export default ImageSection
