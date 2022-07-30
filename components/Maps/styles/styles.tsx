import styled from 'styled-components'

const MainWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  top: ${(props) => props.theme.marginTop.navHeight}px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  max-width: ${(props) => props.theme.widthes.maxBarList}px;
  min-width: ${(props) => props.theme.widthes.minBarList}px;
  z-index: 1;
  padding: 16px 24px;
`

export { MainWrapper }
export * from './MapStyle'
export * from './CurrentPopularStyles'
export * from './RegionListStyles'
export * from './FormStyles'
