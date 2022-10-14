import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NavWrapper = styled.div<{ main?: boolean }>`
  max-width: 1200px;
  /* padding: ${(props) => (props.main ? '' : `0 190px 0 24px`)}; */
  padding: 0 34px;
  width: 100%;
  height: ${(props) => props.theme.marginTop.navHeight}px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    padding: 0 16px;
  }
`

const NavSubWrapper = styled.div`
  display: flex;
  gap: 8px;
  @media screen and (max-width: 900px) {
    gap: 7px;
  }
  @media screen and (max-width: 700px) {
    gap: 6px;
  }
  @media screen and (max-width: 500px) {
    gap: 5px;
  }
  @media screen and (max-width: 300px) {
    gap: 4px;
  }
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
  @media screen and (max-width: 900px) {
    width: auto;
    font-size: 13px;
  }
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
  OrangeButton,
  NavSubWrapper
}
