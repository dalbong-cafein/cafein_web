import styled from 'styled-components'

export const CafeWrapper = styled.div<{ isSingle: boolean }>`
  height: ${(props) => (props.isSingle ? `calc(100vh - 140px)` : '100vh')};
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.grey300};
    border-radius: 4px;
  }
`

export * from './CafeInfoSectionStyle'
export * from './ImageSectionStyles'
export * from './CafePointsSectionStyle'
export * from './RecommendSectionStyle'
