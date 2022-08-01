import { useAtom } from 'jotai'
import Image from 'next/image'
import { cafeInfoAtom } from '../../store'
import { ImageWrappers } from './styles/styles'

const ImageSection = () => {
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)
  return (
    <>
      {cafeInfo && (
        <>
          {cafeInfo.storeImageList.length > 0 ? (
            <ImageWrappers>
              {cafeInfo.storeImageList.slice(0, 5).map((imgData, idx) => (
                <Image
                  src={imgData.imageUrl}
                  alt="카페 사진"
                  key={cafeInfo.storeId + idx}
                  width={392}
                  height={284}
                />
              ))}
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
