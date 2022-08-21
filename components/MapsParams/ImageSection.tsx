import { useAtomValue, useSetAtom } from 'jotai'
import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEvent } from 'react'
import { cafeInfoAtom, moreAtom } from '../../store'
import { ImageLink, ImageWrappers, ShowMore } from './styles/styles'

const ImageSection = () => {
  const cafeInfo = useAtomValue(cafeInfoAtom)
  const setMore = useSetAtom(moreAtom)
  const onMoreHandler = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setMore(true)
  }
  return (
    <>
      {cafeInfo && (
        <>
          {cafeInfo.storeImageList.length > 0 ? (
            <ImageWrappers>
              {cafeInfo.storeImageList.slice(0, 3).map((imgData, idx) =>
                idx === 2 ? (
                  <React.Fragment key={imgData.imageId}>
                    <ImageLink onClick={onMoreHandler}>
                      <Image
                        src={imgData.imageUrl}
                        alt="카페 사진"
                        key={cafeInfo.storeId + idx}
                        width={392}
                        height={284}
                        priority={true}
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
                      priority={true}
                    />
                  </React.Fragment>
                )
              )}
            </ImageWrappers>
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

export default ImageSection
