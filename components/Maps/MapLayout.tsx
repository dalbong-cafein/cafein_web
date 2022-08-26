import { useAtom } from 'jotai'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { isDimmedAtom, IStore } from '../../store'
import CloseButton from '../common/CloseButton'
import DimmedAlert from '../common/DimmedAlert'
import { FlexA } from '../common/styles/CommonStyles'
import DetailCafe from '../MapsParams/DetailCaffe'
import HeaderSection from './HeaderSection'
import Map from './Map'
import { DetailWrapper, MainWrapper } from './styles/styles'

interface MapLayoutProps {
  children: JSX.Element
}

const MapLayout = ({ children }: MapLayoutProps) => {
  const router = useRouter()
  const { search, storeId } = router.query
  const [inHoverClose, setInHoverClose] = useState(false)
  const [isDimmed, setIsDimmed] = useAtom(isDimmedAtom)
  const { cafeDatas } = children.props

  useEffect(() => {
    console.log('리다이렉팅할거야', cafeDatas, 'hello')
    if (cafeDatas?.length === 1) {
      router.push({
        pathname: `maps`,
        query: {
          search,
          storeId: (cafeDatas[0] as IStore).storeId
        }
      })
    }
  }, [])

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
              <DetailCafe isSingle={true} />
            </MainWrapper>
            <Link href="/maps">
              <FlexA>
                <CloseButton
                  inHoverClose={inHoverClose}
                  setInHoverClose={setInHoverClose}
                  isSingle={true}
                />
              </FlexA>
            </Link>
          </>
        ) : (
          <>
            <MainWrapper>
              <HeaderSection hasFilter={true} />
              {children}
            </MainWrapper>
            {storeId ? (
              <>
                <DetailWrapper>
                  <DetailCafe isSingle={false} />
                </DetailWrapper>
                <Link href={{ pathname: 'maps', query: { search } }} shallow>
                  <FlexA>
                    <CloseButton
                      inHoverClose={inHoverClose}
                      setInHoverClose={setInHoverClose}
                      isSingle={false}
                    />
                  </FlexA>
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

export default MapLayout
