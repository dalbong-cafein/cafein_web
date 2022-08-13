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
  padding: ${(props) => props.isHome ? '' : '30px 0'};
`

export const FooterQLists = styled.ul`
  display: flex;
  gap: 16px;
`

export const QItem = styled.li`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey700};

  & a:hover {
    color: ${(props) => props.theme.colors.grey800};
  }
`

export const CopyRight = styled.p`
  font-weight: 400;
  font-size: ${(props) => props.theme.fontsizes.font13}rem;
  color: ${(props) => props.theme.colors.grey500};
`
