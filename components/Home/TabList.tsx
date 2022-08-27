import Link from 'next/link'
import { useRouter } from 'next/router'

import { RecommendList, RecommendLists } from './styles/RecommendStyles'

const TabList = () => {
  const router = useRouter()
  const { sggNm } = router.query
  const sggNmes = [
    '서대문구',
    '마포구',
    '동대문구',
    '종로구',
    '강남구',
    '성북구'
  ]
  return (
    <RecommendLists>
      {sggNmes.map((location, idx) => (
        <RecommendList
          isActive={
            !sggNm
              ? idx === 0
                ? true
                : false
              : sggNm === location
              ? true
              : false
          }
          key={location}
        >
          <Link
            href={{ pathname: '/', query: { sggNm: location } }}
            scroll={false}
          >
            {location}
          </Link>
        </RecommendList>
      ))}
    </RecommendLists>
  )
}

export default TabList
