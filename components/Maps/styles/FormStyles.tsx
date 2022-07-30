import styled from 'styled-components'

const SearchWrapper = styled.form`
  display: flex;
  flex-direction: row;
  padding: 16px 24px 0;
`

const SearchInput = styled.input`
  width: 530px;
  height: 48px;
  padding: 0 20px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey100};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const SearchButton = styled.button`
  width: 86px;
  height: 48px;
  margin-left: 16px;
  background-color: ${(props) => props.theme.colors.orange400};
  color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.border12}px;
`

const SearchDetailInput = styled.input`
  width: 360px;
  height: 44px;
  border: 1px solid ${(props) => props.theme.colors.grey300};
  border-radius: 12px;
  font-size: ${(props) => props.theme.fontsizes.font14}rem;
  padding-left: 18px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus-visible {
    z-index: 1;
    outline: none;
    border-color: ${(props) => props.theme.colors.orange500};
    box-shadow: ${(props) => props.theme.colors.orange500} 0 0 0 1px;
  }

  &::placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &::-webkit-input-placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
  &:-ms-input-placeholder {
    text-indent: 28px;
    background-image: url('/images/search.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }
`

export { SearchWrapper, SearchInput, SearchButton, SearchDetailInput }
