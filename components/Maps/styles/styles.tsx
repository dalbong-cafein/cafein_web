import styled from 'styled-components'

const MainWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  max-width: 400px;
  min-width: 375px;
  z-index: 1;
  filter: drop-shadow(8px 0px 20px rgba(0, 0, 0, 0.08));


`

const DetailWrapper = styled.div<{ isDetail: boolean }>`
  position: absolute;
  left: 400px;
  top: 0;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: scroll;
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

export { MainWrapper, DetailWrapper }
export * from './MapStyle'
export * from './CurrentPopularStyles'
export * from './RegionListStyles'
export * from './FormStyles'
