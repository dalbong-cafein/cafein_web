import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  RecommendDesc,
  RecommendItem,
  RecommendItemsWrapper
} from './styles/RecommendStyles'

const RecommendItems = () => {
  const router = useRouter()
  const loc = router.query.sggNm ? router.query.sggNm : '서대문구'

  const recommendTypes = [
    { title: '밤늦게까지 공부 가능한 카페', engType: 'allDay' },
    { title: '눈치보지 않고 작업할 수 있는 카페', engType: 'noNoonChi' },
    { title: '팀플하기 좋은 카페', engType: 'teamPlay' },
    { title: '혼자 공부하기 좋은 카페', engType: 'alone' },
    { title: '조용히 공부하기 좋은 카페', engType: 'quiet' },
    { title: '카페인 팀원 ENFJ가 추천하는 카페', engType: 'enfj' },
    { title: '아침부터 작업하기 좋은 카페', engType: 'morning' }
  ]
  return (
    <RecommendItemsWrapper>
      {recommendTypes.map((recommend) => (
        <RecommendItem key={recommend.engType}>
          <Link
            href={{
              pathname: '/maps/suggestions',
              query: { sggNm: loc, type: recommend.engType }
            }}
          >
            <a>
              <Image
                src={'/images/temp_img.png'}
                layout="fill"
                width={364}
                height={240}
                alt="기본 이미지"
              />
              <RecommendDesc>{recommend.title}</RecommendDesc>
            </a>
          </Link>
        </RecommendItem>
      ))}
    </RecommendItemsWrapper>
  )
}

export default RecommendItems
