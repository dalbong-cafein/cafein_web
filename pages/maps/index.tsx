import { Props } from 'next/script'
import { ReactElement } from 'react'
import CurrentPopularLists from '../../components/Maps/CurrentPopularLists'
import MapLayout from '../../components/Maps/MapLayout'
import RegionLists from '../../components/Maps/RegionLists'
import {
  SearchListInput,
  SearchWrapper
} from '../../components/Maps/styles/FormStyles'
import { NextPageWithLayout } from '../_app'

const Maps: NextPageWithLayout<Props> = () => {
  return (
    <>
      <SearchWrapper>
        <SearchListInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
      </SearchWrapper>
      <RegionLists />
      <CurrentPopularLists />
    </>
  )
}

Maps.getLayout = function getLayout(page: ReactElement) {
  return <MapLayout>{page}</MapLayout>
}

export default Maps
