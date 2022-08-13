import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { Logo } from '../common/Common'
import DetailStore from './DetailStore'
import Map from './Map'
import { DetailWrapper, MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: ReactNode
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const { search, storeId } = router.query
  const [inHoverClose, setInHoverClose] = useState(false)
  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      <MainWrapper>{children}</MainWrapper>
      {storeId ? (
        <>
          <DetailStore />
          <Link href={{ pathname: 'maps', query: { search } }} shallow>
            <CloseImage
              onClick={() => setInHoverClose(false)}
              onMouseEnter={() => setInHoverClose(true)}
              onMouseLeave={() => setInHoverClose(false)}
            >
              {inHoverClose ? (
                <Image
                  src="/images/orange_close.svg"
                  alt="닫기 아이콘"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/images/white_close.svg"
                  alt="닫기 아이콘"
                  width={24}
                  height={24}
                />
              )}
            </CloseImage>
          </Link>
        </>
      ) : (
        ''
      )}
      <Map />
    </>
  )
}

const CloseImage = styled.a`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  left: 800px;
  top: 16px;
  z-index: 2;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 0 8px 8px 0;
  border: 0.8px solid ${(props) => props.theme.colors.grey200};
  border-left: none;

  &:hover {
    border-color: ${(props) => props.theme.colors.orange300};
  }
`

export default MapLayout
