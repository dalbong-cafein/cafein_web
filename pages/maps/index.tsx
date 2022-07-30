import { ReactElement } from 'react'
import { SearchInput } from '../../components/Home/styles/FormStyles'
import CurrentPopularLists from '../../components/Maps/CurrentPopularLists'
import MapLayout from '../../components/Maps/MapLayout'
import RegionLists from '../../components/Maps/RegionLists'
import {
  SearchButton,
  SearchWrapper
} from '../../components/Maps/styles/FormStyles'
import { NextPageWithLayout } from '../_app'

const Maps: NextPageWithLayout<any> = () => {
  return (
    <>
      <SearchWrapper>
        <SearchInput placeholder="카페 이름이나 지하철역을 검색해보세요" />
        <SearchButton>검색</SearchButton>
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
