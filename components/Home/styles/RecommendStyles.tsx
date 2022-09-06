import styled from 'styled-components'

export const RecommendWrapper = styled.div`
  margin-top: 144px;
  @media screen and (max-width: 900px) {
    margin-top: 54px;
  }
`

export const RecommendSubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const RecommendHeadWrapper = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`

export const RecommendTitle = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font24}rem;
  font-weight: 700;
`

export const RecommendLists = styled.ul`
  display: flex;
  gap: 8px;

  @media screen and (max-width: 900px) {
    width: calc(100vw - 1rem);
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    ${(props) => props.theme.mixins.scroll_x}
  }
`

export const RecommendList = styled.li<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.grey200 : ''};
  border-radius: 28px;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: ${(props) => (!props.isActive ? props.theme.colors.grey500 : '')};
  white-space: nowrap;
  &:hover {
    color: inherit;
    background: rgba(0, 0, 0, 0.04);
  }

  & a {
    display: flex;
    padding: 9px 12px;
  }
`

export const RecommendItemsWrapper = styled.ul`
  display: grid;
  margin-top: 30px;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(364px, 1fr));
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    row-gap: 8px;
    column-gap: 8px;
  }
  @media screen and (max-width: 360px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`

export const RecommendItem = styled.li`
  position: relative;
  height: 240px;
  z-index: 1;
  border-radius: 16px;
  scroll-snap-align: center;

  & img {
    z-index: -1;
  }

  & a {
    display: block;
    width: 100%;
    height: 100%;
  }

  &:hover a {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
  }

  @media screen and (max-width: 900px) {
    height: 105px;
  }
`

export const RecommendDesc = styled.p`
  position: absolute;
  left: 24px;
  bottom: 20px;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font22}rem;
  color: ${(props) => props.theme.colors.white};
  @media screen and (max-width: 900px) {
    bottom: 10px;
    left: 10px;
    right: 10px;
    font-size: 14px;
  }
`
