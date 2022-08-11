import styled from "styled-components"

export const RecommendWrapper = styled.div`
  margin-top: 102px;
`

export const RecommendTitle = styled.p`
  font-size: ${(props) => props.theme.fontsizes.font24}rem;
  font-weight: 700;
`

export const RecommendLists = styled.ul`
  margin-top: 24px;
  display: flex;
  gap: 8px;
`

export const RecommendList = styled.li<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.grey200 : ''};
  border-radius: 28px;
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: ${(props) => (!props.isActive ? props.theme.colors.grey500 : '')};

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
  grid-template-columns: repeat(auto-fit, max(364px));
`

export const RecommendItem = styled.li`
  position: relative;
  width: 364px;
  height: 240px;
  z-index: 1;

  & img {
    z-index: -1;
  }

  & a {
    display: block;
  }

  &:hover a {
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
  }
`

export const RecommendDesc = styled.p`
  position: absolute;
  left: 24px;
  bottom: 20px;
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font22}rem;
  color: ${(props) => props.theme.colors.white};
`