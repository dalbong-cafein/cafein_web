import styled from 'styled-components'

export const MapBox = styled.div`
  width: 100vw;
  height: calc(100vh - ${(props) => props.theme.marginTop.navHeight}px);
`
