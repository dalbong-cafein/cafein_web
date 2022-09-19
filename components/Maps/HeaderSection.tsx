import Link from 'next/link'

import { useAtom, useSetAtom } from 'jotai'
import { sortModeAtom, userLocationAtom } from 'store'

import Search from '@components/Home/Search'
import Ic_Logo from '@public/logo_black.svg'

import {
  FilterItem,
  FilterWrapper,
  Wrapper
} from './styles/HeaderSectionStyles'
import styled from 'styled-components'

const HeaderSection = ({ hasFilter }: { hasFilter: boolean }) => {
  const [sortMode, setSortMode] = useAtom(sortModeAtom)

  const handleSortMode = (mode: 0 | 1 | 2 | 3) => {
    if (sortMode !== mode) {
      return setSortMode(mode)
    }
    setSortMode(0)
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <Link href="/">
          <a>
            <Ic_Logo />
          </a>
        </Link>
        <SendOpinion
          href="https://forms.gle/dCqeYDvt6ys4Yn7n7"
          target="_blank"
          rel="noreferrer"
        >
          의견 보내기
        </SendOpinion>
      </HeaderWrapper>
      <Search />
      {hasFilter ? (
        <FilterWrapper>
          <FilterItem
            onClick={() => handleSortMode(1)}
            isClicked={sortMode === 1}
          >
            영업중
          </FilterItem>
          <FilterItem
            onClick={() => handleSortMode(2)}
            isClicked={sortMode === 2}
          >
            가까운순
          </FilterItem>
          <FilterItem
            onClick={() => handleSortMode(3)}
            isClicked={sortMode === 3}
          >
            추천순
          </FilterItem>
        </FilterWrapper>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SendOpinion = styled.a`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey700};
`

export default HeaderSection
