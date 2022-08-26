import { useAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { isDimmedAtom, IStore } from '../../store'
import { Logo } from '../common/Common'
import DimmedAlert from '../common/DimmedAlert'
import Search from '../Home/Search'
import DetailCafe from '../MapsParams/DetailCaffe'
import DetailStore from './DetailStore'
import HeaderSection from './HeaderSection'
import Map from './Map'
import { MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: JSX.Element
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const { search, storeId } = router.query
  const [inHoverClose, setInHoverClose] = useState(false)
  const [isDimmed, setIsDimmed] = useAtom(isDimmedAtom)
  const { cafeDatas } = children.props
  console.log(cafeDatas, 'ㅘ하하하')
  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      {isDimmed ? <DimmedAlert setIsDimmed={setIsDimmed} /> : ''}
      {cafeDatas ? (
        cafeDatas.length === 1 ? (
          <>
            <MainWrapper>
              <HeaderSection hasFilter={false} />
              <DetailCafe cafe={cafeDatas[0] as IStore} />
            </MainWrapper>
            <Link href={{ pathname: 'maps' }}>
              <CloseImage
                isSingle={true}
                onClick={() => setInHoverClose(false)}
                onMouseEnter={() => setInHoverClose(true)}
                onMouseLeave={() => setInHoverClose(false)}
              >
                {inHoverClose ? (
                  <Image
                    src="/images/orange_close.svg"
                    alt="닫기 아이콘"
                    width={44}
                    height={44}
                  />
                ) : (
                  <Image
                    src="/images/white_close.svg"
                    alt="닫기 아이콘"
                    width={44}
                    height={44}
                  />
                )}
              </CloseImage>
            </Link>
          </>
        ) : (
          <>
            <MainWrapper>{children}</MainWrapper>
            {storeId ? (
              <>
                <DetailStore />
                <Link href={{ pathname: 'maps', query: { search } }} shallow>
                  <CloseImage
                    isSingle={false}
                    onClick={() => setInHoverClose(false)}
                    onMouseEnter={() => setInHoverClose(true)}
                    onMouseLeave={() => setInHoverClose(false)}
                  >
                    {inHoverClose ? (
                      <Image
                        src="/images/orange_close.svg"
                        alt="닫기 아이콘"
                        width={44}
                        height={44}
                      />
                    ) : (
                      <Image
                        src="/images/white_close.svg"
                        alt="닫기 아이콘"
                        width={44}
                        height={44}
                      />
                    )}
                  </CloseImage>
                </Link>
              </>
            ) : (
              ''
            )}
          </>
        )
      ) : (
        <MainWrapper>{children}</MainWrapper>
      )}
      {cafeDatas ? (
        <Map isSingle={cafeDatas.length === 1 ? true : false} />
      ) : (
        <Map isSingle={true} />
      )}
    </>
  )
}

const CloseImage = styled.a<{ isSingle: boolean }>`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  left: ${(props) => (props.isSingle ? '400px' : '800px')};
  top: ${(props) => (props.isSingle ? '145px' : '16px')};
  z-index: 5;
`

export default MapLayout
