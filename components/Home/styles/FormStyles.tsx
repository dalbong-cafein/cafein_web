import styled from 'styled-components'

const HomeWrapper = styled.div`
  max-width: ${(props) => props.theme.widthes.maxWidth}px;
  width: 100%;
`

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: flex-start;
`

const HomeTitle = styled.h1`
  font-size: ${(props) => props.theme.fontsizes.font28}rem;
  font-weight: 700;
  margin-top: ${(props) => props.theme.marginTop.margin40}px;
`

const StrongTitle = styled.strong`
  color: ${(props) => props.theme.colors.orange500};
`

const SearchFormWrapper = styled.form`
  margin-top: ${(props) => props.theme.marginTop.margin30}px;
  display: flex;
  flex-direction: row;
`

const SearchInput = styled.input`
  width: 440px;
  height: 48px;
  padding: 0 20px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 14px;
  border: none;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus-visible {
    z-index: 1;
    outline: none;
    border-color: ${(props) => props.theme.colors.orange500};
    box-shadow: ${(props) => props.theme.colors.orange500} 0 0 0 1px;
  }
`

const SearchButton = styled.button`
  width: 108px;
  height: 56px;
  margin-left: 20px;
  background-color: ${(props) => props.theme.colors.orange400};
  border-radius: ${(props) => props.theme.borderRadius.border16}px;
  color: ${(props) => props.theme.colors.white};
`

const SearchByMap = styled.button`
  width: 127px;
  height: 56px;
  margin-left: 10px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: ${(props) => props.theme.borderRadius.border16}px;
  color: ${(props) => props.theme.colors.orange400};
  background-color: transparent;
`

export {
  HomeWrapper,
  HeaderWrapper,
  HomeTitle,
  StrongTitle,
  SearchFormWrapper,
  SearchInput,
  SearchButton,
  SearchByMap
}
