import styled from 'styled-components'

interface HomeSearchListsProps {
  isDisplay: boolean
  isMap: boolean
}

export const SearchLists = styled.ul`
  position: absolute;
  z-index: 2;
  margin-top: 4px;
  width: 632px;
  max-height: 50vh;
  overflow: auto;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey100};
  filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.06));
  padding: 10px;
  background-color: ${(props) => props.theme.colors.white};
`

export const SearchList = styled.li<{ isFocus: boolean }>`
  width: 100%;
  padding: 16px 10px;
  background-color: ${(props) => (props.isFocus ? '#edf5f5' : '#fff')};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  z-index: 3;

  &.active {
    background-color: #edf5f5;
  }

  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
`

export const HomeSearchLists = styled(SearchLists)<HomeSearchListsProps>`
  display: ${(props) => (props.isDisplay ? 'block' : 'none')};
  width: ${(props) => (props.isMap ? '352px' : '400px')};
  top: ${(props) => (props.isMap ? '34px' : '64px')};
  margin-top: ${(props) => (props.isMap ? '14px' : '4px')};
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

export const SearchListItemWrapper = styled.div`
  display: flex;
  gap: 10px;
`

export const SearchListDescs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const SearchListTitle = styled.p`
  color: ${(props) => props.theme.colors.grey800};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

export const SearchListStrong = styled.span`
  color: ${(props) => props.theme.colors.orange500};
`

export const SearchListPosition = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey600};
  width: 320px;
  ${(props) => props.theme.mixins.ellipse}
`
