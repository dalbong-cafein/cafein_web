import MapLayout from '@components/Maps/MapLayout'
import { fetchIStores } from 'apis/apis'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { IStore, mapAtom, mapMarkerList } from 'store'
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
  const { storeId } = router.query
  const [markers, setMarkers] = useAtom(mapMarkerList)

  const { data: cafes } = useSWR<IStore[]>(search as string, fetchIStores)

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
