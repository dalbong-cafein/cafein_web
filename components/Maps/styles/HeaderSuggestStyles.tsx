import styled from 'styled-components'

export const StyleCopy = styled.div`
  display: flex;
  height: 14px;
  &:hover {
    cursor: pointer;
    & svg path {
      fill: ${(props) => props.theme.colors.grey600};
    }
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SendOpinion = styled.a`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  color: ${(props) => props.theme.colors.grey700};

  @media screen and (max-width: 900px) {
    display: none;
  }
`

export const TempWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;

  @media screen and (max-width: 900px) {
    padding: 16px;
  }
`

export const HomeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.orange400};
  padding: 11px 12px;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.orange500};
  margin-top: 30px;

  @media screen and (max-width: 900px) {
    height: 44px;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;

  @media screen and (max-width: 900px) {
    margin-top: 30px;
    padding-left: 4px;
  }
`

export const Title = styled.h1`
  font-weight: 700;
  font-size: ${(props) => props.theme.fontsizes.font21}rem;
  color: ${(props) => props.theme.colors.grey900};
  white-space: pre-wrap;
  word-break: keep-all;
  line-height: 1.4;
`
