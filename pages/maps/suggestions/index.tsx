import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'

import useSWR from 'swr'
import { useAtom } from 'jotai'
import { IStore, mapAtom, mapMarkerList } from 'store'

import { getMapItems } from '@utils/MapUtils'

import ShortCafeItem from '@components/Maps/ShortCafeItem'
import { CafeList, MainWrapper } from '@components/Maps/styles/styles'
import MapLayout from '@components/Maps/MapLayout'
import { NextPageWithLayout } from 'pages/_app'
import { fetchSggIStores } from 'apis/apis'
import ErrorComponent from '@components/common/ErrorComponent'
import Loading from '@components/common/Loading'
import HeaderSectionTemp from '@components/Maps/HeaderSuggest'

type ITypes =
  | 'allDay'
  | 'teamPlay'
  | 'noNoonChi'
  | 'alone'
  | 'cafein'
  | 'morning'

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
      map.setZoom(13)
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
