import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavWrapper = styled.nav`
  max-width: ${(props) => props.theme.widthes.maxWidth}px;
  width: 100%;
  height: 117px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonsWrapper = styled.ul`
  display: flex;
  gap: 24px;
`

const WhiteLinkWrapper = styled.li`
  width: 117px;
  height: 48px;
`

const WhiteLink = styled.a`
  display: inline-block;
  vertical-align: bottom;
  padding: 16px 24px;
  font-size: 0.9375rem;
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
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
  ButtonsWrapper,
  WhiteLinkWrapper,
  WhiteLink,
  OrangeButtonWrapper,
  OrangeButton
}
