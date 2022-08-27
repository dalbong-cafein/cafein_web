import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { useAtom } from 'jotai'
import styled from 'styled-components'
import { isDimmedAtom, IStore, mapAtom, mapMarkerList } from '../../../store'

import CloseButton from '../../../components/common/CloseButton'
import Map from '../../../components/Maps/Map'
import ShortCafeItem from '../../../components/Maps/ShortCafeItem'
import DetailCafe from '../../../components/MapsParams/DetailCaffe'

import initMap from '../../../utils/initMap'
import { getMapItems } from '../../../utils/MapUtils'

import {
  CafeList,
  DetailWrapper,
  MainWrapper
} from '../../../components/Maps/styles/styles'
import DimmedAlert from '../../../components/common/DimmedAlert'

const Suggestions: NextPage = ({
  cafeDatas
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [map, setMap] = useAtom(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const router = useRouter()
  const { sggNm, type, storeId } = router.query
  const [, setCafes] = useState(cafeDatas)
  const [isDimmed, setIsDimmed] = useAtom(isDimmedAtom)
  const isSingle = storeId ? false : true

  console.log('잘왔다', router)

  useEffect(() => {
    if (!map && sggNm) setMap(initMap.init(sggNm as string))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (map) {
      setMarkers(
        getMapItems(
          map,
          cafeDatas?.slice(0, 15) as IStore[],
          Number(storeId) as number,
          router
        )
      )
      setCafes(cafeDatas)
    }
    return () => {
      markers.forEach((marker) => marker.setMap(null))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, map])

  return (
    <>
      <Head>
        <title>카페인 | {sggNm} 추천 카페</title>
      </Head>
      {isDimmed ? <DimmedAlert setIsDimmed={setIsDimmed} /> : ''}
      <MainWrapper>
        <HeaderSectionTemp sggNm={sggNm as string} type={type as ITypes} />
        <CafeList>
          {cafeDatas.slice(0, 15).map((cafe: IStore) => (
            <ShortCafeItem
              cafe={cafe}
              storeId={storeId as string}
              router={router}
              key={cafe.storeId}
            />
          ))}
        </CafeList>
      </MainWrapper>
      {storeId ? (
        <>
          <DetailWrapper>
            <DetailCafe isSingle={isSingle} />
          </DetailWrapper>
          <Link
            passHref
            href={{ pathname: router.pathname, query: { sggNm, type } }}
          >
            <CloseButton isSingle={isSingle} />
          </Link>
        </>
      ) : (
        ''
      )}
      <Map isSingle={isSingle} />
    </>
  )
}

type ITypes =
  | 'allDay'
  | 'teamPlay'
  | 'noNoonChi'
  | 'alone'
  | 'quiet'
  | 'enfj'
  | 'morning'

const HeaderSectionTemp = ({
  sggNm,
  type
}: {
  sggNm: string
  type: ITypes
}) => {
  const typeEng = {
    allDay: '밤늦게까지      공부 가능한 카페',
    teamPlay: '팀플하기 좋은 카페',
    noNoonChi: '눈치보지 않고        작업할 수 있는 카페',
    alone: '혼자 공부하기 좋은 카페',
    quiet: '조용히                  공부하기 좋은 카페',
    enfj: '카페인 팀원       ENFJ가 추천하는 카페',
    morning: '아침부터  작업하기 좋은 카페'
  }
  return (
    <TempWrapper>
      <Link href="/">
        <TempLogo>
          <Image
            src="/images/logo_black.svg"
            width={103}
            height={22}
            alt="로고"
          />
        </TempLogo>
      </Link>
      <Link
        href={{
          pathname: '/',
          query: { sggNm }
        }}
      >
        <HomeButton>&apos;{sggNm}&apos;추천 카페 모두 보기</HomeButton>
      </Link>
      <TitleWrapper>
        <Title>{typeEng[type]}</Title>
      </TitleWrapper>
    </TempWrapper>
  )
}

const TempWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
`

const TempLogo = styled.a`
  display: flex;
  width: 103px;
  height: 22px;
`

const HomeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.orange400};
  padding: 11px 12px;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.orange500};
  margin-top: 30px;
`

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
`

const Title = styled.h1`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontsizes.font21}rem;
  color: ${(props) => props.theme.colors.grey900};
  width: 195px;
  white-space: pre-wrap;
  word-break: keep-all;
`

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query)
  if (query.sggNm && query.type) {
    const { sggNm, type } = query

    try {
      const res = await axios(
        `${process.env.API_DOMAIN}/web/stores/contents?sggNm=${encodeURI(
          sggNm as string
        )}&type=${encodeURI(type as string)}`
      )
      const data: IStore[] = res.data.data
      return {
        props: {
          cafeDatas: data
        }
      }
    } catch (error) {
      console.error('또 실패다!', error)
      return {
        props: {}
      }
    }
  }
  return {
    props: {}
  }
}

export default Suggestions
