import MapLayout from '@components/Maps/MapLayout'
import { fetchIStores } from 'apis/apis'
import { useAtom, useAtomValue } from 'jotai'
import useSWR from 'swr'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useMemo } from 'react'
import {
  IStore,
  mapAtom,
  mapMarkerList,
  sortModeAtom,
  userLocationAtom
} from 'store'
import {
  CafeList,
  CafeListPagination,
  PageNumber,
  PaginationUlWrapper
} from '@components/Maps/styles/styles'
import { getMapItems } from '@utils/MapUtils'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NextPageWithLayout } from 'pages/_app'
import ErrorComponent from '@components/common/ErrorComponent'
import Loading from '@components/common/Loading'
import ShortCafeItem from '@components/Maps/ShortCafeItem'

import Left from '@public/pagination_left.svg'
import Right from '@public/pagination_right.svg'
import { filterCallback, sortCallback } from '@utils/sortings'

const SearchMap: NextPageWithLayout = ({
  search
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const map = useAtomValue(mapAtom)
  const [markers, setMarkers] = useAtom(mapMarkerList)
  const sortMode = useAtomValue(sortModeAtom)
  const { storeId } = router.query
  const userLocation = useAtomValue(userLocationAtom)
  const page = router.query.page ? (router.query.page as string) : 1
  const { data: cafes } = useSWR<IStore[]>(search as string, fetchIStores)

  const handleClick = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page
      }
    })
  }

  const getMaxpage = (cafes: IStore[] | undefined) => {
    if (!cafes) return
    return Array.from({ length: Math.ceil(cafes.length / 20) }, (v, i) => i + 1)
  }

  const maxPage = useMemo(() => getMaxpage(cafes), [cafes])

  const handleLeft = () => {
    const curPage = Math.ceil(Number(page) / 5)
    if (curPage === 1) return
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 5 * (curPage - 1)
      }
    })
  }

  const handleRight = () => {
    const curPage = Math.ceil(Number(page) / 5)
    if (curPage === Math.ceil((maxPage as number[]).length / 5)) return
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page: 5 * curPage + 1
      }
    })
  }

  useEffect(() => {
    if (cafes && map) {
      setMarkers(
        getMapItems(
          map,
          cafes?.slice((Number(page) - 1) * 20, Number(page) * 20) as IStore[],
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
      {!cafes || !map ? (
        <Loading />
      ) : cafes.length ? (
        <>
          <CafeList>
            {cafes
              .slice((Number(page) - 1) * 20, Number(page) * 20)
              .filter((cafe) => filterCallback(cafe, sortMode))
              .sort((cafeA, cafeB) =>
                sortCallback(cafeA, cafeB, sortMode, userLocation)
              )
              .map((cafe: IStore) => (
                <ShortCafeItem
                  cafe={cafe}
                  storeId={storeId as string}
                  router={router}
                  key={cafe.storeId}
                />
              ))}
          </CafeList>
          <CafeListPagination>
            <Left onClick={handleLeft} />
            <PaginationUlWrapper>
              {maxPage
                ?.filter(
                  (num) => Math.ceil(Number(page) / 5) === Math.ceil(num / 5)
                )
                .map((num) => (
                  <PageNumber
                    isClicked={num == page}
                    key={num}
                    onClick={() => handleClick(num)}
                  >
                    {num}
                  </PageNumber>
                ))}
            </PaginationUlWrapper>
            <Right onClick={handleRight} />
          </CafeListPagination>
        </>
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
