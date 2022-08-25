import { useAtom } from 'jotai'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styled from 'styled-components'
import { isDimmedAtom, IStore } from '../../store'
import { DimmedWrapper, Logo } from '../common/Common'
import Search from '../Home/Search'
import Map from '../Maps/Map'
import { MainWrapper } from '../Maps/styles/styles'
import DetailCafe from '../MapsParams/DetailCaffe'

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
      {isDimmed ? (
        <DimmedWrapper
          isSearch={false}
          isAll={true}
          onClick={(e) => {
            if (e.currentTarget === e.target) setIsDimmed(false)
          }}
        >
          <DimmedAlertWrapper>
            <DimmedAlertHeader>
              <DimmedAlertTitle>준비중인 기능입니다</DimmedAlertTitle>
              <DimmedAlertSubTitle>
                빠른 시일 내에 이용하실 수 있도록
                <br />
                열심히 노력할게요
              </DimmedAlertSubTitle>
            </DimmedAlertHeader>
            <DimmedAlertBtn onClick={() => setIsDimmed(false)}>
              확인
            </DimmedAlertBtn>
          </DimmedAlertWrapper>
        </DimmedWrapper>
      ) : (
        ''
      )}
      {cafeDatas ? (
        cafeDatas.length === 1 ? (
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

const DimmedAlertWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 16px;
  padding: 30px 16px 16px;
  gap: 22px;
`

const DimmedAlertHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`

const DimmedAlertTitle = styled.p`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontsizes.font17}rem;
  color: ${(props) => props.theme.colors.grey800};
`

const DimmedAlertSubTitle = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey600};
  text-align: center;
`

const DimmedAlertBtn = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.orange400};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 500;
  color: white;
`

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
  z-index: 5;
`

export default MapLayout
