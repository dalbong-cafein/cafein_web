import styled from 'styled-components'

export const MapBox = styled.div<{ width: number }>`
  flex: 1;
  height: 100vh;

  @media screen and (max-width: 900px) {
    position: absolute !important;
    width: 100vw;
    top: 169px;
    height: calc(100vh - 169px);
    left: 0;
    z-index: 1;
  }
`
