import styled from 'styled-components'

const MainWrapper = styled.div`
  z-index: 2;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  max-width: 400px;
  min-width: 375px;
  filter: drop-shadow(8px 0px 20px rgba(0, 0, 0, 0.08));
`

const SubWrapper = styled(MainWrapper)<{ isDisplay: boolean }>`
  z-index: 1;
  visibility: ${(props) => (props.isDisplay ? 'visible' : 'hidden')};
  position: absolute;
  left: ${(props) => (props.isDisplay ? '400px' : '0')};
  transition: all 0.25s;
`

const CafeList = styled.ul<{ isSuggestion?: boolean }>`
  border-top: 1px solid ${(props) => props.theme.colors.grey100};
  display: flex;
  flex-direction: column;
  height: ${(props) =>
    props.isSuggestion ? 'calc(100vh - 241.53px)' : 'calc(100vh - 185.03px)'};
  overflow-y: auto;
  padding-bottom: 52px;

  & li:not(:first-child)::after {
    content: '';
    position: absolute;
    left: 24px;
    right: 24px;
    top: 0;
    border-top: 1px solid ${(props) => props.theme.colors.grey100};
  }
  & li {
    padding: 20px 24px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

const CafeListPagination = styled.div<{ isDisplay?: boolean }>`
  display: flex;
  gap: 10px;
  justify-content: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 52px;
  padding-top: 10px;
  border-top: 1px solid ${(props) => props.theme.colors.grey100};
  background-color: white;

  & *:hover {
    cursor: pointer;
  }
`

const PaginationUlWrapper = styled.ul`
  display: flex;
  flex: 0;
  height: 28px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

const PageNumber = styled.li<{ isClicked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 28px;
  border-radius: 6px;
  color: ${(props) =>
    props.isClicked
      ? `${props.theme.colors.grey800}`
      : `${props.theme.colors.grey600}`};
  font-weight: ${(props) => (props.isClicked ? 500 : 400)};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  background-color: ${(props) =>
    props.isClicked ? `${props.theme.colors.grey100}` : ''};
`

const DetailWrapper = styled.div`
  position: absolute;
  left: 400px;
  top: 0;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  max-width: 400px;
  min-width: 375px;
  z-index: 1;
  filter: drop-shadow(8px 0px 20px rgba(0, 0, 0, 0.08));

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

export {
  MainWrapper,
  SubWrapper,
  DetailWrapper,
  CafeList,
  CafeListPagination,
  PaginationUlWrapper,
  PageNumber
}
export * from './MapStyle'
export * from './ShortCafeStyles'
export * from './RegionListStyles'
export * from './FormStyles'
