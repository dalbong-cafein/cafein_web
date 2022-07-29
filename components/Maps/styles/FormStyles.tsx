import styled from 'styled-components'

const SearchWrapper = styled.form`
  display: flex;
  flex-direction: row;
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

export { SearchWrapper, SearchInput, SearchButton }
