import styled from "styled-components";

export const ImageWrappers = styled.div`
  display: grid;
  max-width: 680px;
  height: 284px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 2.8fr 1fr 1fr;
  grid-gap: 4px;

  span:nth-child(1) {
    grid-row: 1 / 3;
  }
`