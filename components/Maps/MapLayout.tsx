import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { IStore } from '../../store'
import { Logo } from '../common/Common'
import Search from '../Home/Search'
import DetailCafe from '../MapsParams/DetailCaffe'
import DetailStore from './DetailStore'
import Map from './Map'
import { MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: JSX.Element
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const { search, storeId } = router.query
  const [inHoverClose, setInHoverClose] = useState(false)
  const { cafeDatas } = children.props
  console.log(cafeDatas, 'ㅘ하하하')
  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      {cafeDatas.length === 1 ? (
        <MainWrapper>
          <Link href="/">
            <Logo>
              <Image
                src="/images/logo_black.svg"
                width={103}
                height={22}
                alt="로고"
              />
            </Logo>
          </Link>
          <Search />
          <DetailCafe cafe={cafeDatas[0] as IStore} />
          <Link href={{ pathname: 'maps', query: { search } }} shallow>
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
        </MainWrapper>
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
      )}
      <Map />
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
  top: 16px;
  z-index: 1;
`

export default MapLayout
