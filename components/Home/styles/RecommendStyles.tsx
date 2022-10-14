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

  @media screen and (max-width: 900px) {
    gap: 20px;
  }
`

export const RecommendTitle = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font24}rem;
  font-weight: 600;

  @media screen and (max-width: 900px) {
    font-size: 17px;
  }
`

export const RecommendLists = styled.ul`
  display: flex;
  gap: 8px;

  @media screen and (max-width: 900px) {
    position: relative;
    width: calc(100vw - 2.5rem);
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    /* &::after {
      position: fixed;
      content: '';
      display: block;
      right: 0;
      height: 35px;
      width: 35px;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), #fff 65%);
    } */
    ${(props) => props.theme.mixins.scroll_x}
  }
`

export const RecommendList = styled.li<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.grey200 : ''};
  border-radius: 28px;
  font-weight: ${(props) => (props.isActive ? '600' : '500')};
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: ${(props) => (!props.isActive ? props.theme.colors.grey500 : '')};
  white-space: nowrap;
  &:hover {
    background-color: ${(props) =>
      props.isActive ? '' : 'rgba(0, 0, 0, 0.04)'};
  }

  & a {
    display: flex;
    padding: 9px 12px;
    &:hover {
      color: ${(props) =>
        props.isActive ? 'initial' : props.theme.colors.grey500};
    }
  }
`

export const RecommendItemsWrapper = styled.ul`
  font-family: 'GmarketSansMedium';
  display: grid;
  margin-top: 30px;
  row-gap: 20px;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(364px, 1fr));
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    row-gap: 8px;
    column-gap: 8px;
    margin-top: 24px;
  }
  @media screen and (max-width: 360px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`

export const RecommendItem = styled.li`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  height: 0;
  z-index: 1;
  border-radius: 16px;
  scroll-snap-align: center;

  @media screen and (max-width: 900px) {
    border-radius: 10px;
  }

  &::before {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 66%;
    border-radius: 16px;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));

    @media screen and (max-width: 900px) {
      border-radius: 10px;
    }
  }

  & img {
    z-index: -1;
    border-radius: 16px;

    @media screen and (max-width: 900px) {
      border-radius: 10px;
    }
  }

  & a {
    display: block;
    width: 100%;
    height: 100%;
  }

  &:hover a {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 16px;

    @media screen and (max-width: 900px) {
      border-radius: 10px;
    }
  }
`

export const RecommendDesc = styled.p`
  position: absolute;
  left: 24px;
  bottom: 16px;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font22}rem;
  color: ${(props) => props.theme.colors.white};
  line-height: 1.4;
  white-space: pre-wrap;
  @media screen and (max-width: 900px) {
    bottom: 10px;
    left: 10px;
    right: 10px;
    font-size: 14px;
    word-break: keep-all;
  }
`
