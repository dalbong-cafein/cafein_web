import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import {
  ButtonsWrapper,
  NavWrapper,
  WhiteLink,
  WhiteLinkWrapper
} from '../Home/styles/NavStyles'
import Map from './Map'
import { MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: ReactNode
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const { cafeId } = router.query

  // const SearchInput
  return (
    <>
      <Head>
        <title>카페인| 지도</title>
      </Head>
      <NavWrapper>
        <Link href="/">
          <a>
            <Image
              src={'/images/logo_black.svg'}
              alt="카페인 로고"
              width={80}
              height={21.5}
            />
          </a>
        </Link>
        {cafeId && (
          <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
        )}
        <ButtonsWrapper>
          <WhiteLinkWrapper>
            <Link href="/">
              <WhiteLink>의견 보내기</WhiteLink>
            </Link>
          </WhiteLinkWrapper>
        </ButtonsWrapper>
      </NavWrapper>
      <MainWrapper>{children}</MainWrapper>
      <Map />
    </>
  )
}

const SearchInput = styled.input`
  width: 360px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 12px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  padding-left: 18px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus-visible {
    z-index: 1;
    outline: none;
    border-color: ${(props) => props.theme.colors.orange500};
    box-shadow: ${(props) => props.theme.colors.orange500} 0 0 0 1px;
  }

  &::placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &::-webkit-input-placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &:-ms-input-placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
`

export default MapLayout
