import axios from 'axios'
import { useAtom } from 'jotai'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import { HomeTitle } from '../../components/Home/styles/FormStyles'
import CurrentPopularLists from '../../components/Maps/CurrentPopularLists'
import MapLayout from '../../components/Maps/MapLayout'
import RegionLists from '../../components/Maps/RegionLists'
import {
  MainWrapper,
  SearchButton,
  SearchInput,
  SearchWrapper
} from '../../components/Maps/styles/styles'
import { cafeInfoAtom } from '../../store'
import { NextPageWithLayout } from '../_app'

interface ImageListInterface {
  imageId: number
  imageUrl: string
}

interface CafeInfoInterface {
  storeId: number
  storeName: string
  nicknameOfModMember: string
  memberImageDto: {
    imageId: number
    imageUrl: string
  }
  address: {
    siNm: string
    sggNm: string
    detail: string
    fullAddress: string
    rnum: string
    rnm: string
  }
  wifiPassword: string
  heartCnt: number
  isHeart: false
  businessHoursInfoDto: {
    isOpen: false
    closed: string
    tmrOpen: string
  }
  totalBusinessHoursResDto: {
    onMon: {
      open: string
      closed: string
    }
    onTue: {
      open: string
      closed: string
    }
    onWed: {
      open: string
      closed: string
    }
    onThu: {
      open: string
      closed: string
    }
    onFri: {
      open: string
      closed: string
    }
    onSat: {
      open: string
      closed: string
    }
    onSun: null
    etcTime: string
  }
  lngX: number
  latY: number
  reviewImageList: ImageListInterface[]
  storeImageList: ImageListInterface[]
}

const MapPage: NextPageWithLayout = () => {
  // 주소창에 cafeId가 있으면 Detail Map을 보여줌
  const router = useRouter()
  const { cafeId } = router.query
  const [cafeInfo, setCafeInfo] = useAtom(cafeInfoAtom)

  useEffect(() => {
    if (!router.isReady || !cafeId) return
    async function getDetailStore() {
      try {
        if (cafeInfo?.storeId == cafeId) return
        const response = await axios.get(`/api/stores/${cafeId}`)
        const data: CafeInfoInterface = response.data.data
        setCafeInfo(data)
      } catch (error) {
        console.log(`GET 요청 에러 : ${error}`)
      }
    }
    getDetailStore()
  })
  console.log(cafeInfo)
  let MapContent
  if (!cafeId) {
    MapContent = (
      <>
        <SearchWrapper>
          <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
          <SearchButton>검색</SearchButton>
        </SearchWrapper>
        <RegionLists />
        <CurrentPopularLists />
      </>
    )
  } else {
    MapContent = (
      <>
        <Head>
          <title>카페인| 지도 {cafeId}</title>
        </Head>
        {cafeId && <div>hello</div>}
        {cafeInfo && <div>{cafeInfo.nicknameOfModMember}</div>}
        <HomeTitle>나는 바보</HomeTitle>
      </>
    )
  }

  return MapContent
}

MapPage.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
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
