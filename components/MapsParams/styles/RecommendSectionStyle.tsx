import styled from 'styled-components'

export const WordsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
`

export const StrongWrapperTitle = styled.span`
  color: ${(props) => props.theme.colors.orange500};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontsizes.font16}rem;
`

export const WordsWrapperText = styled.span`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  color: ${(props) => props.theme.colors.grey700};
`

export const ButtonOutterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 30px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: ${(props) => props.theme.colors.grey400};
  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.orange400};
  }
`

export const ButtonDesc = styled.p<{
  isOnButton: boolean
}>`
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  font-weight: 500;
  color: ${(props) =>
    props.isOnButton ? props.theme.colors.orange400 : 'inherit'};
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  position: absolute;
  bottom: 30px;

  & span {
    opacity: 0.9;
    margin-left: 2px;
  }
`

export const ButtonInnerWrapper = styled.div`
  display: flex;
  gap: 40px;
`
