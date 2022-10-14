import styled from 'styled-components'

export const FooterWrapper = styled.footer<{ isHome: boolean }>`
  margin-top: ${(props) => (props.isHome ? '60px' : '40px')};
  background-color: ${(props) =>
    props.isHome ? '' : props.theme.colors.grey50};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: ${(props) => (props.isHome ? '' : '30px 49px')};
  @media screen and (max-width: 900px) {
    margin-top: 30px;
  }
`

export const FooterQLists = styled.ul<{ isTop?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.isTop ? '17px' : '16px')};
  color: ${(props) =>
    props.isTop ? props.theme.colors.grey700 : props.theme.colors.grey600};
  font-size: ${(props) => (props.isTop ? '13px' : '12px')};
`

export const QItem = styled.li`
  font-weight: 400;

  & a:hover {
    color: ${(props) => props.theme.colors.grey800};
  }
`

export const CopyRight = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font12}rem;
  color: ${(props) => props.theme.colors.grey400};
  text-align: center;
  white-space: nowrap;
`
