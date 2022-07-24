import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

export default function RegionLists() {
  return (
    <RegionWrapper>
      <RegionTitle>지역별 카공하기 좋은 카페</RegionTitle>
      <RegionList role={'tablist'}>
        <Link href="/map">
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
        <Link href="/map">
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
        <Link href="/map">
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
        <Link href="/map">
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
        <Link href="/map">
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

const RegionWrapper = styled.div`
  margin-top: 30px;
`

const RegionTitle = styled.h1`
  font-size: ${(props) => props.theme.fontsizes.font19}rem;
`

const RegionList = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  ${(props) => props.theme.mixins.scroll_x}
`
const RegionItem = styled.a`
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 212px;
  margin-bottom: 12px;
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
  box-shadow: rgba(0, 0, 0, 0.1) 4px 4px 6px;
`
const RegionItemImage = styled(Image)`
  border-top-left-radius: ${(props) => props.theme.borderRadius.border12}px;
  border-top-right-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const RegionItemTitle = styled.p`
  padding: 16px 20px 20px;
  border-bottom-left-radius: ${(props) => props.theme.borderRadius.border12}px;
  border-bottom-right-radius: ${(props) => props.theme.borderRadius.border12}px;
  background-color: ${(props) => props.theme.colors.white};
`
