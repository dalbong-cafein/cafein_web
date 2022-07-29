import Head from 'next/head'
import CurrentPopularLists from '../../components/Maps/CurrentPopularLists'
import MapLayout from '../../components/Maps/MapLayout'
import RegionLists from '../../components/Maps/RegionLists'
import {
  MainWrapper,
  SearchButton,
  SearchInput,
  SearchWrapper
} from '../../components/Maps/styles'

const MapPage = () => {
  // console.log(userInfo)
  // const [userIp, setUserIp] = useAtom(userIpAtom)
  // const [lati, longi] = userInfo.loc.split(',').map((v) => Number(v))
  // console.log(lati, longi)
  // setUserIp({ ip: userInfo.ip, lati, longi })
  return (
    <MapLayout>
      <Head>
        <title>카페인|지도</title>
      </Head>
      <MainWrapper>
        <SearchWrapper>
          <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
          <SearchButton>검색</SearchButton>
        </SearchWrapper>
        <RegionLists />
        <CurrentPopularLists />
      </MainWrapper>
    </MapLayout>
  )
}

// interface UserInfo {
//   city: string
//   country: string
//   ip: string
//   loc: string
//   org: string
//   postal: string
//   region: string
//   timezone: string
// }

// export const getServerSideProps = async () => {
//   const request = await fetch('https://ipinfo.io/json?token=5a0c6e1cf47970')
//   const userInfo: UserInfo = await request.json()
//   return {
//     props: {
//       userInfo
//     }
//   }
// }

export default MapPage
