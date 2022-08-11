import styled from "styled-components"

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