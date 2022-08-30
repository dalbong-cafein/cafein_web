import Image from 'next/image'
import React, { MouseEvent } from 'react'

import { useSetAtom } from 'jotai'
import { CafeInfoInterface, moreAtom } from 'store'

import { ImageLink, ImageWrappers, ShowMore } from './styles/styles'
import madeURL from 'utils/blurDataURL'

const ImageSection = ({ store }: { store: CafeInfoInterface }) => {
  const setMore = useSetAtom(moreAtom)
  const onMoreHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMore(true)
  }
  return (
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
              <ShowMore>더보기</ShowMore>
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
  )
}

export default ImageSection
