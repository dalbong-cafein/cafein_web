import Link from 'next/link'
import { RecommendList, RecommendLists } from './styles/RecommendStyles'

const TabList = () => {
  return (
    <RecommendLists>
      <RecommendList isActive={true}>
        <Link
          href={{ pathname: '/', query: { location: '서대문구' } }}
          scroll={false}
        >
          서대문구
        </Link>
      </RecommendList>
      <RecommendList isActive={false}>
        <Link
          href={{ pathname: '/', query: { location: '마포구' } }}
          scroll={false}
        >
          마포구
        </Link>
      </RecommendList>
      <RecommendList isActive={false}>
        <Link
          href={{ pathname: '/', query: { location: '동대문구' } }}
          scroll={false}
        >
          동대문구
        </Link>
      </RecommendList>
      <RecommendList isActive={false}>
        <Link
          href={{ pathname: '/', query: { location: '종로구' } }}
          scroll={false}
        >
          종로구
        </Link>
      </RecommendList>
      <RecommendList isActive={false}>
        <Link
          href={{ pathname: '/', query: { location: '강남구' } }}
          scroll={false}
        >
          강남구
        </Link>
      </RecommendList>
      <RecommendList isActive={false}>
        <Link
          href={{ pathname: '/', query: { location: '성북구' } }}
          scroll={false}
        >
          성북구
        </Link>
      </RecommendList>
    </RecommendLists>
  )
}

export default TabList
