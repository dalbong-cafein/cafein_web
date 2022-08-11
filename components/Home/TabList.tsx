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
          href={{ pathname: '/', query: { location: '동대문구' } }}
          scroll={false}
        >
          서대문구
        </Link>
      </RecommendList>
      <RecommendList isActive={false}>
        <Link
          href={{ pathname: '/', query: { location: '남대문구' } }}
          scroll={false}
        >
          서대문구
        </Link>
      </RecommendList>
    </RecommendLists>
  )
}

export default TabList