import { NextPageWithLayout } from 'pages/_app'
import { ReactElement, useEffect } from 'react'
import Head from 'next/head'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import { mapMarkerList, userLocationAtom } from 'store'

import ErrorComponent from '@components/common/ErrorComponent'
import MapLayout from '@components/Maps/MapLayout'
import getIpAddress from '@utils/getIpIddress'
import useSWR from 'swr'
import axios from 'axios'

const Maps: NextPageWithLayout = () => {
  const markers = useAtomValue(mapMarkerList)
  const [user, setUserLocation] = useAtom(userLocationAtom)

  useEffect(() => {
    markers.forEach((marker) => {
      marker.setMap(null)
    })
  })
  const { data: ip } = useSWR('ip', getIpAddress)

  useEffect(() => {
    console.log(user, ip)
    const fetch = async () => {
      const location = await axios({
        url: '/api/getGeolocation',
        method: 'GET',
        params: { ip }
      })
      setUserLocation(() => {
        return { latY: location.data.data.lat, lngX: location.data.data.long }
      })
    }
    fetch()
  }, [ip])

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
