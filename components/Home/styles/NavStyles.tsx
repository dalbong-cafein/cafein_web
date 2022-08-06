import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavWrapper = styled.nav<{ main?: boolean }>`
  max-width: 1200px;
  /* padding: ${(props) => (props.main ? '' : `0 190px 0 24px`)}; */
  padding: 0 34px;
  width: 100%;
  height: ${(props) => props.theme.marginTop.navHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const WhiteLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.grey700};
  width: 101px;
  height: 38px;
`

const OrangeButtonWrapper = styled.li`
  width: 130px;
  height: 48px;
`

const OrangeButton = styled.button`
  ${(props) => props.theme.buttons.orangeButton}
  font-size: ${(props) => props.theme.fontsizes.font15}rem;
  padding: 16px 24px;
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

export {
  Wrapper,
  NavWrapper,
  WhiteLink,
  OrangeButtonWrapper,
  OrangeButton
}
