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

export const ImageWrappersLess = styled.div`
  display: flex;
  max-width: 680px;
  height: 242px;
`

export const ImageLink = styled.a`
  display: flex;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`

export const ShowMoreWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 42px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
  align-items: center;
`

export const ShowMore = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 500;
  white-space: nowrap;
`
