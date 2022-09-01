import MapLayout from '@components/Maps/MapLayout'
import { fetchIStores } from 'apis/apis'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { IStore, mapAtom, mapMarkerList, sortModeAtom } from 'store'
import { CafeList } from '@components/Maps/styles/styles'
import ShortCafeItem from '@components/Maps/ShortCafeItem'
import { getMapItems } from '@utils/MapUtils'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NextPageWithLayout } from 'pages/_app'
import ErrorComponent from '@components/common/ErrorComponent'
import Loading from '@components/common/Loading'

const SearchMap: NextPageWithLayout = ({
  search
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const map = useAtomValue(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const sortMode = useAtomValue(sortModeAtom)
  const { storeId } = router.query

  const { data: cafes } = useSWR<IStore[]>(search as string, fetchIStores)

  const sortedCafes = cafes?.slice().sort((a, b) => {
    if (a.recommendPercent && b.recommendPercent) {
      return b.recommendPercent - a.recommendPercent
    } else if (a.recommendPercent) {
      return -1
    } else if (b.recommendPercent) {
      return 1
    }
    return 0
  })

  const onAirCafes = cafes?.filter((cafe) => cafe.businessHoursInfoDto?.isOpen)

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
    return () => {
      markers.forEach((marker) => {
        marker.setMap(null)
      })
    }
  }, [cafes, map, router])

  return (
    <>
      <Head>
        <title>카페인 | {search}</title>
      </Head>
      {!cafes ? (
        <Loading />
      ) : cafes.length ? (
        <CafeList>
          {sortMode === 0
            ? cafes
                .slice(0, 20)
                .map((cafe: IStore) => (
                  <ShortCafeItem
                    cafe={cafe}
                    storeId={storeId as string}
                    router={router}
                    key={cafe.storeId}
                  />
                ))
            : sortMode === 1
            ? (onAirCafes as IStore[])
                .slice(0, 20)
                .map((cafe: IStore) => (
                  <ShortCafeItem
                    cafe={cafe}
                    storeId={storeId as string}
                    router={router}
                    key={cafe.storeId}
                  />
                ))
            : (sortedCafes as IStore[])
                .slice(0, 20)
                .map((cafe: IStore) => (
                  <ShortCafeItem
                    cafe={cafe}
                    storeId={storeId as string}
                    router={router}
                    key={cafe.storeId}
                  />
                ))}
        </CafeList>
      ) : (
        <ErrorComponent storeName={search} />
      )}
    </>
  )
}

SearchMap.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { search } = query
  return {
    props: {
      search
    }
  }
}

export default SearchMap
