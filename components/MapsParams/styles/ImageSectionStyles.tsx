import styled from 'styled-components'

export const ImageWrappers = styled.div`
  display: grid;
  max-width: 680px;
  height: 242px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 2.316fr 1fr;
  grid-gap: 2px;

  span:nth-child(1) {
    grid-row: 1 / 3;
  }
`
