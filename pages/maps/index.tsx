import { NextPageWithLayout } from 'pages/_app'
import { ReactElement, useEffect } from 'react'
import Head from 'next/head'
import { useAtomValue } from 'jotai'

import { mapMarkerList } from 'store'

import ErrorComponent from '@components/common/ErrorComponent'
import MapLayout from '@components/Maps/MapLayout'

const Maps: NextPageWithLayout = () => {
  const markers = useAtomValue(mapMarkerList)

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
