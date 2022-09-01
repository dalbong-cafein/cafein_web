import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useAtom, useAtomValue } from 'jotai'

import {
  mapMarkerList,
  searchedAtom,
  searchInputAtom,
  searchListsAtom
} from 'store'

import ErrorComponent from '@components/common/ErrorComponent'
import MapLayout from '@components/Maps/MapLayout'
import { NextPageWithLayout } from 'pages/_app'
import Loading from '@components/common/Loading'

const Maps: NextPageWithLayout = () => {
  const [inputs, setInputs] = useAtom(searchInputAtom)
  const router = useRouter()
  const { storeId } = router.query
  const searchedCafes = useAtomValue(searchedAtom)
  const searchLists = useAtomValue(searchListsAtom)
  const markers = useAtomValue(mapMarkerList)

  console.log(markers)

  useEffect(() => {
    markers.forEach((marker) => {
      marker.setMap(null)
    })
  })

  return (
    <>
      <Head>
        <title>카페인 | 지도</title>
      </Head>
      <ErrorComponent />
    </>
  )
}

Maps.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   if (query.search) {
//     const { search } = query
//     console.log(search, 'search')
//     try {
//       const res = await axios(
//         `${process.env.API_DOMAIN}/web/stores?keyword=${encodeURI(
//           search as string
//         )}`
//       )
//       const data: IStore[] = res.data.data
//       return {
//         props: {
//           search,
//           cafeDatas: data
//         }
//       }
//     } catch (error) {
//       console.error('또 실패다!', error)
//       return {
//         props: { search }
//       }
//     }
//   }
//   return {
//     props: {}
//   }
// }

export default Maps
