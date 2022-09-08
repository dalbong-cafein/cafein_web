import styled from 'styled-components'

export const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  padding: 23px 24px 0;

  @media screen and (max-width: 900px) {
    padding: 17px 16px 0;
  }
`

export const FilterWrapper = styled.ul`
  display: flex;
  margin-bottom: 9px;
  gap: 6px;
`

export const FilterItem = styled.li<{ isClicked: boolean }>`
  border: 1px solid ${(props) => props.theme.colors.grey200};
  border-radius: 20px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.grey800};
  background-color: ${(props) =>
    props.isClicked ? props.theme.colors.orange300 : ''};
  color: ${(props) => (props.isClicked ? 'white' : '')};
  padding: 8px 12px;
  cursor: pointer;
`
