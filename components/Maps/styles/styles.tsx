import styled from 'styled-components'

const MainWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 117px;
  width: 100%;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.grey50};
  max-width: ${(props) => props.theme.widthes.maxBarList}px;
  min-width: ${(props) => props.theme.widthes.minBarList}px;
  z-index: 9999;
`

export { MainWrapper }
export * from './MapStyle'
export * from './CurrentPopularStyles'
export * from './RegionListStyles'
export * from './FormStyles'
