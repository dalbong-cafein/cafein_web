import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import {
  RecommendDesc,
  RecommendItem,
  RecommendItemsWrapper
} from './styles/RecommendStyles'

import madeURL from '@utils/blurDataURL'

import seo from '@public/서대문구'
import ma from '@public/마포구'
import dong from '@public/동대문구'
import jong from '@public/종로구'
import gang from '@public/강남구'
import seong from '@public/성북구'
import customLoader from '@utils/customLoader'

const RecommendItems = () => {
  const router = useRouter()
  const loc = router.query.sggNm ? router.query.sggNm : '서대문구'
  interface Imbti {
    [key: string]: string
  }
  interface Isrc_imgaes {
    [key: string]: StaticImageData[]
  }
  const mbti: Imbti = {
    서대문구: 'INFP',
    마포구: 'ENTJ',
    동대문구: 'INTJ',
    종로구: 'INFJ',
    강남구: 'ESFJ',
    성북구: 'ESFJ'
  }
  const src_images: Isrc_imgaes = {
    서대문구: seo,
    마포구: ma,
    동대문구: dong,
    종로구: jong,
    강남구: gang,
    성북구: seong
  }
  const recommendTypes = [
    { title: '밤늦게까지 공부 가능한 카페', engType: 'allDay' },
    { title: '눈치보지 않고\n작업할 수 있는 카페', engType: 'noNoonChi' },
    { title: '팀플하기 좋은 카페', engType: 'teamPlay' },
    { title: '혼자 공부하기 좋은 카페', engType: 'alone' },
    {
      title: `카페인 팀원 ${mbti[loc as string]}가\n추천하는 카페`,
      engType: 'cafein'
    },
    { title: '아침부터 작업하기 좋은 카페', engType: 'morning' }
  ]
  return (
    <RecommendItemsWrapper>
      {recommendTypes.map((recommend, idx) => (
        <RecommendItem key={recommend.engType}>
          <Link
            href={{
              pathname: '/maps/suggestions',
              query: { sggNm: loc, type: recommend.engType }
            }}
          >
            <a>
              <Image
                src={(src_images[loc as string] as StaticImageData[])[idx]}
                layout="fill"
                loader={customLoader}
                alt="기본 이미지"
                placeholder="blur"
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
