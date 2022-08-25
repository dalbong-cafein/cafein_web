import { useRouter } from 'next/router'
import RecommendItems from './RecommendItems'
import { SearchButton } from './styles/FormStyles'
import {
  RecommendHeadWrapper,
  RecommendSubWrapper,
  RecommendTitle,
  RecommendWrapper
} from './styles/RecommendStyles'
import TabList from './TabList'

const RecommendSection = () => {
  const router = useRouter()
  const mapHandler = () => {
    router.push('/maps')
  }
  return (
    <RecommendWrapper>
      <RecommendSubWrapper>
        <RecommendHeadWrapper>
          <RecommendTitle>지역별 카페 추천</RecommendTitle>
          <TabList />
        </RecommendHeadWrapper>
        <SearchButton onClick={mapHandler}>지도에서 카페 찾기</SearchButton>
      </RecommendSubWrapper>
      <RecommendItems />
    </RecommendWrapper>
  )
}

export default RecommendSection
