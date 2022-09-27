import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import useSWR from 'swr'

import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import styled from 'styled-components'
import {
  IStore,
  mapAtom,
  mapMarkerList,
  toastAtom,
  userLocationAtom
} from 'store'

import ShortCafeItem from '@components/Maps/ShortCafeItem'
import Ic_Logo from '@public/logo_black.svg'
import Ic_copy from '@public/copy.svg'

import initMap from '@utils/initMap'
import { getMapItems } from '@utils/MapUtils'

import { CafeList, MainWrapper } from '@components/Maps/styles/styles'
import MapLayout from '@components/Maps/MapLayout'
import { NextPageWithLayout } from 'pages/_app'
import { fetchSggIStores } from 'apis/apis'
import ErrorComponent from '@components/common/ErrorComponent'
import Loading from '@components/common/Loading'
import copyUrl from '@utils/copyUrl'

const Suggestions: NextPageWithLayout = ({
  sggNm,
  type
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [map, setMap] = useAtom(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const router = useRouter()
  const url = `sggNm=${encodeURI(sggNm as string)}&type=${encodeURI(
    type as string
  )}`
  const { data: cafes } = useSWR<IStore[]>(url, fetchSggIStores)
  const { storeId } = router.query

  useEffect(() => {
    if (cafes && map) {
      setMarkers(
        getMapItems(
          map,
          cafes?.slice(0, 20) as IStore[],
          Number(storeId) as number,
          router
        )
      )
    }
  }, [cafes, map, router])

  return (
    <>
      <Head>
        <title>카페인 | {sggNm} 추천 카페</title>
      </Head>
      <MainWrapper>
        <HeaderSectionTemp sggNm={sggNm as string} type={type as ITypes} />
        {!cafes || !map ? (
          <Loading isSuggestion={true} />
        ) : cafes.length ? (
          <CafeList isSuggestion={true}>
            {cafes.slice(0, 20).map((cafe: IStore) => (
              <ShortCafeItem
                cafe={cafe}
                storeId={storeId as string}
                router={router}
                key={cafe.storeId}
              />
            ))}
          </CafeList>
        ) : (
          <ErrorComponent storeName={sggNm} />
        )}
      </MainWrapper>
    </>
  )
}

type ITypes =
  | 'allDay'
  | 'teamPlay'
  | 'noNoonChi'
  | 'alone'
  | 'cafein'
  | 'morning'

const HeaderSectionTemp = ({
  sggNm,
  type
}: {
  sggNm: string
  type: ITypes
}) => {
  const typeEng = {
    allDay: `밤늦게까지\n공부 가능한 카페`,
    teamPlay: '팀플하기 좋은 카페',
    noNoonChi: '눈치보지 않고\n작업할 수 있는 카페',
    alone: '혼자\n공부하기 좋은 카페',
    cafein: '카페인 팀원(MBTI)이\n추천하는 카페',
    morning: '아침부터\n작업하기 좋은 카페'
  }
  const setIsToast = useSetAtom(toastAtom)
  return (
    <TempWrapper>
      <HeaderWrapper>
        <Link href="/">
          <a>
            <Ic_Logo />
          </a>
        </Link>
        <SendOpinion
          href="https://forms.gle/dCqeYDvt6ys4Yn7n7"
          target="_blank"
          rel="noreferrer"
        >
          의견 보내기
        </SendOpinion>
      </HeaderWrapper>
      <Link
        href={{
          pathname: '/',
          query: { sggNm, recommend: true }
        }}
      >
        <HomeButton>&apos;{sggNm}&apos;추천 카페 모두 보기</HomeButton>
      </Link>
      <TitleWrapper>
        <Title>{typeEng[type]}</Title>
        <StyleCopy>
          <Ic_copy onClick={() => copyUrl(window.location.href, setIsToast)} />
        </StyleCopy>
      </TitleWrapper>
    </TempWrapper>
  )
}

const StyleCopy = styled.div`
  display: flex;
  height: 14px;
  &:hover {
    cursor: pointer;
    & svg path {
      fill: ${(props) => props.theme.colors.grey600};
    }
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SendOpinion = styled.a`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey700};

  @media screen and (max-width: 900px) {
    display: none;
  }
`

const TempWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
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
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: 1.4;
`

Suggestions.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { sggNm, type } = query
  return {
    props: {
      sggNm,
      type
    }
  }
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   console.log(query)
//   if (query.sggNm && query.type) {
//     const { sggNm, type } = query

//     try {
//       const res = await axios(
//         `${process.env.API_DOMAIN}/web/stores/contents?sggNm=${encodeURI(
//           sggNm as string
//         )}&type=${encodeURI(type as string)}`
//       )
//       const data: IStore[] = res.data.data
//       return {
//         props: {
//           cafeDatas: data
//         }
//       }
//     } catch (error) {
//       console.error('또 실패다!', error)
//       return {
//         props: {}
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }

export default Suggestions
