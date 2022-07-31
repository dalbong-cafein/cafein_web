import Link from 'next/link'
import {
  RegionItem,
  RegionItemImage,
  RegionItemTitle,
  RegionList,
  RegionTitle,
  RegionWrapper
} from './styles/styles'

export default function RegionLists() {
  return (
    <RegionWrapper>
      <RegionTitle>지역별 카공하기 좋은 카페</RegionTitle>
      <RegionList role={'tablist'}>
        <Link
          href={{ pathname: '/maps/1', query: { title: '카페 1번', id: 1 } }}
          as="/maps/1"
        >
          <RegionItem role={'tab'}>
            <RegionItemImage
              src={'https://nextjs.org/static/images/learn.png'}
              width={220}
              height={160}
              layout="fixed"
              alt="사당"
            />
            <RegionItemTitle>사당</RegionItemTitle>
          </RegionItem>
        </Link>
        <Link href="/maps/2">
          <RegionItem role={'tab'}>
            <RegionItemImage
              src={'https://nextjs.org/static/images/learn.png'}
              width={220}
              height={160}
              layout="fixed"
              alt="사당"
            />
            <RegionItemTitle>사당</RegionItemTitle>
          </RegionItem>
        </Link>
        <Link href="/maps/3">
          <RegionItem role={'tab'}>
            <RegionItemImage
              src={'https://nextjs.org/static/images/learn.png'}
              width={220}
              height={160}
              layout="fixed"
              alt="사당"
            />
            <RegionItemTitle>사당</RegionItemTitle>
          </RegionItem>
        </Link>
        <Link href="/maps">
          <RegionItem role={'tab'}>
            <RegionItemImage
              src={'https://nextjs.org/static/images/learn.png'}
              width={220}
              height={160}
              layout="fixed"
              alt="사당"
            />
            <RegionItemTitle>사당</RegionItemTitle>
          </RegionItem>
        </Link>
        <Link href="/maps">
          <RegionItem role={'tab'}>
            <RegionItemImage
              src={'https://nextjs.org/static/images/learn.png'}
              width={220}
              height={160}
              layout="fixed"
              alt="사당"
            />
            <RegionItemTitle>사당</RegionItemTitle>
          </RegionItem>
        </Link>
      </RegionList>
    </RegionWrapper>
  )
}
