import styled from "styled-components";

export const StrongWrapperTitle = styled.span`
  color: ${(props) => props.theme.colors.orange500};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
`

export const ButtonOutterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  &:hover {
    cursor: pointer;
  }
`

export const ButtonDesc = styled.p<{ isHovering: boolean; isOnButton: boolean }>`
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  font-weight: 500;
  color: ${(props) =>
    props.isHovering || props.isOnButton
      ? props.theme.colors.orange400
      : props.theme.colors.grey400};
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`

export const ButtonInnerWrapper = styled.div`
  display: flex;
  width: 340px;
  justify-content: space-between;
`